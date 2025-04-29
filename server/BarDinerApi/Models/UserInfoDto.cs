using System.ComponentModel.DataAnnotations;

public class UserInfoDto
{
    [Required]
    public string Name { get; set; } = "";
    [Required]
    [ValidCity(new[] { "Pernik", "Перник" })]
    public string City { get; set; } = "";
    [Required]
    public string Email { get; set; } = "";
    [Required]
    public string Phone { get; set; } = "";
    [Required]
    public string Street { get; set; } = "";
    [Required]
    public int StreetNumber { get; set; }
    [Required]
    public bool isHouse { get; set; }
    [Required]
    public int ApartmentBuildingNumber { get; set; }
    [Required]
    public int Floor { get; set; }
    [Required]
    public int ApartmentNumber { get; set; }
}

public class ValidCityAttribute : ValidationAttribute
{
    private readonly HashSet<string> _allowedCities;

    public ValidCityAttribute(string[] allowedCities)
    {
        _allowedCities = new HashSet<string>(allowedCities);
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string city && _allowedCities.Contains(city))
        {
            return ValidationResult.Success;
        }

        return new ValidationResult($"City must be one of the following: {string.Join(", ", _allowedCities)}");
    }
}
