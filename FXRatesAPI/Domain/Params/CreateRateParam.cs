namespace FXRatesAPI.Domain.Params;

public class CreateRateParam
{
    public int From { get; set; }
    public int To { get; set; }
    public decimal Amount { get; set; }
}
