using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReservationsController(AppDbContext context)
    {
        _context = context;
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

        return Ok(new { success = true });
    }
}
