﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;

namespace CZ.Common.Utilities;

public class CorsConfiguration
{
    public string? AllowedOrigins { get; set; }
    public string? AllowedMethods { get; set; }
    public string? AllowedHeaders { get; set; }
}

public class StartupConfigHelper
{
    public static void ConfigureAuthentication(
        IServiceCollection services,
        IConfiguration Configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(options =>
            {
                Configuration.Bind("AzureAd", options);
                options.TokenValidationParameters.NameClaimType = "name";
            },
            options =>
            {
                Configuration.Bind("AzureAd", options);
            });
    }

    public static void ConfigureCors(
        IServiceCollection services,
        IConfiguration Configuration)
    {
        // Checking if a CORS configuration was provided
        if (Configuration.GetChildren().Any(item => item.Key == "CORS"))
        {
            services.AddCors(options =>
            {
                // Getting all the CORS policies provided
                var policies = Configuration.GetSection("CORS").GetChildren().ToList();
                foreach (var policy in policies)
                {
                    var policyInformation = Configuration.GetSection(policy.Path).GetChildren();
                    CorsConfiguration policyConfiguration = new CorsConfiguration();
                    Configuration.GetSection(policyInformation.First().Path).Bind(policyConfiguration);
                    // Creating each policy 
                    options.AddPolicy(policyInformation.First().Key,
                    builder =>
                    {
                        if (string.IsNullOrEmpty(policyConfiguration.AllowedOrigins))
                            throw new Exception($"CORS Origins AppSetting is null or empty: AllowedOrigins");
                        else if (policyConfiguration.AllowedOrigins == "*")
                            builder.AllowAnyOrigin();
                        else
                        {
                            foreach (var origin in policyConfiguration.AllowedOrigins.Split(','))
                            {
                                builder.WithOrigins(origin.Trim());
                            }
                        }

                        if (string.IsNullOrEmpty(policyConfiguration.AllowedHeaders))
                            throw new Exception($"CORS Origins AppSetting is null or empty: AllowedHeaders");
                        else if (policyConfiguration.AllowedHeaders == "*")
                            builder.AllowAnyHeader();
                        else
                        {
                            foreach (var header in policyConfiguration.AllowedHeaders.Split(','))
                            {
                                builder.WithHeaders(header.Trim());
                            }
                        }

                        if (string.IsNullOrEmpty(policyConfiguration.AllowedMethods))
                            throw new Exception($"CORS Origins AppSetting is null or empty: AllowedMethods");
                        else if (policyConfiguration.AllowedMethods == "*")
                            builder.AllowAnyMethod();
                        else
                        {
                            foreach (var method in policyConfiguration.AllowedMethods.Split(','))
                            {
                                builder.WithMethods(method.Trim());
                            }
                        }
                    });
                }
            });
        }
    }

}
