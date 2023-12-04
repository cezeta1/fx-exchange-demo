namespace FXRatesAPI.Domain.Params;

public class GetRateQuoteParam
{
    public Guid UserId { get; set; }
    public int FromId { get; set; }
    public int ToId { get; set; }
    public decimal Amount { get; set; }
}
