using Microsoft.Graph.Models;

namespace CZ.Common.Entities;

public class AzureUser
{
    public AzureUser() { }
    public AzureUser(User user) {
        Id = user.Id != null ? Guid.Parse(user.Id) : Guid.Empty;
        FullName = user.DisplayName ?? "";
        Email = user.UserPrincipalName ?? "";
    }

    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
}
