using CZ.Common.Extensions;
using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;

namespace FXRatesAPI.Sdk;

#pragma warning disable CS8603 // Possible null reference return.
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
public class FXRatesAPIService
{
    private static HttpClient _httpClient;
    public FXRatesAPIService()
    {
        _httpClient = new()
        {
            BaseAddress = new Uri("https://localhost:7006/api/"),
        };
    }

    // Rates
    public async Task<RateDTO> GetRateById(string id)
        => await _httpClient.GetAsync<RateDTO>("rates/{id}");

    public async Task<RateDTO> GetRateQuoteAsync(GetRateQuoteParam param)
        => await _httpClient.PostAsync<RateDTO, GetRateQuoteParam>("rates", param);

    // Currencies
    public async Task<IEnumerable<CurrencyDTO>> GetCurrencyOptionsAsync()
        => await _httpClient.GetAsync<IEnumerable<CurrencyDTO>>("currencies/all");
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
#pragma warning restore CS8603 // Possible null reference return.