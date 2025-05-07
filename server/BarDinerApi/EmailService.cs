using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class EmailService
{
    private readonly string _fromEmail = "dimitrov.svetoslav@gmail.com";
    private readonly string _appPassword = "jbxc qtay lgmj elow";

    public async Task SendOrderConfirmationAsync(string toMail, Checkout checkout)
    {
        var subject = "Your BARRA Order Confirmation";
        var body = $@"
Order Confirmation

Thank you for placing your order with BARRA! Below are the details of your order:

Customer Name: {checkout.User?.Name}
Email: {checkout.User?.Email}
Phone: {checkout.User?.Phone}

Order Total: {checkout.GrandTotal:C}
Shipping Address: ";

        var apartmentBuildingNumber = checkout.User?.ApartmentBuildingNumber?.ToString();
        var floor = checkout.User?.Floor?.ToString();
        var apartmentNumber = checkout.User?.ApartmentNumber?.ToString();

        if (!string.IsNullOrEmpty(apartmentBuildingNumber) ||
            !string.IsNullOrEmpty(floor) ||
            !string.IsNullOrEmpty(apartmentNumber))
        {
            body += $"{checkout.User?.City}, ул. {checkout.User?.Street} № {checkout.User?.StreetNumber}, " +
                    $"блок {apartmentBuildingNumber ?? " "}, ет. {floor ?? " "}, ап. {apartmentNumber ?? " "}";
        }
        else
        {
            body += $"{checkout.User?.City}, ул. {checkout.User?.Street} № {checkout.User?.StreetNumber}";
        }

        body += $@"

Order Details:
";
        if (checkout.Orders != null)
        {
            foreach (var order in checkout.Orders)
            {
                body += $"- {order.DishName} (x{order.DishQuantity}) - {order.Price:C} each, Total: {order.Total:C}\n";
            }
        }

        body += $@"

Our team will process your order and notify you when it's ready.

Thank you for choosing BARRA!

Best regards,
The BARRA Team
";

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

    public async Task SendStaffNotificationAsync(string staffEmail, Checkout checkout)
    {
        var subject = "New Order Received";
        var body = $@"
New Order Notification

A new order has been placed. Below are the details:

Customer Name: {checkout.User?.Name}
Email: {checkout.User?.Email}
Phone: {checkout.User?.Phone}
Address: {checkout.User?.City}, {checkout.User?.Street} {checkout.User?.StreetNumber},
         {checkout.User?.ApartmentBuildingNumber ?? ' '} {checkout.User?.Floor ?? ' '} 
         {checkout.User?.ApartmentNumber ?? ' '}

Order Details:
";
        if (checkout.Orders != null)
        {
            foreach (var order in checkout.Orders)
            {
                body += $"- {order.DishName} (x{order.DishQuantity})\n";
            }
        }

        body += $@"

Please contact the customer for any specific details.

– BARRA System
";

        await SendEmailAsync(staffEmail, subject, body);
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
