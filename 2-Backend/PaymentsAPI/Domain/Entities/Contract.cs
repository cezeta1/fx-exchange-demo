using CZ.Common.Entities;
using PaymentsAPI.Domain.DTOs;

namespace PaymentsAPI.Domain;

public class Contract: Effectiveness
{
    public Contract() { }

    public Contract(Guid userId) {
            Id = Guid.NewGuid();
            CreatedById = userId;
            Status = ContractStatus.Pending;
            CreatedOn = DateTime.Now;
            ExpiredOn = DateTime.Now.AddDays(7);
    }
    public Guid Id { get; set; }

    public Guid CreatedById { get; set; }
    public Guid? ApprovedById { get; set; }
    
    public ContractStatus Status { get; set; }

    public Guid RateId { get; set; }
    public decimal Amount { get; set; }

    public ContractDTO toDTO()
    {
        return new ContractDTO
        {
            Id = Id,
            CreatedById = CreatedById,
            ApprovedById = ApprovedById,
            Status = Status,
            RateId = RateId,
            Amount = Amount,
            CreatedOn = CreatedOn,
            ExpiredOn = ExpiredOn,
        };
    }
}
