using PaymentsAPI.Domain;
using PaymentsAPI.Domain.Params;
using PaymentsAPI.Repository;

namespace PaymentsAPI.WebAPI.Services;

public class ContractsService
{
    private readonly ContractsRepository _contractsRepository;
    public ContractsService(ContractsRepository contractsRepository)
    {
        _contractsRepository = contractsRepository;
    }

    public async Task<IEnumerable<Contract>> GetAllContracts()
    {
        return await _contractsRepository.GetAllContracts();
    }
    
    public async Task<Contract> CreateContract(CreateContractParam param)
    {
        string userIdStr = "29de8b07-4750-4ad0-a43e-f9c5ed493f53";
        Contract newContract = new Contract(Guid.Parse(userIdStr));
        newContract.RateId = param.RateId;
        newContract.Amount = param.Amount;
        newContract = await _contractsRepository.CreateContract(newContract);
        return newContract;
    }
}
