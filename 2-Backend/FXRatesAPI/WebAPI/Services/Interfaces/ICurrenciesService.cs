using FXRatesAPI.Domain;

namespace FXRatesAPI.WebAPI;

public interface ICurrenciesService
{
    public Task<IEnumerable<Currency>> GetCurrencyOptions();
}
