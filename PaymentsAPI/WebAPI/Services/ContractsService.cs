using PaymentsAPI.Domain;
using PaymentsAPI.Domain.Params;
using PaymentsAPI.Repository;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.Http.Headers;

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
        Contract newContract = new Contract();

        // Get exchange rate from external API and check if it is valid
       

        newContract = await _contractsRepository.CreateContract(newContract);
        return newContract;
    }

}
