using FXRatesAPI.Repository;

namespace FXRatesAPI.WebAPI;

public class CurrenciesService
{
    private readonly CurrenciesRepository _currenciesRepository;

    public CurrenciesService(CurrenciesRepository currenciesRepository)
    {
        _currenciesRepository = currenciesRepository;
    }

    public async Task<IEnumerable<Currency>> GetCurrencyOptions()
    {
        return await _currenciesRepository.GetAllCurrencies();
    }
}
