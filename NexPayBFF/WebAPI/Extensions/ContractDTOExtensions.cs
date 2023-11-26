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
    public static void Apply(this IEnumerable<ContractDTO> cs, IEnumerable<RateDTO> allRates)
    {
        foreach (var item in cs) {
            item.Apply(allRates);
        }
    }
}
