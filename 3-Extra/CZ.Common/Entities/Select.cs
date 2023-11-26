namespace CZ.Common.Entities;
public class Select<T>
{
    public T Value { get; set; }
    public string Text { get; set; }
}
public class Select : Select<int>
{
}
