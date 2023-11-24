namespace PaymentsAPI.Domain.DTOs;

public class ContractDTO
{
    public Guid Id { get; set; }
    public ContractStatus Status { get; set; }
    public Guid RateId { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime ExpiredOn { get; set; }

}
