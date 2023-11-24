using PaymentsAPI.Domain;
using PaymentsAPI.Persistence;
using Microsoft.EntityFrameworkCore;

namespace PaymentsAPI.Repository;

public class ContractsRepository
{
    private readonly AppDbContext _db;
    public ContractsRepository(AppDbContext context)
    {
        _db = context;
    }

    public async Task<IEnumerable<Contract>> GetAllContracts()
    {
        return await _db.Contracts.ToListAsync();
    }

    //public async Task<Contract> GetContractById(Guid id)
    //{
        //var result = await _db.Contracts
        //                        .Include(r => r.CurrencyFrom)
        //                        .Include(r => r.CurrencyTo)
        //                        .Where(r => r.Id == id)
        //                        .SingleOrDefaultAsync();

        //if (result == null)
        //{
        //    throw new ApplicationException("Rate not found. Id is not valid");
        //}
        //return result;
    //}

    public async Task<Contract> CreateContract(Contract newContract)
    {
        _db.Contracts.Add(newContract);
        await _db.SaveChangesAsync();
        return newContract;
    }
}
