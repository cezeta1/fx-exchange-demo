using CZ.Common.Extensions;
using FXRatesAPI.Domain.DTOs;
using FXRatesAPI.Domain.Params;
using System.Linq;
using System.Web;

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

    public async Task<IEnumerable<RateDTO>> GetRatesById(IEnumerable<Guid> ids)
    {
        var builder = new UriBuilder("rates");
        builder.Port = -1;
        var query = HttpUtility.ParseQueryString(builder.Query);
        for (var i = 0; i < ids.Count(); i++)
        {
            query[$"ids[{i}]"] = ids.ElementAt(i).ToString();
        }
        builder.Query = query.ToString();
        //string query = "?ids[]=" + string.Join("&ids[]=",ids.Select(x => x.ToString()));
        return await _httpClient.GetAsync<IEnumerable<RateDTO>>("rates"+builder.Query.ToString());
    } 

    public async Task<RateDTO> GetRateQuoteAsync(GetRateQuoteParam param)
        => await _httpClient.PostAsync<RateDTO, GetRateQuoteParam>("rates", param);

    // Currencies
    public async Task<IEnumerable<CurrencyDTO>> GetCurrencyOptionsAsync()
        => await _httpClient.GetAsync<IEnumerable<CurrencyDTO>>("currencies/all");
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
#pragma warning restore CS8603 // Possible null reference return.