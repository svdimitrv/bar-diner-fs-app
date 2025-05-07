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

        // Make sure category is provided
        if (newItem.Category == null || string.IsNullOrWhiteSpace(newItem.Category.Name))
        {
            return BadRequest("Category is required.");
        }

        var existingCategory = await _context.MenuCategories
            .FirstOrDefaultAsync(c => c.Name.ToLower() == newItem.Category.Name.ToLower());

        if (existingCategory == null)
        {
            return BadRequest("Category does not exist.");
        }

        newItem.CategoryId = existingCategory.Id;
        newItem.Category = null;

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

        var categoryExists = await _context.MenuCategories
            .AnyAsync(c => c.Id == updatedItem.CategoryId);

        if (!categoryExists)
        {
            return BadRequest($"Category with ID {updatedItem.CategoryId} does not exist.");
        }

        var existingItem = await _context.MenuItems
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

        try
        {
            await _context.SaveChangesAsync();
            return Ok(existingItem);
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, $"Database update failed: {ex.InnerException?.Message ?? ex.Message}");
        }
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
