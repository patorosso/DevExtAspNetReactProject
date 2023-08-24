namespace DevExtAspNetReactProject.Models
{
    public class Attendance
    {
        public int Id { get; set; }

        public DateTime AttendanceDate { get; set; }

        public Student Student { get; set; } = null!;

        public int StudentId { get; set; }

        public Subject Subject { get; set; } = null!;

        public int SubjectId { get; set; }

        public bool HasAttended { get; set; }

    }
}
