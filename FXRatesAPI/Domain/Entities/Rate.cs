using FXRatesAPI.Domain.DTOs;

namespace FXRatesAPI.Domain;
public class Rate
{
    public Rate() { }
    public Currency CurrencyFrom { get; set; }
    public Currency CurrencyTo { get; set; }
    public decimal ExchangeRate { get; set; }

    public DateTime QuotedOn { get; set; }
    public DateTime ExpiredOn { get; set; }

    public RateDTO toDTO()
    {
        return new RateDTO
        {
            CurrencyFrom = this.CurrencyFrom,
            CurrencyTo = this.CurrencyTo,
            ExchangeRate = this.ExchangeRate,
            QuotedOn = this.QuotedOn,
            ExpiredOn = this.ExpiredOn
        };
    }
}
