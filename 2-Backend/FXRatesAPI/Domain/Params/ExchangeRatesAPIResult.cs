namespace FXRatesAPI.Domain.Params;

public class ExchangeRatesAPIResult
{
    public double Amount { get; set; }
    public string? Base { get; set; }
    public DateTime Date { get; set; }
    public Dictionary<string, decimal> Rates { get; set; } = [];
}
