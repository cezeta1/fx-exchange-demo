using FXRatesAPI.Domain.Params;
using FXRatesAPI.Repository;
using System.Net.Http.Headers;

namespace FXRatesAPI.WebAPI;

public class RatesService
{
    private readonly RatesRepository _ratesRepository;
    private readonly CurrenciesRepository _currenciesRepository;
    public RatesService(RatesRepository ratesRepository, CurrenciesRepository currenciesRepository)
    {
        _ratesRepository = ratesRepository;
        _currenciesRepository = currenciesRepository;
    }

    public async Task<IEnumerable<Rate>> GetAllRates()
    {
        return await _ratesRepository.GetAllRates();
    }
    public async Task<Rate> GetRateById(Guid id)
    {
        return await _ratesRepository.GetRateById(id);
    }

    public async Task<Rate> CreateRateQuote(GetRateQuoteParam param)
    {
        Rate newRate = new Rate();

        // Get desired currencies
        IEnumerable<Currency> currs = await _currenciesRepository.GetCurrenciesById([param.FromId,param.ToId]);
        newRate.CurrencyFromId = currs.ElementAt(0).Id;
        newRate.CurrencyToId = currs.ElementAt(1).Id;

        // Get current exchange from external API
        decimal currentRate = -1;
        using (var client = new HttpClient())
        {
            //https://api.frankfurter.app/latest?from=USD&to=CAD
            client.BaseAddress = new Uri("https://api.frankfurter.app/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // HTTP GET
            string url = $"latest?from={currs.ElementAt(0).Symbol}&to={currs.ElementAt(1).Symbol}";
            var response = client.GetAsync(url);
            response.Wait();
            HttpResponseMessage result = response.Result;
            if (result.IsSuccessStatusCode)
            {
                var jsonResult = await result.Content.ReadFromJsonAsync<ExchangeRatesAPIResult>();
                if (jsonResult.Rates.Any())
                    currentRate = jsonResult.Rates.ElementAt(0).Value;
            }
        }
        if (currentRate != -1)
            newRate.ExchangeRate = currentRate;
        else throw new Exception("Current Rate not found.");

        newRate = await _ratesRepository.CreateRate(newRate);
        return newRate;
    }
}
