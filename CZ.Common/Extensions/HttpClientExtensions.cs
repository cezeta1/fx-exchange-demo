using System.Net.Http.Json;

namespace CZ.Common.Extensions;

public static class HttpClientExtensions
{
    // TODO: Add query object mapping support

    public static async Task<T?> GetAsync<T>(this HttpClient httpClient, string? query)
        => await httpClient.GetFromJsonAsync<T>(query ?? "");

    public static async Task<T?> PostAsync<T,V>(this HttpClient httpClient, string query, V body)
        => await (await httpClient.PostAsJsonAsync(query ?? "", body)).ReadFromJsonAsync<T>();
    
    public static async Task<T?> PutAsync<T, V>(this HttpClient httpClient, string query, V body)
        => await (await httpClient.PutAsJsonAsync(query ?? "", body)).ReadFromJsonAsync<T>();

    public static async Task<T?> PatchAsync<T, V>(this HttpClient httpClient, string query, V body)
        => await (await httpClient.PatchAsJsonAsync(query ?? "", body)).ReadFromJsonAsync<T>();

    public static async Task<T?> DeleteAsync<T>(this HttpClient httpClient, string query)
        => await (await httpClient.DeleteAsync(query ?? "")).ReadFromJsonAsync<T>();

    // Private Functions
    private static async Task<T?> ReadFromJsonAsync<T>(this HttpResponseMessage r)
        => await r.Content.ReadFromJsonAsync<T>();
}
