using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<MenuCategory> MenuCategories { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
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
