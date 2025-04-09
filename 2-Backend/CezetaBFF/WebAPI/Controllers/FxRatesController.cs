using CZ.Common.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CezetaBFF.WebAPI.Controllers;

[Authorize]
[EnableCors("GeneralPolicy")]
[Route("api/")]
[ApiController]
public class FxRatesController(UserHelper _userHelper)
{
    /// <summary>
    /// Gets all Currency options
    /// </summary>
    /// <returns>A list of all Currency options</returns>
    [HttpGet("currencies/all")]
    [ProducesResponseType(typeof(IEnumerable<CurrencyDTO>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<CurrencyDTO>> GetCurrencyOptionsAsync()
        => await FXRatesAPIService.GetCurrencyOptions();

    /// <summary>
    /// Gets a Rate quote by Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>The Rate quote</returns>
    [HttpGet("rates/{id}")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<RateDTO> GetRateById([FromRoute] string id)
        => await FXRatesAPIService.GetRateById(id);

    /// <summary>
    /// Creates a Rate quote between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid quote for the given currencies</returns>
    [HttpPost("rates")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public async Task<RateDTO> GetRateQuoteAsync([FromBody] GetRateQuoteParam param)
    {
        param.UserId = Guid.Parse(_userHelper.GetUserId() ?? throw new Exception("User Id cannot be found."));
        return await FXRatesAPIService.GetRateQuote(param);
    }
}
