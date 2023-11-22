using FXRatesAPI.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FXRatesAPI.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext() { }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Currency> Currencies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=LAPTOP-E0054I01;Database=CEZ_NexPayFXDB;Trusted_Connection=True;TrustServerCertificate=True");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        new CurrencyEntityTypeConfiguration().Configure(modelBuilder.Entity<Currency>());

        #region Seed
        modelBuilder.Entity<Currency>().HasData(
            new Currency
            {
                Id = 1,
                Name = "Australian Dollar",
                Symbol = "AUD"
            },
            new Currency
            {
                Id = 2,
                Name = "Canadian Dollar",
                Symbol = "CAD"
            },
            new Currency
            {
                Id = 3,
                Name = "US Dollar",
                Symbol = "USD"
            },
            new Currency
            {
                Id = 4,
                Name = "British Pound Sterling",
                Symbol = "GBP"
            },
            new Currency
            {
                Id = 5,
                Name = "NZ Dollar",
                Symbol = "NZD"
            }
       );
        #endregion
    }
}

public class CurrencyEntityTypeConfiguration : IEntityTypeConfiguration<Currency>
{
    public void Configure(EntityTypeBuilder<Currency> builder)
    {
        builder
            .Property(b => b.Id)
            .IsRequired();
    }
}

