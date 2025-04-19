using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class EmailService
{
    private readonly string _fromEmail = "dimitrov.svetoslav@gmail.com";
    private readonly string _appPassword = "jbxc qtay lgmj elow";

    public async Task SendReservationConfirmationAsync(string toMail, Reservation reservation)
    {
        var subject = "New Reservation Received";
        var body = $"You have a new reservation from {reservation.Name} on {reservation.Date.ToShortDateString()} at {reservation.Time}.";

        using var client = new SmtpClient("smtp.gmail.com", 587)
        {
            Credentials = new NetworkCredential(_fromEmail, _appPassword),
            EnableSsl = true
        };

        var mail = new MailMessage(_fromEmail, toMail, subject, body);

        await client.SendMailAsync(mail);
    }
}