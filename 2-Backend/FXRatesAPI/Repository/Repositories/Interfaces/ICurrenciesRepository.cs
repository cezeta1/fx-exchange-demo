using FXRatesAPI.Domain;

namespace FXRatesAPI.Repository;

public interface ICurrenciesRepository
{
    public Task<IEnumerable<Currency>> GetAllCurrencies();
    public Task<Currency> GetCurrencyById(int id);
    public Task<IEnumerable<Currency>> GetCurrenciesById(List<int> ids);
}