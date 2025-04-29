using Microsoft.AspNetCore.Mvc;

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

    public async Task SendOrderViaMail([FromBody] ReservationDto reservation) {
        await _emailService.SendStaffNotificationAsync("dimitrov.svetoslav@gmail.com", reservation);
    }

}