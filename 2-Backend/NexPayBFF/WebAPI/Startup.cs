using Microsoft.OpenApi.Models;
using PaymentsAPI.Sdk;
using FXRatesAPI.Sdk;
using CZ.Common.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace NexPayBFF.WebAPI;

public class Startup
{
    public IConfiguration Configuration { get; }
    private CorsConfigHelper _corsConfigHelper;

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
        _corsConfigHelper = new CorsConfigHelper();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
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

        services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireAdminRole",
                 policy => policy.RequireRole("Admin.ReadWrite"));
        });

        services.AddControllers();

        // Services
        services.Configure<PaymentsAPIOptions>(Configuration.GetSection("PaymentsAPI"));
        services.Configure<FXRatesAPIOptions>(Configuration.GetSection("FXRatesAPI"));
        services.AddSingleton<PaymentsAPIService>();
        services.AddSingleton<FXRatesAPIService>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEZ.NexPayBFF", Version = "v1" });
        }); 

        services.AddHttpContextAccessor();
        _corsConfigHelper.ConfigureCors(services, Configuration);
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
        app.UseCors("GeneralPolicy");
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}