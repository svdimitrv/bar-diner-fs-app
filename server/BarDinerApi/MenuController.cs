using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class MenuController : ControllerBase
{
    private readonly AppDbContext _context;

    public MenuController(AppDbContext context)
    {
        _context = context;
    }

    // Get all menu items
    [HttpGet("items")]
    public async Task<IActionResult> GetMenuItems()
    {
        var items = await _context.MenuItems
            .Include(m => m.Category) // Include category to get the category name
            .ToListAsync();
        return Ok(items);
    }

    // Get all categories
    [HttpGet("categories")]
    public async Task<IActionResult> GetMenuCategories()
    {
        var categories = await _context.MenuCategories.ToListAsync();
        return Ok(categories);
    }
}
