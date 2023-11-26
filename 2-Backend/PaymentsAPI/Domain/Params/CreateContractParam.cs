namespace PaymentsAPI.Domain.Params;

public class CreateContractParam
{
    public Guid UserId { get; set; }
    public Guid RateId { get; set; }
    public decimal Amount { get; set; }
}
