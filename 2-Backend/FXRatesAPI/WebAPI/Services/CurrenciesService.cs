using FXRatesAPI.Domain;
using FXRatesAPI.Repository;

namespace FXRatesAPI.WebAPI;

public class CurrenciesService : ICurrenciesService
{
    private readonly CurrenciesRepository _currenciesRepository;

    public CurrenciesService(CurrenciesRepository currenciesRepository)
    {
        _currenciesRepository = currenciesRepository;
    }

    public async Task<IEnumerable<Currency>> GetCurrencyOptions() 
        => await _currenciesRepository.GetAllCurrencies();
   
}
