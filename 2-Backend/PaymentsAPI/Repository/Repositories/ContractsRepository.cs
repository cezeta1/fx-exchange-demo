using Microsoft.EntityFrameworkCore;
using PaymentsAPI.Domain;
using PaymentsAPI.Persistence;

namespace PaymentsAPI.Repository;

public class ContractsRepository(AppDbContext _db) : IContractsRepository
{
    public async Task<IEnumerable<Contract>> GetAllContracts()
        => await _db.Contracts.ToListAsync();

    public async Task<IEnumerable<Contract>> GetContractsByUserId(Guid userId)
        => await _db.Contracts
            .Where(c => c.CreatedById == userId)
            .ToListAsync();

    public async Task<Contract> GetContractById(Guid id)
        => await _db.Contracts
            .Where(c => c.Id == id)
            .SingleOrDefaultAsync()
            ?? throw new ApplicationException("Contract not found. Id is not valid");

    public async Task<Contract> CreateContract(Contract newContract)
    {
        _db.Contracts.Add(newContract);
        await _db.SaveChangesAsync();
        return newContract;
    }

    public async Task<Contract> UpdateContractStatus(
        Guid contractId,
        Guid adminId,
        ContractStatus newStatus)
    {
        Contract cont = await GetContractById(contractId);
        cont.Status = newStatus;
        cont.ApprovedById = adminId;
        _db.Contracts.Update(cont);
        await _db.SaveChangesAsync();
        return cont;
    }
}
