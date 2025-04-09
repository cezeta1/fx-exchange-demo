using CezetaBFF.WebAPI.Extensions;
using CZ.Common.Entities;
using CZ.Common.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace CezetaBFF.WebAPI.Controllers;

[Authorize]
[EnableCors("GeneralPolicy")]
[Route("api/")]
[ApiController]
public class PaymentsController
{
    private readonly ILogger<PaymentsController> _logger;
    private readonly PaymentsAPIService _paymentsAPIService;
    private readonly FXRatesAPIService _fxRatesAPIService;
    private readonly UserHelper _userHelper;

    public PaymentsController(
        ILogger<PaymentsController> logger,
        PaymentsAPIService paymentsAPIService,
        FXRatesAPIService fXRatesAPIService,
        IHttpContextAccessor contextAccessor,
        UserHelper userHelper)
    {
        _logger = logger;
        _paymentsAPIService = paymentsAPIService;
        _fxRatesAPIService = fXRatesAPIService;
        //_userHelper = new UserHelper(contextAccessor);
        _userHelper = userHelper;
    }

    /// <summary>
    /// Gets all Contracts
    /// </summary>
    /// <returns>A list of all Contracts</returns>
    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("contracts/all")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetAllContracts()
    {
        IEnumerable<ContractDTO> results = await _paymentsAPIService.GetAllContracts();
        await results.Apply(_fxRatesAPIService.GetRatesById, _userHelper.GetAzureUserByIdAsync);
        return results.OrderByDescending(c => c.CreatedOn);
    }

    /// <summary>
    /// Gets all Contracts assigned to a user
    /// </summary>
    /// <returns>A list of all Contracts assigned to a user</returns>
    [HttpGet("users/{userId}/contracts")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetContractsByUserId([FromRoute] string userId)
    {
        // Security Validation
        if (userId != _userHelper.GetUserId())
            throw new Exception($"Current user is unauthorized to get Contracts for userId: {userId}");

        IEnumerable<ContractDTO> results = await _paymentsAPIService.GetContractsByUserId(userId);
        await results.Apply(_fxRatesAPIService.GetRatesById, _userHelper.GetAzureUserByIdAsync);
        return results.OrderByDescending(c => c.CreatedOn);
    }

    /// <summary>
    /// Gets a Contract by Id
    /// </summary>
    /// <returns>The Contract with provided Id</returns>
    [HttpGet("contracts/{id}")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<ContractDTO> GetContractById([FromRoute] string id)
    {
        ContractDTO contract = await _paymentsAPIService.GetContractById(id);
        contract.Apply(_fxRatesAPIService.GetRateById, _userHelper.GetAzureUserByIdAsync);
        return contract;
    }

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
    {
        await param.Validate(_fxRatesAPIService.GetRateById);
        return await _paymentsAPIService.CreateContract(param);
    }

    /// <summary>
    /// Updates a Contract's status. 
    /// </summary>
    /// <param name="param"></param>
    /// <returns>The updated Contract</returns>
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut("contracts/{contractId}")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<ContractDTO> UpdateContractStatus([FromBody] UpdateContractStatusParam param)
    {
        param.AdminId = _userHelper.GetCurrentUser().Id;
        return await _paymentsAPIService.UpdateContractStatus(param);
    }
}
