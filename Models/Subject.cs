namespace DevExtAspNetReactProject.Models
{
    public class Subject
    {
        public int Id { get; set; }

        public string Description { get; set; } = null!;

        public Career Career { get; set; } = null!;

        public int CareerId { get; set; }

    }
}
