using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using PaymentsAPI.Domain;

namespace PaymentsAPI.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext() { }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Contract> Contracts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=LAPTOP-E0054I01;Database=CEZ_NexPayPaymentsDB;Trusted_Connection=True;TrustServerCertificate=True");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        new ContractEntityTypeConfiguration().Configure(modelBuilder.Entity<Contract>());
    }
}

public class ContractEntityTypeConfiguration : IEntityTypeConfiguration<Contract>
{
    public void Configure(EntityTypeBuilder<Contract> builder)
    {
        builder
            .HasKey(r => r.Id);
        builder
            .Property(r => r.Id).IsRequired().ValueGeneratedNever();
        builder
            .Property(r => r.UserId).IsRequired().ValueGeneratedNever();
        builder
            .Property(r => r.Amount).HasPrecision(19, 4);
    }
}