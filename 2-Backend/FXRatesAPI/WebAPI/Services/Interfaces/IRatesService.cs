using FXRatesAPI.Domain;
using FXRatesAPI.Domain.Params;

namespace FXRatesAPI.WebAPI;

public interface IRatesService
{
    public Task<IEnumerable<Rate>> GetAllRates();

    public Task<Rate> GetRateById(Guid id);
    public Task<IEnumerable<Rate>> GetRatesById(IEnumerable<Guid> ids);

    public Task<Rate> CreateRateQuote(GetRateQuoteParam param);
}
