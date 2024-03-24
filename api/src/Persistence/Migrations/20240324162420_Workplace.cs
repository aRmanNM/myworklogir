using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Workplace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkplaceId",
                table: "WorkLog",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkplaceId",
                table: "Todo",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Workplace",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workplace", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Workplace");

            migrationBuilder.DropColumn(
                name: "WorkplaceId",
                table: "WorkLog");

            migrationBuilder.DropColumn(
                name: "WorkplaceId",
                table: "Todo");
        }
    }
}
