using FXRatesAPI.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FXRatesAPI.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext() { }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Currency> Currencies { get; set; }
    public DbSet<Rate> Rates { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=LAPTOP-E0054I01;Database=CEZ_NexPayFXDB;Trusted_Connection=True;TrustServerCertificate=True");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        new CurrencyEntityTypeConfiguration().Configure(modelBuilder.Entity<Currency>());
        new RateEntityTypeConfiguration().Configure(modelBuilder.Entity<Rate>());

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
            .HasKey(b => b.Id);
    }
}
public class RateEntityTypeConfiguration : IEntityTypeConfiguration<Rate>
{
    public void Configure(EntityTypeBuilder<Rate> builder)
    {
        builder
            .HasKey(r => r.Id);
        builder
            .Property(r => r.Id).IsRequired().ValueGeneratedNever();
        builder
            .Property(r => r.ExchangeRate).HasPrecision(19,9);
        builder
            .HasOne(r => r.CurrencyFrom)
            .WithMany()
            .HasForeignKey(r => r.CurrencyFromId)
            .OnDelete(DeleteBehavior.NoAction);
        builder
            .HasOne(r => r.CurrencyTo)
            .WithMany()
            .HasForeignKey(r => r.CurrencyToId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}

