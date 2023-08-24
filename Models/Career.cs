namespace DevExtAspNetReactProject.Models
{
    public class Career
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int? ParentCareerId { get; set; }
        public Career? ParentCareer { get; set; }

    }
}
