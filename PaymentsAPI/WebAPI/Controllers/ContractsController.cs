using CZ.Common.Entities;
using CZ.Common.Extensions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PaymentsAPI.Domain;
using PaymentsAPI.Domain.DTOs;
using PaymentsAPI.WebAPI.Services;

namespace PaymentsAPI.WebAPI;


[EnableCors("GeneralPolicy")]
[Route("api/contracts/")]
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
    [HttpGet("all")]
    [ProducesResponseType(typeof(IEnumerable<ContractDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<ContractDTO>> GetAllContracts()
    {
        var result = await _contractsService.GetAllContracts();
        return result.Select(c => c.toDTO());
    }
    
    /// <summary>
    /// Gets all Contract Status Options
    /// </summary>
    /// <returns>A list of all Contract Statuses</returns>
    [HttpGet("/statuses/options")]
    [ProducesResponseType(typeof(IEnumerable<Select>), StatusCodes.Status200OK)]
    public List<Select> GetContractStatusOptions()
    {
        var result = (new ContractStatus()).ToSelectList();
        return result.ToList();
    }
}
