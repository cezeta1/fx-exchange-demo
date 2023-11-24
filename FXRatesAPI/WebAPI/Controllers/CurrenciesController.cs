using FXRatesAPI.Domain.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace FXRatesAPI.WebAPI;

[EnableCors("GeneralPolicy")]
[Route("api/currencies/")]
[ApiController]
public class CurrenciesController : ControllerBase
{
    private readonly ILogger<CurrenciesController> _logger;
    private CurrenciesService _currenciesService;

    public CurrenciesController(ILogger<CurrenciesController> logger, CurrenciesService currenciesService)
    {
        _logger = logger;
        _currenciesService = currenciesService;
    }

    /// <summary>
    /// Gets all Currency options
    /// </summary>
    /// <returns>A list of all Currency options</returns>
    [HttpGet("all")]
    [ProducesResponseType(typeof(IEnumerable<CurrencyDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<CurrencyDTO>> GetCurrencyOptionsAsync()
    {
        var result = await _currenciesService.GetCurrencyOptions();
        return result.Select(c => c.toDTO());
    }
}
