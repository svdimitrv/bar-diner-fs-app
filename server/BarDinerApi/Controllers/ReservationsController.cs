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

    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        var todayLocal = DateTime.Today;
        var tomorrowLocal = todayLocal.AddDays(1);

        var todayUtc = DateTime.SpecifyKind(todayLocal, DateTimeKind.Local).ToUniversalTime();
        var tomorrowUtc = DateTime.SpecifyKind(tomorrowLocal, DateTimeKind.Local).ToUniversalTime();

        var items = await _context.Reservations
            .Where(r => r.Date >= todayUtc && r.Date < tomorrowUtc)
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] ReservationDto reservation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var sofiaZone = TimeZoneInfo.FindSystemTimeZoneById("FLE Standard Time");
        var localDate = TimeZoneInfo.ConvertTimeToUtc(reservation.Date.Date, sofiaZone);

        var entity = new Reservation
        {
            Date = localDate,
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
