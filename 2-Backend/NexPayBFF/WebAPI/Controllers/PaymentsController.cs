using CZ.Common.Entities;
using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Sdk;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NexPayBFF.WebAPI.Extensions;
using PaymentsAPI.Domain.DTOs;
using PaymentsAPI.Domain.Params;
using PaymentsAPI.Sdk;

namespace NexPayBFF.WebAPI.Controllers;

[EnableCors("GeneralPolicy")]
[Route("api/")]
[ApiController]
public class PaymentsController
{
    private readonly ILogger<PaymentsController> _logger;
    private readonly PaymentsAPIService _paymentsAPIService;
    private readonly FXRatesAPIService _fxRatesAPIService;

    public PaymentsController(ILogger<PaymentsController> logger, PaymentsAPIService paymentsAPIService, FXRatesAPIService fXRatesAPIService)
    {
        _logger = logger;
        _paymentsAPIService = paymentsAPIService;
        _fxRatesAPIService = fXRatesAPIService;
    }

    /// <summary>
    /// Gets all Contracts
    /// </summary>
    /// <returns>A list of all Contracts</returns>
    [HttpGet("contracts/all")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetAllContracts()
    {
        IEnumerable<ContractDTO> results = await _paymentsAPIService.GetAllContracts();
        await results.Apply(_fxRatesAPIService.GetRatesById);
        return results;
    }

    /// <summary>
    /// Gets all Contracts assigned to a user
    /// </summary>
    /// <returns>A list of all Contracts assigned to a user</returns>
    [HttpGet("users/{userId}/contracts")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetContractsByUserId([FromRoute] string userId)
    {
        IEnumerable<ContractDTO> results = await _paymentsAPIService.GetContractsByUserId(userId);
        results.Apply(_fxRatesAPIService.GetRatesById);
        return results;
    }

    /// <summary>
    /// Gets a Contract by Id
    /// </summary>
    /// <returns>The Contract with provided Id</returns>
    [HttpGet("contracts/{id}")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<ContractDTO> GetContractById([FromRoute] string id)
        => await _paymentsAPIService.GetContractById(id);

    /// <summary>
    /// Gets all Contract Status Options
    /// </summary>
    /// <returns>A list of all Contract Statuses</returns>
    [HttpGet("statuses/options")]
    [ProducesResponseType(typeof(IEnumerable<Select>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<Select>> GetContractStatusOptions()
        => await _paymentsAPIService.GetContractStatusOptions();

    /// <summary>
    /// Creates a Contract between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid Contract for the given currencies</returns>
    [HttpPost("contracts")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<ContractDTO> CreateContract([FromBody] CreateContractParam param)
        => await _paymentsAPIService.CreateContract(param);

    /// <summary>
    /// Updates a Contract's status. 
    /// </summary>
    /// <param name="param"></param>
    /// <returns>The updated Contract</returns>
    [HttpPut("contracts/{userId}")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<ContractDTO> UpdateContractStatus([FromRoute] string userId, [FromBody] UpdateContractStatusParam param)
        => await _paymentsAPIService.UpdateContractStatus(userId,param);
}
