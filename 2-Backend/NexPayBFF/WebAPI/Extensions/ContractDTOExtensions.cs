using CZ.Common.Entities;
using FXRatesAPI.Domain.DTOs;
using PaymentsAPI.Domain.DTOs;

namespace NexPayBFF.WebAPI.Extensions;

public static class ContractDTOExtensions
{
    public static async void Apply(this ContractDTO c, IEnumerable<RateDTO> allRates, IEnumerable<AzureUser> allUsers) { 
        var rate = allRates.Where(r => r.Id == c.RateId).FirstOrDefault();
        var user = allUsers.Where(u => u.Id == c.UserId).FirstOrDefault();
        c.Rate = rate;
        c.User = user;
    }
    public static async Task Apply(
        this IEnumerable<ContractDTO> cs,
        Func<IEnumerable<Guid>, Task<IEnumerable<RateDTO>>> getRates,
        Func<Guid, Task<AzureUser>> getUser)
    {
        var allRates = await getRates(cs.Select(x => x.RateId));
        var allUserIds = cs.Select(x => x.UserId).Distinct();
        var allUsers = new List<AzureUser>();
        for (int i = 0; i < allUserIds.Count(); i++)
        {
            allUsers.Add(await getUser(allUserIds.ElementAt(i)));
        }
        foreach (var item in cs) {
            item.Apply(allRates,allUsers);
        }
    }
}
