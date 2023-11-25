using CZ.Common.Entities;
using CZ.Common.Extensions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PaymentsAPI.Domain;
using PaymentsAPI.Domain.DTOs;
using PaymentsAPI.Domain.Params;
using PaymentsAPI.WebAPI.Services;

namespace PaymentsAPI.WebAPI;


[EnableCors("GeneralPolicy")]
[Route("api/")]
[ApiController]
public class ContractsController : ControllerBase
{
    private readonly ILogger<ContractsController> _logger;
    private ContractsService _contractsService;

    public ContractsController(ILogger<ContractsController> logger, ContractsService contractsService)
    {
        _logger = logger;
        _contractsService = contractsService;
    }

    /// <summary>
    /// Gets all Contracts
    /// </summary>
    /// <returns>A list of all Contracts</returns>
    [HttpGet("contracts/all")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetAllContracts()
        => (await _contractsService.GetAllContracts()).Select(c => c.toDTO());

    /// <summary>
    /// Gets all Contracts assigned to a user
    /// </summary>
    /// <returns>A list of all Contracts assigned to a user</returns>
    [HttpGet("users/{userId}/contracts")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetContractsByUserId([FromRoute] string userId)
        => (await _contractsService.GetContractsByUserId(Guid.Parse(userId))).Select(c => c.toDTO());
    
    /// <summary>
    /// Gets a Contract by Id
    /// </summary>
    /// <returns>The Contract with provided Id</returns>
    [HttpGet("contracts/{id}")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<ContractDTO> GetContractById([FromRoute] string id)
        => (await _contractsService.GetContractById(Guid.Parse(id))).toDTO();

    /// <summary>
    /// Gets all Contract Status Options
    /// </summary>
    /// <returns>A list of all Contract Statuses</returns>
    [HttpGet("statuses/options")]
    [ProducesResponseType(typeof(IEnumerable<Select>), StatusCodes.Status200OK)]
    public List<Select> GetContractStatusOptions()
        => (new ContractStatus()).ToSelectList().ToList();

    /// <summary>
    /// Creates a Contract between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid Contract for the given currencies</returns>
    [HttpPost("contracts")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<JsonResult> CreateContract([FromBody] CreateContractParam param)
        => new JsonResult((await _contractsService.CreateContract(param)).toDTO());

    /// <summary>
    /// Updates a Contract's status. 
    /// </summary>
    /// <param name="param"></param>
    /// <returns>The updated Contract</returns>
    [HttpPut("contracts/{userId}")]
    [ProducesResponseType(typeof(ContractDTO), StatusCodes.Status200OK)]
    public async Task<JsonResult> UpdateContractStatus([FromRoute] string userId, [FromBody] UpdateContractStatusParam param)
        => new JsonResult((await _contractsService.UpdateContractStatus(param)).toDTO());
}
