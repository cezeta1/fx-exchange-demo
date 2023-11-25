using CZ.Common.Entities;

namespace FXRatesAPI.Domain.DTOs;

public class RateDTO : EffectivenessDTO
{
    public RateDTO() {
        CurrencyFrom = new Currency();
        CurrencyTo = new Currency();
    }
    public Guid Id { get; set; }
    public Currency CurrencyFrom { get; set; }
    public Currency CurrencyTo { get; set; }
    public decimal ExchangeRate { get; set; }
}
