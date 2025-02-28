using PaymentsAPI.WebAPI;

public static class Program
{
    public static void Main(string[] args)
        => CreateHostBuilder(args).Build().Run();

    public static IHostBuilder CreateHostBuilder(string[] args) 
        => Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(wb => wb.UseStartup<Startup>());
}
