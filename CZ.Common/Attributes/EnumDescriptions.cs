namespace CZ.Common.Attributes;

[AttributeUsage(AttributeTargets.Field)]
public class EnumDescription : Attribute
{
    private string description;

    public EnumDescription(string desc)
    {
        this.description = desc;
    }

    public virtual string Description
    {
        get { return description; }
    }

}
