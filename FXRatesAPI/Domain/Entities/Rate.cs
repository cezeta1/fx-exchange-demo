using FXRatesAPI.Domain.DTOs;

namespace FXRatesAPI.Domain;
public class Rate
{
    public Rate() {
        Id = Guid.NewGuid();
        QuotedOn = DateTime.Now;
        ExpiredOn = DateTime.Now.AddSeconds(120);
    }
    public Guid Id { get; set; }

    public int CurrencyFromId { get; set; }
    public virtual Currency CurrencyFrom { get; set; }
    public int CurrencyToId { get; set; }
    public virtual Currency CurrencyTo { get; set; }

    public decimal ExchangeRate { get; set; }

    public DateTime QuotedOn { get; set; }
    public DateTime ExpiredOn { get; set; }

    public RateDTO toDTO()
    {
        return new RateDTO
        {
            Id = this.Id,
            CurrencyFrom = this.CurrencyFrom,
            CurrencyTo = this.CurrencyTo,
            ExchangeRate = this.ExchangeRate,
            QuotedOn = this.QuotedOn,
            ExpiredOn = this.ExpiredOn
        };
    }
}
