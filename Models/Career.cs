namespace DevExtApp.Models
{
    public class Career
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? ParentCareerId { get; set; }
        public Career ParentCareer { get; set; }

    }
}
