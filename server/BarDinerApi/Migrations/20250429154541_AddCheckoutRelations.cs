using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarDinerApi.Migrations
{
    /// <inheritdoc />
    public partial class AddCheckoutRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllOrders_UserInfo_UserId",
                table: "AllOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_AllOrders_CheckoutId",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.RenameTable(
                name: "UserInfo",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "Orders");

            migrationBuilder.RenameIndex(
                name: "IX_Order_CheckoutId",
                table: "Orders",
                newName: "IX_Orders_CheckoutId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AllOrders",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CheckoutId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_AllOrders_Users_UserId",
                table: "AllOrders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AllOrders_CheckoutId",
                table: "Orders",
                column: "CheckoutId",
                principalTable: "AllOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllOrders_Users_UserId",
                table: "AllOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AllOrders_CheckoutId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "UserInfo");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Order");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CheckoutId",
                table: "Order",
                newName: "IX_Order_CheckoutId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AllOrders",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CheckoutId",
                table: "Order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserInfo",
                table: "UserInfo",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_AllOrders_UserInfo_UserId",
                table: "AllOrders",
                column: "UserId",
                principalTable: "UserInfo",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AllOrders_CheckoutId",
                table: "Order",
                column: "CheckoutId",
                principalTable: "AllOrders",
                principalColumn: "Id");
        }
    }
}
