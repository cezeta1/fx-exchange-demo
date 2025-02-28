using CZ.Common.Entities;

namespace FXRatesAPI.Domain.DTOs;

public class RateDTO : EffectivenessDTO
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }
    public decimal ExchangeRate { get; set; }
    public decimal Amount { get; set; }

    public Currency CurrencyFrom { get; set; } = new();
    public Currency CurrencyTo { get; set; } = new();
}
