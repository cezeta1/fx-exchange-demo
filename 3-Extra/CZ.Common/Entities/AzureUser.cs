using Microsoft.Graph.Models;

namespace CZ.Common.Entities;

public class AzureUser(User? user)
{
    public Guid Id { get; set; } = user?.Id != null ? Guid.Parse(user.Id) : Guid.Empty;
    public string FullName { get; set; } = user?.DisplayName ?? "";
    public string Email { get; set; } = user?.UserPrincipalName ?? "";
}
