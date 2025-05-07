public class UserInfoDto
{
    public string Name { get; set; } = "";
    public string City { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Street { get; set; } = "";
    public int StreetNumber { get; set; }
    public bool isHouse { get; set; }
    public int? ApartmentBuildingNumber { get; set; }
    public int? Floor { get; set; }
    public int? ApartmentNumber { get; set; }
}