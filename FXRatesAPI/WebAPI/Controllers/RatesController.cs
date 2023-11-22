using FXRatesAPI.Domain;
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

    public RatesController(ILogger<RatesController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Creates a Rate quote between two currencies. Valid only for a given amount of time.
    /// </summary>
    /// <param name="param"></param>
    /// <returns></returns>
    [HttpPost]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public JsonResult GetRateQuote([FromBody] CreateRateParam param)
    {
        var result = new Rate();
        return new JsonResult(result.toDTO());
    }

    /// <summary>
    /// Gets a Rate quote by Id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(RateDTO), StatusCodes.Status200OK)]
    public JsonResult GetRateById([FromRoute] string id)
    {
        var result = new Rate(); // Get rate from Repo
        return new JsonResult(result.toDTO());
    }
}
