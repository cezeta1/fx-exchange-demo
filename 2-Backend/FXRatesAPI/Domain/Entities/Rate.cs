using CZ.Common.Entities;
using FXRatesAPI.Domain.DTOs;

namespace FXRatesAPI.Domain;

public class Rate : Effectiveness
{
    public Rate(): base(null) {
        Id = Guid.NewGuid();
        ExpiredOn = DateTime.Now.AddSeconds(120);
    }

    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public int CurrencyFromId { get; set; }
    public virtual Currency? CurrencyFrom { get; set; }
    public int CurrencyToId { get; set; }
    public virtual Currency? CurrencyTo { get; set; }

    public decimal ExchangeRate { get; set; }
    public decimal Amount { get;set; }

    public RateDTO ToDTO()
        => new()
        {
            Id = Id,
            UserId = UserId,
            CurrencyFrom = CurrencyFrom ?? new(),
            CurrencyTo = CurrencyTo ?? new(),
            ExchangeRate = ExchangeRate,
            Amount = Amount,
            CreatedOn = CreatedOn,
            ExpiredOn = ExpiredOn,
        };
}
