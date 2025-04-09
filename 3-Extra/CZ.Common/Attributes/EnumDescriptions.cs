namespace CZ.Common.Attributes;

[AttributeUsage(AttributeTargets.Field)]
public class EnumDescription(string description) : Attribute
{
    public virtual string Description { get => description; }
}
