using CZ.Common.Extensions;
using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;
using Microsoft.Extensions.Options;
using System.Web;

namespace FXRatesAPI.Sdk;

public class FXRatesAPIOptions
{
    public string BaseURL { get; set; } = string.Empty;
}

#pragma warning disable CS8603 // Possible null reference return.

public class FXRatesAPIService
{
    private static HttpClient _httpClient = new();

    public FXRatesAPIService(IOptions<FXRatesAPIOptions> options)
    {
        _httpClient.BaseAddress = new Uri(options.Value.BaseURL + "api/");
    }

    // Rates
    public static async Task<RateDTO> GetRateById(string id)
        => await _httpClient.GetAsync<RateDTO>($"rates/{id}");

    public static async Task<IEnumerable<RateDTO>> GetRatesById(IEnumerable<Guid> ids)
    {
        var builder = new UriBuilder("rates");
        builder.Port = -1;
        var query = HttpUtility.ParseQueryString(builder.Query);
        for (var i = 0; i < ids.Count(); i++)
        {
            query[$"ids[{i}]"] = ids.ElementAt(i).ToString();
        }
        builder.Query = query.ToString();
        return await _httpClient.GetAsync<IEnumerable<RateDTO>>("rates"+builder.Query.ToString());
    } 

    public static async Task<RateDTO> GetRateQuote(GetRateQuoteParam param)
        => await _httpClient.PostAsync<RateDTO, GetRateQuoteParam>("rates", param);

    // Currencies
    public static async Task<IEnumerable<CurrencyDTO>> GetCurrencyOptions()

        => await _httpClient.GetAsync<IEnumerable<CurrencyDTO>>("currencies/all");
}

#pragma warning restore CS8603 // Possible null reference return.