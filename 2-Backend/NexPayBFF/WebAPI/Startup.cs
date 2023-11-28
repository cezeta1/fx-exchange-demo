using Microsoft.OpenApi.Models;
using PaymentsAPI.Sdk;
using FXRatesAPI.Sdk;
using CZ.Common.Utilities;

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
        services = _corsConfigHelper.ConfigureCors(services, Configuration);
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