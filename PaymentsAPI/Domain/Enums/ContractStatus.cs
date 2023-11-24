using Common.Attributes;

namespace PaymentsAPI.Domain;

public enum ContractStatus
{
    [EnumDescription("A Really loOoOng Description")]
    Pending = 1,
    Completed,
    Cancelled,
}
