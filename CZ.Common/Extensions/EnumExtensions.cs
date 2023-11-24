using CZ.Common.Attributes;
using CZ.Common.Entities;
using System.Reflection;

namespace CZ.Common.Extensions;
public static class EnumExtensions
{
    public static IEnumerable<Select> ToSelectList<T>(this T enumerable) where T : struct, IConvertible
    {
        var items = new List<Select>();
        return Enum.GetValues(typeof(T))
                   .Cast<T>()
                   .ToList<T>()
                   .Select((T val) =>
                   {
                       FieldInfo info = typeof(T).GetField(val.ToString());
                       string? text = info.IsDefined(typeof(EnumDescription), false)
                        ? ((EnumDescription)info.GetCustomAttributes(typeof(EnumDescription), false)[0]).Description
                        : Enum.GetName(typeof(T), val);
                       return new Select
                       {
                           Text = text ?? "",
                           Value = Convert.ToInt32(val),
                       };
                   }).ToList();

    }
}

