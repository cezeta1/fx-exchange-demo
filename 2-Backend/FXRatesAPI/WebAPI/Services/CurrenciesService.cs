using FXRatesAPI.Domain;
using FXRatesAPI.Repository;

namespace FXRatesAPI.WebAPI;

public class CurrenciesService(ICurrenciesRepository _currenciesRepository) : ICurrenciesService
{
    public async Task<IEnumerable<Currency>> GetCurrencyOptions() 
        => await _currenciesRepository.GetAllCurrencies();
}
