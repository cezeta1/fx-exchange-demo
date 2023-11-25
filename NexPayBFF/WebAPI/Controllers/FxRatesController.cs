namespace NexPayBFF.WebAPI.Controllers;

public class FxRatesController
{
    private readonly ILogger<FxRatesController> _logger;

    public FxRatesController(ILogger<FxRatesController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Creates a Payment quote between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns>A new valid quote for the given currencies</returns>
    //[HttpPost]
    //[ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    //public async Task<JsonResult> GetRateQuoteAsync([FromBody] GetRateQuoteParam param)
    //{
    //    var result = await _paymentsService.CreateRateQuote(param);
    //    return new JsonResult(result.toDTO());
    //}
}
