using CZ.Common.Utilities;
using FXRatesAPI.Persistence;
using FXRatesAPI.Repository;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace FXRatesAPI.WebAPI;
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
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CEZ_NexPayFxDB"))
            , ServiceLifetime.Scoped);
            
        services.AddScoped<ICurrenciesService, CurrenciesService>();
        services.AddScoped<IRatesService, RatesService>();

        services.AddScoped<ICurrenciesRepository, CurrenciesRepository>();
        services.AddScoped<IRatesRepository, RatesRepository>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEZ.NexPayFxAPI", Version = "v1" });

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
        app.UseCors("GeneralPolicy");
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
