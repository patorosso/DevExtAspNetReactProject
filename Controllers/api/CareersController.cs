using DevExtAspNetReactProject.Models;
using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevExtAspNetReactProject.Controllers.api
{
    [Route("api/[controller]/[action]")]
    public class CareersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CareersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get(DataSourceLoadOptions loadOptions)
        {
            return Json(await DataSourceLoader.LoadAsync(_context.Careers, loadOptions));
        }

        [HttpGet]
        public async Task<IActionResult> CareerAreas()
        {
            var result = await _context.Careers
                .Where(c => c.ParentCareerId == null)
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> CareersCurrentStudents(int id)
        {
            var query =
                from c in _context.Careers
                join s in _context.Students on c.Id equals s.CareerId
                where s.IsActive // no hace falta = 1
                where c.ParentCareerId == id
                group c by c.Title into g
                select new
                {
                    Title = g.Key,
                    Quantity = g.Count()
                };

            var result = await query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> CareersHistoricStudents(int id)
        {
            var query =
                from c in _context.Careers
                join s in _context.Students on c.Id equals s.CareerId
                where c.ParentCareerId == id
                group c by c.Title into g
                select new
                {
                    Title = g.Key,
                    Quantity = g.Count()
                };

            var result = await query.ToListAsync();

            return Ok(result);
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(int key)
        {
            Career? model = await _context.Careers.FirstOrDefaultAsync(item => item.Id == key);

            if (model == null)
                return NotFound();


            _context.Careers.Remove(model);
            await _context.SaveChangesAsync();
            return NoContent();
        }




    }
}