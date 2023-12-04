using PaymentsAPI.Domain;

namespace PaymentsAPI.Repository;

public interface IContractsRepository
{
    public Task<IEnumerable<Contract>> GetAllContracts();
    public Task<IEnumerable<Contract>> GetContractsByUserId(Guid userId);
    public Task<Contract> GetContractById(Guid id);
    public Task<Contract> CreateContract(Contract newContract);
    public Task<Contract> UpdateContractStatus(Guid contractId, Guid adminId, ContractStatus newStatus);
}
