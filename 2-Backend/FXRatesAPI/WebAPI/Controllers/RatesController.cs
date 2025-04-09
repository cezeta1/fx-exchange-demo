using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace FXRatesAPI.WebAPI;

[EnableCors("GeneralPolicy")]
[Route("api/rates/")]
[ApiController]
public class RatesController(IRatesService _ratesService) 
    : ControllerBase
{
    /// <summary>
    /// Gets a Rate quote by Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<RateDTO> GetRateById([FromRoute] string id)
        => (await _ratesService.GetRateById(Guid.Parse(id))).ToDTO();

    /// <summary>
    /// Gets multiple Rates by Id.
    /// </summary>
    /// <param name="ids"></param>
    /// <returns></returns>
    [HttpGet("")]
    [ProducesResponseType(typeof(IEnumerable<RateDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<RateDTO>> GetRatesById([FromQuery] IEnumerable<Guid> ids)
        => (await _ratesService.GetRatesById(ids)).Select(r => r.ToDTO());

    /// <summary>
    /// Creates a Rate quote between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid quote for the given currencies</returns>
    [HttpPost]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<RateDTO> GetRateQuoteAsync([FromBody] GetRateQuoteParam param)
        => (await _ratesService.CreateRateQuote(param)).ToDTO();
}
