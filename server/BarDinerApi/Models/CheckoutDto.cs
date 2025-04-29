public class CheckoutDto
{
    public UserInfoDto User { get; set; } = new UserInfoDto();
    public List<OrderDto> Orders { get; set; } = new List<OrderDto>();
    public double GrandTotal { get; set; }
}