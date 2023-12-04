namespace PaymentsAPI.Domain.Params;

public class UpdateContractStatusParam
{
    public Guid ContractId { get; set; }
    public Guid AdminId { get; set; }
    public ContractStatus NewStatus {  get; set; }
}
