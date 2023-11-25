using CZ.Common.Entities;
using CZ.Common.Extensions;

namespace PaymentsAPI.Domain.DTOs;

public class ContractDTO: EffectivenessDTO
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public ContractStatus Status { get; set; }
    public string StatusName { get => (new ContractStatus()).GetDescription(Status); }

    public Guid RateId { get; set; }
    public decimal Amount { get; set; }
}
