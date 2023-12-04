using CZ.Common.Utilities;
using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;
using FXRatesAPI.Sdk;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NexPayBFF.WebAPI.Extensions;

namespace NexPayBFF.WebAPI.Controllers;

[Authorize]
//[RequiredScope("tasks.read")]
[EnableCors("GeneralPolicy")]
[Route("api/")]
[ApiController]
public class FxRatesController
{
    private readonly ILogger<FxRatesController> _logger;
    private readonly FXRatesAPIService _fxRatesAPIService;
    private readonly UserHelper _userHelper;
    public FxRatesController(
        ILogger<FxRatesController> logger,
        FXRatesAPIService fXRatesAPIService,
        IHttpContextAccessor contextAccessor,
        UserHelper userHelper
    ) {
        _logger = logger;
        _fxRatesAPIService = fXRatesAPIService;
        //_userHelper = new UserHelper(contextAccessor);
        _userHelper = userHelper;
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
    /// <returns>The Rate quote</returns>
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
    {
        param.UserId = Guid.Parse(_userHelper.GetUserId() ?? throw new Exception("User Id cannot be found."));
        return await _fxRatesAPIService.GetRateQuoteAsync(param);
    }
}
