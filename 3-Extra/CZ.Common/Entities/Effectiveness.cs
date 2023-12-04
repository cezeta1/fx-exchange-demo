namespace CZ.Common.Entities;

public class Effectiveness
{
    public Effectiveness()
    {
        CreatedOn = DateTime.Now;
    }
    public Effectiveness(DateTime validOn)
    {
        CreatedOn = validOn;
    }

    public DateTime CreatedOn { get; set; }
    public DateTime ExpiredOn { get; set; }
}

public class EffectivenessDTO
{
    public DateTime CreatedOn { get; set; }
    public DateTime ExpiredOn { get; set; }
    public bool IsValid { get => DateTime.Now.CompareTo(ExpiredOn) <= 0; }
}
