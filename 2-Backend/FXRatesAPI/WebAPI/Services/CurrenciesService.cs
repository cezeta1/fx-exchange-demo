using FXRatesAPI.Domain;
using FXRatesAPI.Repository;

namespace FXRatesAPI.WebAPI;

public class CurrenciesService : ICurrenciesService
{
    private readonly ICurrenciesRepository _currenciesRepository;

    public CurrenciesService(ICurrenciesRepository currenciesRepository)
    {
        _currenciesRepository = currenciesRepository;
    }

    public async Task<IEnumerable<Currency>> GetCurrencyOptions() 
        => await _currenciesRepository.GetAllCurrencies();
   
}
