namespace PaymentsAPI.WebAPI;

public static class ConfigurationHelper
{
    private static IConfiguration _configuration;

    public static void InitializeConfiguration(IConfiguration conf)
    {
        _configuration = conf;
    }

    public static IConfiguration GetConfiguration()
    {
        return _configuration;
    }
}
