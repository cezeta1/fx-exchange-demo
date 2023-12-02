using PaymentsAPI.Repository;
using Microsoft.OpenApi.Models;
using PaymentsAPI.WebAPI.Services;
using PaymentsAPI.Persistence;
using Microsoft.EntityFrameworkCore;
using CZ.Common.Utilities;

namespace PaymentsAPI.WebAPI;

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
            options.UseSqlServer(Configuration.GetConnectionString("CEZ_NexPayPaymentsDB"))
        , ServiceLifetime.Singleton);

        // Helpers
        services.Configure<EmailHelperOptions>(Configuration.GetSection(EmailHelperOptions.SectionName));
        services.AddSingleton<EmailHelper>();

        // Services
        services.AddSingleton<ContractsService>();
        
        // Repositories
        services.AddSingleton<ContractsRepository>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEZ.NexPayPaymentsAPI", Version = "v1" });

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