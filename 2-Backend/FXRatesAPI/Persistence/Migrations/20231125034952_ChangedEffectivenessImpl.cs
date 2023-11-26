using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FXRatesAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangedEffectivenessImpl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuotedOn",
                table: "Rates",
                newName: "CreatedOn");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Rates",
                newName: "QuotedOn");
        }
    }
}
