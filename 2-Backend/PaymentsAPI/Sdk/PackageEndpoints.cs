using CZ.Common.Entities;
using CZ.Common.Extensions;
using Microsoft.Extensions.Options;
using PaymentsAPI.Domain.DTOs;
using PaymentsAPI.Domain.Params;

namespace PaymentsAPI.Sdk;

public class PaymentsAPIOptions
{
    public string BaseURL { get; set; } = string.Empty;
}
public class PaymentsAPIService
{
    private static HttpClient? _httpClient;
    public PaymentsAPIService(IOptions<PaymentsAPIOptions> options)
    {
        _httpClient = new() {
            BaseAddress = new Uri(options.Value.BaseURL + "api/"),
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

    public async Task<ContractDTO> UpdateContractStatus(UpdateContractStatusParam param)
        => await _httpClient.PutAsync<ContractDTO, UpdateContractStatusParam>($"contracts/{param.ContractId}", param);
}