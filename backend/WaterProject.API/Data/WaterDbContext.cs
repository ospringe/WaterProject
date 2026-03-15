using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data;

public class WaterDbContext : DbContext
{
    public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options)
    {
        
    }
    
    // Setting up the table name so it knows where to go look in the database
    public DbSet<Project> Projects { get; set; }
}