using PaymentsAPI.Domain;
using PaymentsAPI.Domain.Params;

namespace PaymentsAPI.WebAPI.Services;
public interface IContractsService
{
    public Task<IEnumerable<Contract>> GetAllContracts();

    public Task<IEnumerable<Contract>> GetContractsByUserId(Guid userId);

    public Task<Contract> GetContractById(Guid id);

    public Task<Contract> CreateContract(CreateContractParam param);

    public Task<Contract> UpdateContractStatus(UpdateContractStatusParam param);
}
