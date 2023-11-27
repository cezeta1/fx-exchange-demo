using CZ.Common.Entities;
using FXRatesAPI.Domain.DTOs;
using PaymentsAPI.Domain.DTOs;

namespace NexPayBFF.WebAPI.Extensions;

public static class ContractDTOExtensions
{
    public static void Apply(this ContractDTO c, IEnumerable<RateDTO> allRates) { 
        var rate = allRates.Where(r => r.Id == c.RateId).FirstOrDefault();
        c.Rate = rate; 
    }
    public static async Task Apply(this IEnumerable<ContractDTO> cs, Func<IEnumerable<Guid>,Task<IEnumerable<RateDTO>>> getRates)
    {
        var allRates = await getRates(cs.Select(x => x.RateId));
        foreach (var item in cs) {
            item.Apply(allRates);
        }
    }
}
