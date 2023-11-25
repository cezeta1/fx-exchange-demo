using FXRatesAPI.Domain.DTOs;

namespace FXRatesAPI.Domain;

public class Currency
{
    public Currency() { }
    public int Id { get; set; }
    public string? Name {  get; set; }
    public string? Symbol {  get; set; }

    public CurrencyDTO toDTO()
    {
        return new CurrencyDTO
        {
           Id = this.Id,
           Name = this.Name,
           Symbol = this.Symbol
        };
    }
}
