using DevExtAspNetReactProject.Models;
using Microsoft.AspNetCore.Mvc;

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
        /*[HttpGet]
        public async Task<IActionResult> GetCareerTreeWithSubjects()
        {
            var things = _context.Careers.OrderBy(c => c.Title)
                .Select(c => new CareerViewModel
                {
                    Id = c.Id,
                    Text = c.Title,
                    Subjects = c..Select(st => new SubjectViewModel { Id = st.Id, ...}).ToList()
                }).ToList();

            return Ok(things);
        }*/


    }

    public class CareerViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<SubjectViewModel> Subjects { get; set; }
    }

    public class SubjectViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }

}
