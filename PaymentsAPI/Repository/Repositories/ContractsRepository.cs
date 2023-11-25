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
        => await _db.Contracts.ToListAsync();
    
    public async Task<IEnumerable<Contract>> GetContractsByUserId(Guid userId)
        => await _db.Contracts.Where(c => c.UserId == userId).ToListAsync();
    
    public async Task<Contract> GetContractById(Guid id)
        => await _db.Contracts.Where(c => c.Id == id)
                              .SingleOrDefaultAsync()
            ?? throw new ApplicationException("Contract not found. Id is not valid");

    public async Task<Contract> CreateContract(Contract newContract)
    {
        _db.Contracts.Add(newContract);
        await _db.SaveChangesAsync();
        return newContract;
    }

    public async Task<Contract> UpdateContractStatus(Guid contractId, ContractStatus newStatus)
    {
        Contract cont = await GetContractById(contractId);
        cont.Status = newStatus;
        _db.Contracts.Update(cont);
        await _db.SaveChangesAsync();
        return cont;
    }
}
