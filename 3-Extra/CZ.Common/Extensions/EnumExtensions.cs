using CZ.Common.Attributes;
using CZ.Common.Entities;
using System.Reflection;

namespace CZ.Common.Extensions;

public static class EnumExtensions
{
    public static IEnumerable<Select> ToSelectList<T>(this T _) where T : struct, IConvertible
        => Enum.GetValues(typeof(T))
            .Cast<T>()
            .Select((T val) =>
                new Select
                {
                    Text = GetText(val),
                    Value = Convert.ToInt32(val),
                })
            .ToList();

    public static string GetDescription<T>(this T _, T val) where T : struct, IConvertible
        => GetText(val);

    private static string GetText<T>(T val) where T : struct, IConvertible
    {
        FieldInfo info = typeof(T).GetField(val.ToString());
        return info.IsDefined(typeof(EnumDescription), false)
                ? ((EnumDescription)info.GetCustomAttributes(typeof(EnumDescription), false)[0]).Description
                : Enum.GetName(typeof(T), val)
            ?? "";
    }
}

