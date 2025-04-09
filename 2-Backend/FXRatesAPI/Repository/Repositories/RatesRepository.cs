using FXRatesAPI.Domain;
using FXRatesAPI.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FXRatesAPI.Repository;

public class RatesRepository(AppDbContext _db) : IRatesRepository
{
    public async Task<IEnumerable<Rate>> GetAllRates()
        => await _db.Rates.ToListAsync();

    public async Task<Rate> GetRateById(Guid id)
        => await _db.Rates
            .Include(r => r.CurrencyFrom)
            .Include(r => r.CurrencyTo)
            .SingleOrDefaultAsync(r => r.Id == id)
            ?? throw new ApplicationException("Rate not found. Id is not valid");

    public async Task<IEnumerable<Rate>> GetRatesById(IEnumerable<Guid> ids)
    {
        IEnumerable<Rate> result = await _db.Rates
            .Include(r => r.CurrencyFrom)
            .Include(r => r.CurrencyTo)
            .Where(r => ids.Contains(r.Id))
            .ToListAsync();

        return result.Count() == ids.Count() 
            ? result 
            : throw new ApplicationException("Some Rates were not found. Some Ids are not valid");
    }

    public async Task<Rate> CreateRate(Rate newRate)
    {
        _db.Rates.Add(newRate);
        await _db.SaveChangesAsync();
        return newRate;
    }
}
