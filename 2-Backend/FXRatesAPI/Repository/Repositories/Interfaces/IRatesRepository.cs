using FXRatesAPI.Domain;

namespace FXRatesAPI.Repository;

public interface IRatesRepository
{
    public Task<IEnumerable<Rate>> GetAllRates();
    public Task<Rate> GetRateById(Guid id);
    public Task<IEnumerable<Rate>> GetRatesById(IEnumerable<Guid> ids);
    public Task<Rate> CreateRate(Rate newRate);
}
