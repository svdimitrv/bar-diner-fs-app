using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class EmailService
{
    private readonly string _fromEmail = "dimitrov.svetoslav@gmail.com";
    private readonly string _appPassword = "jbxc qtay lgmj elow";

    public async Task SendOrderConfirmationAsync(string toMail, List<Order> orders)
    {
        var subject = "Your BARRA order";
        var body = $"";


        await SendEmailAsync(toMail, subject, body);
    }
    public async Task SendReservationConfirmationAsync(string toMail, Reservation reservation)
    {
        var subject = "Your BARRA Reservation Request";
        var body = $"Dear {reservation.Name},\n\n" +
                   $"You have requested a new reservation for your BARRA experience on {reservation.Date.ToShortDateString()} at {reservation.Time}.\n" +
                   $"Our team will contact you on {reservation.Phone} shortly to confirm the reservation.\n\n" +
                   $"Thank you for choosing BARRA!\n\n" +
                   $"Best regards,\nThe BARRA Team";

        await SendEmailAsync(toMail, subject, body);
    }

    public async Task SendStaffNotificationAsync(string staffEmail, Reservation reservation)
    {
        var subject = "New Reservation Received";
        var body = $@"
A new reservation has been made:

Name: {reservation.Name}
Email: {reservation.Email}
Phone: {reservation.Phone}
Date: {reservation.Date:yyyy-MM-dd}
Time: {reservation.Time}
Party Size: {reservation.PartySize}

Please contact the guest to confirm the reservation.

– BARRA System
";

        await SendEmailAsync(staffEmail, subject, body);
    }

    private async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        using var client = new SmtpClient("smtp.gmail.com", 587)
        {
            Credentials = new NetworkCredential(_fromEmail, _appPassword),
            EnableSsl = true
        };

        var message = new MailMessage(_fromEmail, toEmail, subject, body)
        {
            IsBodyHtml = false
        };

        await client.SendMailAsync(message);
    }
}
