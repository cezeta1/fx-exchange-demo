using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;
using FXRatesAPI.Sdk;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PaymentsAPI.Domain.DTOs;

namespace NexPayBFF.WebAPI.Controllers;

[EnableCors("GeneralPolicy")]
[Route("api/")]
[ApiController]
public class FxRatesController
{
    private readonly ILogger<FxRatesController> _logger;
    private readonly FXRatesAPIService _fxRatesAPIService;

    public FxRatesController(ILogger<FxRatesController> logger, FXRatesAPIService fXRatesAPIService)
    {
        _logger = logger;
        _fxRatesAPIService = fXRatesAPIService;
    }

    /// <summary>
    /// Gets all Currency options
    /// </summary>
    /// <returns>A list of all Currency options</returns>
    [HttpGet("currencies/all")]
    [ProducesResponseType(typeof(IEnumerable<CurrencyDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<CurrencyDTO>> GetCurrencyOptionsAsync()
        => await _fxRatesAPIService.GetCurrencyOptionsAsync();

    /// <summary>
    /// Gets a Rate quote by Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("rates/{id}")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<RateDTO> GetRateById([FromRoute] string id)
        => await _fxRatesAPIService.GetRateById(id);

    /// <summary>
    /// Creates a Rate quote between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid quote for the given currencies</returns>
    [HttpPost("rates")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<RateDTO> GetRateQuoteAsync([FromBody] GetRateQuoteParam param)
        => await _fxRatesAPIService.GetRateQuoteAsync(param);
}
