using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<MenuCategory> MenuCategories { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
}

public class Order {
    public string? DishName {get;set;}
    public double Price {get;set;}
    public int DishQuantity { get; set; }
    public double Total { get; set; }
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
