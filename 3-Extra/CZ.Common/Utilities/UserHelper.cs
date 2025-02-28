using CZ.Common.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Web;
using Microsoft.Graph;
using Azure.Identity;
using Microsoft.Extensions.Options;
using Microsoft.Graph.Models;

namespace CZ.Common.Utilities;

public class UserHelperOptions
{
    public const string SectionName = "UserHelperOptions";

    public string ClientId { get; set; } = string.Empty;
    public string TenantId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
}

public class UserHelper(
    IOptions<UserHelperOptions> _options,
    IHttpContextAccessor _contextAccessor)
{
    private readonly GraphServiceClient _graphClient = InitializeGraphClient(_options.Value);

    public AzureUser GetCurrentUser()
    {
        var user = _contextAccessor.HttpContext?.User
            ?? throw new Exception($"User not found");

        return new AzureUser {
            Id = Guid.Parse(this.GetUserId() ?? ""),
            FullName = user?.GetDisplayName() ?? "",
            // Email = 
        }; 
    }
    
    public string? GetUserId()
        => _contextAccessor.HttpContext?.User.GetObjectId();

    public async Task<User> GetUserByIdAsync(Guid id)
        => await _graphClient.Users[id.ToString()].GetAsync() 
            ?? throw new Exception($"User not found");

    public async Task<AzureUser> GetAzureUserByIdAsync(Guid id)
    {
        var result = await _graphClient.Users[id.ToString()].GetAsync()
            ?? throw new Exception($"User not found");

        return new AzureUser(result);
    }

    private static GraphServiceClient InitializeGraphClient(UserHelperOptions config) {
        string errorBit = "missing from UserHelper config";
        var scopes = new[] { "https://graph.microsoft.com/.default" };

        // Values from app registration
        var tenantId = config.TenantId ?? throw new Exception($"Tenant Id {errorBit}");
        var clientId = config.ClientId ?? throw new Exception($"Client Id {errorBit}");
        var clientSecret = config.ClientSecret ?? throw new Exception($"Client Secret {errorBit}");

        ClientSecretCredentialOptions options = new() 
        { AuthorityHost = AzureAuthorityHosts.AzurePublicCloud };

        // https://learn.microsoft.com/dotnet/api/azure.identity.clientsecretcredential
        var clientSecretCredential = new ClientSecretCredential(
            tenantId, clientId, clientSecret, options);

        return new(clientSecretCredential, scopes);
    }
}