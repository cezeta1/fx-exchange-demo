using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaymentsAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedApprovedBy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Contracts",
                newName: "CreatedById");

            migrationBuilder.AddColumn<Guid>(
                name: "ApprovedById",
                table: "Contracts",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovedById",
                table: "Contracts");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Contracts",
                newName: "UserId");
        }
    }
}
