using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace FXRatesAPI.WebAPI;

[EnableCors("GeneralPolicy")]
[Route("api/rates/")]
[ApiController]
public class RatesController : ControllerBase
{
    private readonly ILogger<RatesController> _logger;
    private RatesService _ratesService;

    public RatesController(ILogger<RatesController> logger, RatesService ratesService)
    {
        _logger = logger;
        _ratesService = ratesService;
    }

    /// <summary>
    /// Gets a Rate quote by Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<JsonResult> GetRateById([FromRoute] string id)
        => new JsonResult((await _ratesService.GetRateById(Guid.Parse(id))).toDTO());

    /// <summary>
    /// Gets multiple Rates by Id.
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [HttpGet("")]
    [ProducesResponseType(typeof(IEnumerable<RateDTO>), StatusCodes.Status200OK)]
    public async Task<JsonResult> GetRatesById([FromQuery] IEnumerable<Guid> ids)
        => new JsonResult((await _ratesService.GetRatesById(ids)).Select(r => r.toDTO()));

    /// <summary>
    /// Creates a Rate quote between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid quote for the given currencies</returns>
    [HttpPost]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<JsonResult> GetRateQuoteAsync([FromBody] GetRateQuoteParam param)
        => new JsonResult((await _ratesService.CreateRateQuote(param)).toDTO());
}
