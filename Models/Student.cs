namespace DevExtAspNetReactProject.Models
{
    public class Student
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime DateOfBirth { get; set; }

        public DateTime EnrollmentDate { get; set; }

        public bool IsActive { get; set; }

        public bool HasGraduated { get; set; }

        public Career Career { get; set; } = null!;

        public int CareerId { get; set; }


    }
}
