using System.ComponentModel.DataAnnotations;

public class ReservationDto
{
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
