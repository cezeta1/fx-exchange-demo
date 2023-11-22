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

    public CurrenciesController(ILogger<CurrenciesController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Gets all the currency options
    /// </summary>
    [HttpGet("all")]
    [ProducesResponseType(typeof(IEnumerable<CurrencyDTO>), StatusCodes.Status200OK)]
    public JsonResult GetCurrencyOptions()
    {
        var result = new List<CurrencyDTO>();
        return new JsonResult(result);
    }
}
