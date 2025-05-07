using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<MenuCategory> MenuCategories { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Checkout> AllOrders { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<UserInfo> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Checkout → UserInfo (many Checkouts can belong to one UserInfo)
        modelBuilder.Entity<Checkout>()
            .HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Checkout → Orders (one Checkout has many Orders)
        modelBuilder.Entity<Checkout>()
            .HasMany(c => c.Orders)
            .WithOne(o => o.Checkout)
            .HasForeignKey(o => o.CheckoutId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class Order
{
    [Key]
    public int OrderId { get; set; }
    public string? DishName { get; set; }
    public double Price { get; set; }
    public int DishQuantity { get; set; }
    public double Total { get; set; }
    public int CheckoutId { get; set; }
    public Checkout Checkout { get; set; } = null!;
}

public class UserInfo
{
    [Key]
    public int UserId { get; set; }
    public string Name { get; set; } = "";
    public string City { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Street { get; set; } = "";
    public int StreetNumber { get; set; }
    public bool isHouse { get; set; }
    public int? ApartmentBuildingNumber { get; set; }
    public int? Floor { get; set; }
    public int? ApartmentNumber { get; set; }
}

public class Checkout
{
    public int Id { get; set; }
    public double GrandTotal { get; set; }
    public int UserId { get; set; }
    public UserInfo? User { get; set; }
    public List<Order>? Orders { get; set; }
}

public class Reservation
{
    public int Id { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public TimeOnly Time { get; set; }

    [Range(1, 20)]
    public int PartySize { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    [Required]
    [Phone]
    public string Phone { get; set; } = "";
}

public class MenuCategory
{
    public int Id { get; set; }
    public string? Name { get; set; }
}

public class MenuItem
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsAvailable { get; set; }
    public int CategoryId { get; set; }
    public string? Allergens { get; set; }
    public MenuCategory? Category { get; set; }
}
