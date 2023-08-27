using DevExtAspNetReactProject.Models;
using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevExtAspNetReactProject.Controllers.api
{
    [Route("api/[controller]/[action]")]
    public class SubjectsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SubjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubjectsAttendanceById(int id, DataSourceLoadOptions loadOptions)
        {
            var subjectsAttendance = from i in _context.AttendanceRecords
                                     where i.SubjectId == id && i.HasAttended
                                     group i by i.AttendanceDate into g
                                     orderby g.Key
                                     select new
                                     {
                                         AttendanceDate = g.Key.ToString("yyyy-MM-dd"),
                                         Year = g.Key.Year,
                                         Quantity = g.Count()
                                     };

            return Json(await DataSourceLoader.LoadAsync(subjectsAttendance, loadOptions));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubjectsAttendanceYearById(int id)
        {
            var subjectsYearAttendance = from i in _context.AttendanceRecords
                                         where i.SubjectId == id
                                         group i by i.AttendanceDate.Year
                into g
                                         select new
                                         {
                                             Year = g.Key.ToString(),
                                             Id = g.First().Id
                                         };

            return Ok(await subjectsYearAttendance.ToListAsync());
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
                    Expanded = c.Title.Contains("Informática"),
                    Items = c.Subjects!
                        .Select(s => new SubjectViewModel
                        { Id = $"{c.Id}_{s.Id}", Text = s.Description, CareerId = s.CareerId })
                        .ToList()
                }).ToListAsync();

            return Ok(careersWithSubjectsList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTotalAndExpectedAttendanceById(int id)
        {
            var result = await _context.AttendanceRecords
                .Where(a => a.SubjectId == id)
                .GroupBy(a => new { Month = a.AttendanceDate.Month })
                .Select(g => new
                {
                    Id = g.Key.Month,
                    TotalAttendance = g.Sum(a => a.HasAttended ? 1 : 0),
                    ExpectedAttendance = g.Count(),
                })
                .OrderBy(a => a.Id)
                .Join(
                    _context.MonthName,
                    attendance => attendance.Id,
                    month => month.Id,
                    (attendance, month) => new
                    {
                        MonthName = month.MonthName,
                        attendance.TotalAttendance,
                        attendance.ExpectedAttendance,
                    }
                )
                .ToListAsync();

            return Ok(result);
        }

    }


    public class CareerViewModel
    {
        public string Id { get; set; } = null!;
        public string Text { get; set; } = null!;
        public List<SubjectViewModel>? Items { get; set; }
        public bool Expanded { get; set; }
    }

    public class SubjectViewModel
    {
        public string Id { get; set; } = null!;
        public string Text { get; set; } = null!;
        public int CareerId { get; set; }
    }

}
