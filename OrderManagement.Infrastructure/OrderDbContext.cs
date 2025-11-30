using Microsoft.EntityFrameworkCore;
using OrderManagement.Domain;

namespace OrderManagement.Infrastructure;

public class OrderDbContext : DbContext
{
    public OrderDbContext(DbContextOptions<OrderDbContext> options)
        : base(options) { }

    public DbSet<Order> Orders => Set<Order>();
}
