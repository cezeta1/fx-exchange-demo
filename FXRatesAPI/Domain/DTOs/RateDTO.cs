namespace FXRatesAPI.Domain.DTOs;

public class RateDTO
{
    public RateDTO() {
        CurrencyFrom = new Currency();
        CurrencyTo = new Currency();
    }
    public Currency CurrencyFrom { get; set; }
    public Currency CurrencyTo { get; set; }
    public decimal ExchangeRate { get; set; }
    public DateTime QuotedOn { get; set; }
    public DateTime ExpiredOn { get; set; }
    public bool IsValid { get => DateTime.Now.CompareTo(ExpiredOn) > 0; }
}
