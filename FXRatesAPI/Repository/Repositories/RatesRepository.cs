using FXRatesAPI.Domain;
using FXRatesAPI.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FXRatesAPI.Repository.Repositories;

public class RatesRepository
{
    private readonly AppDbContext _db;
    public RatesRepository(AppDbContext context)
    {
        _db = context;
    }

    public async Task<IEnumerable<Rate>> GetAllRates()
    {
        return await _db.Rates.ToListAsync();
    }
    public async Task<Rate> GetRateById(Guid id)
    {
        var result = await _db.Rates
                                .Include(r => r.CurrencyFrom)
                                .Include(r => r.CurrencyTo)
                                .Where(r => r.Id == id)
                                .SingleOrDefaultAsync();

        if (result == null) {
            throw new ApplicationException("Rate not found. Id is not valid");
        }
        return result;
    }

    public async Task<Rate> CreateRate(Rate newRate)
    {
        _db.Rates.Add(newRate);
        await _db.SaveChangesAsync();
        return newRate;
    }
}
