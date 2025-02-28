using PaymentsAPI.Repository;
using Microsoft.OpenApi.Models;
using PaymentsAPI.WebAPI.Services;
using PaymentsAPI.Persistence;
using Microsoft.EntityFrameworkCore;
using CZ.Common.Utilities;

namespace PaymentsAPI.WebAPI;

public class Startup(IConfiguration _configuration)
{
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString("CEZ_NexPayPaymentsDB")), 
            ServiceLifetime.Scoped);

        // Helpers
        services.Configure<EmailHelperOptions>(_configuration.GetSection(EmailHelperOptions.SectionName));
        services.AddSingleton<EmailHelper>();

        // Services
        services.AddScoped<IContractsService, ContractsService>();

        // Repositories
        services.AddScoped<IContractsRepository, ContractsRepository>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "CEZ.NexPayPaymentsAPI", Version = "v1" });
        });

        services.AddHttpContextAccessor();
        StartupConfigHelper.ConfigureCors(services, _configuration);
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