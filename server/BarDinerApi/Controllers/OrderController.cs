using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{

    private readonly AppDbContext _context;
    private readonly EmailService _emailService;

    public OrderController(AppDbContext context, EmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }
    //get a list of all orders
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var checkouts = await _context.AllOrders
                        .Include(c => c.User)
                        .Include(c => c.Orders)
                        .ToListAsync();

        return Ok(checkouts);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CheckoutDto checkoutDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var random = new Random();
        var userEntity = new UserInfo
        {
            UserId = random.Next(1, 55555),
            Name = checkoutDto.User.Name,
            City = checkoutDto.User.City,
            Email = checkoutDto.User.Email,
            Street = checkoutDto.User.Street,
            StreetNumber = checkoutDto.User.StreetNumber,
            isHouse = checkoutDto.User.isHouse,
            ApartmentBuildingNumber = checkoutDto.User.ApartmentBuildingNumber,
            ApartmentNumber = checkoutDto.User.ApartmentNumber,
            Floor = checkoutDto.User.Floor
        };

        var orders = checkoutDto.Orders.Select(orderDto => new Order
        {
            OrderId = random.Next(1, 999999),
            DishName = orderDto.DishName,
            DishQuantity = orderDto.DishQuantity,
            Price = orderDto.Price,
            Total = orderDto.Total
        }).ToList();

        var entity = new Checkout
        {
            Id = random.Next(1, 99999),
            GrandTotal = checkoutDto.GrandTotal,
            User = userEntity,
            Orders = orders
        };

        _context.AllOrders.Add(entity);
        await _context.SaveChangesAsync();

        await _emailService.SendStaffNotificationAsync("dimitrov.svetoslav@gmail.com", entity);

        return Ok(new { success = true });
    }

}