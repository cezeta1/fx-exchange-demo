using CZ.Common.Entities;
using FXRatesAPI.Domain.DTOs;
using PaymentsAPI.Domain.DTOs;

namespace NexPayBFF.WebAPI.Extensions;

public static class ContractDTOExtensions
{
    public static void Apply(this ContractDTO c, IEnumerable<RateDTO> allRates, IEnumerable<AzureUser> allUsers) { 
        var rate = allRates.Where(r => r.Id == c.RateId).FirstOrDefault();
        var cUser = allUsers.Where(u => u.Id == c.CreatedById).FirstOrDefault();
        var aUser = allUsers.Where(u => u.Id == c.ApprovedById).FirstOrDefault();
        c.Rate = rate;
        c.CreatedBy = cUser;
        c.ApprovedBy = aUser;
    }
    
    public static async void Apply(
        this ContractDTO c, 
        Func<string, Task<RateDTO>> getRate,
        Func<Guid, Task<AzureUser>> getUser)
    { 
        var rate = await getRate(c.RateId.ToString());
        var cUser = await getUser(c.CreatedById);
        if (c.ApprovedById != null)
            c.ApprovedBy = await getUser((Guid)c.ApprovedById);
        c.Rate = rate;
        c.CreatedBy = cUser;
    }

    public static async Task Apply(
        this IEnumerable<ContractDTO> cs,
        Func<IEnumerable<Guid>, Task<IEnumerable<RateDTO>>> getRates,
        Func<Guid, Task<AzureUser>> getUser)
    {
        var allRates = await getRates(cs.Select(x => x.RateId));
        IEnumerable<Guid> allUserIds = cs.SelectMany(x => new List<Guid?>{x.CreatedById,x.ApprovedById})
                                         .Where(x => x.HasValue).Select(x => (Guid)x)
                                         .Distinct();
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
