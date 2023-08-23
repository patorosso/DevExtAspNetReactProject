namespace DevExtAspNetReactProject.Models
{
    public class Subject
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public Career Career { get; set; }

        public int CareerId { get; set; }

    }
}
