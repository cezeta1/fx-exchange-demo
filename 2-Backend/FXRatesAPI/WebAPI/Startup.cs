using FXRatesAPI.Persistence;
using FXRatesAPI.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace FXRatesAPI.WebAPI;
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private class CorsConfiguration
        {
            public string AllowedOrigins { get; set; }
            public string AllowedMethods { get; set; }
            public string AllowedHeaders { get; set; }
        }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CEZ_NexPayFxDB"))
        , ServiceLifetime.Singleton);
            
        services.AddSingleton<CurrenciesService>();
        services.AddSingleton<RatesService>();

        services.AddSingleton<CurrenciesRepository>();
        services.AddSingleton<RatesRepository>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEZ.NexPayFxAPI", Version = "v1" });

        });

        services.AddHttpContextAccessor();

        // Checking if a CORS configuration was provided
        if (Configuration.GetChildren().Any(item => item.Key == "CORS"))
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
        
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseHttpsRedirection();

        app.UseRouting();
        app.UseAuthorization();
        app.UseCors("CorsAPI");
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}