using FXRatesAPI.Domain.DTOs;
using PaymentsAPI.Domain.Params;

namespace NexPayBFF.WebAPI.Extensions;

public static class CreateContractParamExtensions
{
    public static async Task Validate(this CreateContractParam param, Func<string, Task<RateDTO>> getRatebyId)
    {
        RateDTO rate = await getRatebyId(param.RateId.ToString());
        if (rate == null || !rate.IsValid || rate.UserId != param.UserId)
            throw new ArgumentException("Rate not found or not valid for given user.");
    }
}


