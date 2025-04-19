using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly EmailService _emailService;

    public ReservationsController(AppDbContext context, EmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] ReservationDto reservation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var entity = new Reservation
        {
            Date = DateTime.SpecifyKind(reservation.Date.Date, DateTimeKind.Utc),
            Time = reservation.Time,
            PartySize = reservation.PartySize,
            Name = reservation.Name,
            Email = reservation.Email,
            Phone = reservation.Phone
        };

        _context.Reservations.Add(entity);
        await _context.SaveChangesAsync();
        if (_emailService == null)
        {
            throw new Exception("Email service is not injected properly.");
        }
        await _emailService.SendReservationConfirmationAsync(entity.Email, entity);
        await _emailService.SendStaffNotificationAsync("dimitrov.svetoslav@gmail.com", entity);

        return Ok(new { success = true });
    }
}
