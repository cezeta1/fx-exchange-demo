using FXRatesAPI.Domain;
using FXRatesAPI.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FXRatesAPI.Repository;

public class CurrenciesRepository
{
    private readonly AppDbContext _db;
    public CurrenciesRepository(AppDbContext context)
    {
        _db = context;
    }

    public async Task<IEnumerable<Currency>> GetAllCurrencies()
        => await _db.Currencies.ToListAsync();

    public async Task<Currency> GetCurrencyById(int id)
        => await _db.Currencies.Where(c => c.Id == id)
                           .SingleOrDefaultAsync()
                ?? throw new Exception("Currency not found. Id is not valid");

    public async Task<IEnumerable<Currency>> GetCurrenciesById(List<int> ids)
        => await _db.Currencies.Where(c => ids.Contains(c.Id)).ToListAsync();
}
