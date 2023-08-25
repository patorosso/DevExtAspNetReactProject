using DevExtAspNetReactProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevExtAspNetReactProject.Controllers.api
{
    [Route("api/[controller]/[action]")]
    public class SubjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubjectsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("{parentCareerId}")]
        public async Task<IActionResult> GetCareerTreeWithSubjects(int parentCareerId)
        {
            var careersWithSubjectsList = await _context.Careers.OrderBy(c => c.Title)
                    .Where(c => c.ParentCareerId == parentCareerId)
                .Select(c => new CareerViewModel
                {
                    Id = c.Id.ToString(),
                    Text = c.Title,
                    Items = c.Subjects!
                        .Select(s => new SubjectViewModel
                        { Id = $"{c.Id}_{s.Id}", Text = s.Description, CareerId = s.CareerId })
                        .ToList()
                }).ToListAsync();

            return Ok(careersWithSubjectsList);
        }


    }

    public class CareerViewModel
    {
        public string Id { get; set; } = null!;
        public string Text { get; set; } = null!;
        public List<SubjectViewModel>? Items { get; set; }
    }

    public class SubjectViewModel
    {
        public string Id { get; set; } = null!;
        public string Text { get; set; } = null!;
        public int CareerId { get; set; }
    }

}
