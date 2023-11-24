using FXRatesAPI.Domain;
using FXRatesAPI.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FXRatesAPI.Repository.Repositories;

public class CurrenciesRepository
{
    private readonly AppDbContext _db;
    public CurrenciesRepository(AppDbContext context)
    {
        _db = context;
    }

    public async Task<IEnumerable<Currency>> GetAllCurrencies()
    {
        return await _db.Currencies.ToListAsync();
    }
    public async Task<Currency> GetCurrencyById(int id)
    {
        var result = await _db.Currencies.Where(c => c.Id == id).SingleOrDefaultAsync();
        if (result == null) {
            throw new Exception("Currency not found. Id is not valid");
        }
        return result;
    }
    public async Task<IEnumerable<Currency>> GetCurrenciesById(List<int> ids)
    {
        return await _db.Currencies.Where(c => ids.Contains(c.Id)).ToListAsync();
    }
}
