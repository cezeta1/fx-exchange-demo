using FXRatesAPI.Domain.DTOs;

namespace FXRatesAPI.Domain;

public class Currency
{
    public int Id { get; set; }
    public string? Name {  get; set; }
    public string? Symbol {  get; set; }

    public CurrencyDTO ToDTO()
        => new()
        {
           Id = Id,
           Name = Name,
           Symbol = Symbol
        };
}
