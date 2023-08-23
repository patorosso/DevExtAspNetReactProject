using Microsoft.EntityFrameworkCore;
namespace DevExtAspNetReactProject.Models
{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Career> Careers { get; set; }
        public DbSet<Attendance> AttendanceRecords { get; set; }
        public DbSet<Subject> Subjects { get; set; }

    }

}
