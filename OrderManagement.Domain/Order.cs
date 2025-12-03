namespace OrderManagement.Domain
{
    public class Order
    {
        public Guid Id { get; set; }
        public string Customer { get; set; } = string.Empty;
        public string Product { get; set; } = string.Empty;
        public int Price { get; set; }
        public string Status { get; set; } = "Pendente";
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
