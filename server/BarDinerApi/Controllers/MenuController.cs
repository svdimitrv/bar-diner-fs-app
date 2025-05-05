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

[HttpPost("items")]
public async Task<IActionResult> AddMenuItem([FromBody] MenuItem newItem)
{
    if (newItem == null)
    {
        return BadRequest("Invalid data.");
    }

    _context.MenuItems.Add(newItem);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetMenuItems), new { id = newItem.Id }, newItem);
}

    // Get all menu items
    [HttpGet("items")]
    public async Task<IActionResult> GetMenuItems()
    {
        var items = await _context.MenuItems
            .Include(m => m.Category)
            .ToListAsync();
        Console.WriteLine("Items count: " + _context.MenuItems.Count());
        return Ok(items);
    }

    [HttpPut("items/{id}")]
    public async Task<IActionResult> UpdateMenuItem(int id, [FromBody] MenuItem updatedItem)
    {
        if (id != updatedItem.Id)
        {
            return BadRequest("ID mismatch");
        }

        var existingItem = await _context.MenuItems
            .Include(m => m.Category)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (existingItem == null)
        {
            return NotFound();
        }

        existingItem.Name = updatedItem.Name;
        existingItem.Price = updatedItem.Price;
        existingItem.Description = updatedItem.Description;
        existingItem.Allergens = updatedItem.Allergens;
        existingItem.CategoryId = updatedItem.CategoryId;

        await _context.SaveChangesAsync();
        return Ok(existingItem);
    }

    [HttpDelete("items/{id}")]
    public async Task<IActionResult> DeleteMenuItem(int id)
    {
        var item = await _context.MenuItems.FindAsync(id);
        if (item == null)
        {
            return NotFound();
        }

        _context.MenuItems.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // Get all categories
    [HttpGet("categories")]
    public async Task<IActionResult> GetMenuCategories()
    {
        var categories = await _context.MenuCategories.ToListAsync();
        return Ok(categories);
    }
}
