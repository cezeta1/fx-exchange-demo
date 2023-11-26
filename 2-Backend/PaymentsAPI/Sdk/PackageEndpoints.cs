using CZ.Common.Entities;
using CZ.Common.Extensions;
using PaymentsAPI.Domain.DTOs;
using PaymentsAPI.Domain.Params;

namespace PaymentsAPI.Sdk;

#pragma warning disable CS8603 // Possible null reference return.
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
public class PaymentsAPIService
{
    private static HttpClient _httpClient;
    public PaymentsAPIService()
    {
        _httpClient = new() {
            BaseAddress = new Uri("https://localhost:7005/api/"),
        };
    }

    public async Task<IEnumerable<ContractDTO>> GetAllContracts()
        => await _httpClient.GetAsync<IEnumerable<ContractDTO>>("contracts/all");

    public async Task<IEnumerable<ContractDTO>> GetContractsByUserId(string userId)
        => await _httpClient.GetAsync<IEnumerable<ContractDTO>>($"users/{userId}/contracts");

    public async Task<ContractDTO> GetContractById(string id)
        => await _httpClient.GetAsync<ContractDTO>($"contracts/{id}");
    
    public async Task<IEnumerable<Select>> GetContractStatusOptions()
        => await _httpClient.GetAsync<IEnumerable<Select>>("statuses/options");
    
    public async Task<ContractDTO> CreateContract(CreateContractParam param)
        => await _httpClient.PostAsync<ContractDTO, CreateContractParam>("contracts", param);

    public async Task<ContractDTO> UpdateContractStatus(string userId, UpdateContractStatusParam param)
        => await _httpClient.PutAsync<ContractDTO, UpdateContractStatusParam>($"contracts/{userId}", param);
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
#pragma warning restore CS8603 // Possible null reference return.
