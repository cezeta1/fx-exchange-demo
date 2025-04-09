namespace CZ.Common.Entities;

public class Effectiveness(DateTime? validOn)
{
    public DateTime CreatedOn { get; set; } = validOn ?? DateTime.Now;
    public DateTime ExpiredOn { get; set; }
}

public class EffectivenessDTO
{
    public DateTime CreatedOn { get; set; }
    public DateTime ExpiredOn { get; set; }
    public bool IsValid { get => DateTime.Now.CompareTo(ExpiredOn) <= 0; }
}
