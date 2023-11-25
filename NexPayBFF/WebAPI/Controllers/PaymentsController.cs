using CZ.Common.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PaymentsAPI.Domain;
using PaymentsAPI.Domain.DTOs;
using PaymentsAPI.Domain.Params;
using PaymentsAPI.Sdk;

namespace NexPayBFF.WebAPI.Controllers;


[EnableCors("GeneralPolicy")]
[Route("api/payments/")]
[ApiController]
public class PaymentsController
{
    private readonly ILogger<PaymentsController> _logger;
    private readonly PaymentsAPIService _paymentsAPIService;

    public PaymentsController(ILogger<PaymentsController> logger, PaymentsAPIService paymentsAPIService)
    {
        _logger = logger;
        _paymentsAPIService = paymentsAPIService;
    }

    /// <summary>
    /// Gets all Contracts
    /// </summary>
    /// <returns>A list of all Contracts</returns>
    [HttpGet("contracts/all")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetAllContracts()
        => await _paymentsAPIService.GetAllContracts();


    /// <summary>
    /// Gets all Contracts assigned to a user
    /// </summary>
    /// <returns>A list of all Contracts assigned to a user</returns>
    [HttpGet("users/{userId}/contracts")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetContractsByUserId([FromRoute] string userId)
        => await _paymentsAPIService.GetContractsByUserId(userId);

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
