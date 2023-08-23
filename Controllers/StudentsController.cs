using DevExtApp.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DevExtApp.Controllers
{

    [Route("api/[controller]/[action]")]
    public class StudentsController : ControllerBase //no view support 
    {

        private readonly ApplicationDbContext _context;
        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public object GetStudents(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(_context.Students.Include(c => c.Career), loadOptions);
        }

        [HttpPost]
        public object InsertStudents(string values)
        {
            var newStudent = new Student();
            JsonConvert.PopulateObject(values, newStudent);

            if (!TryValidateModel(newStudent))
                return BadRequest(ModelState.ValidationState);

            _context.Students.Add(newStudent);
            _context.SaveChanges();

            return Ok(newStudent);
        }

        [HttpPut]
        public IActionResult UpdateStudents(int key, string values)
        {
            var student = _context.Students.First(o => o.Id == key);
            JsonConvert.PopulateObject(values, student);

            if (!TryValidateModel(student))
                return BadRequest(ModelState.ValidationState);

            _context.SaveChanges();

            return Ok(student);
        }

        [HttpDelete]

        public void DeleteStudents(int key)
        {
            var student = _context.Students.First(c => c.Id == key);
            _context.Students.Remove(student);
            _context.SaveChanges();
        }

        [HttpGet]
        public object CareerLookup(DataSourceLoadOptions loadOptions)
        {
            var lookup = from i in _context.Careers
                         orderby i.Title
                         select new
                         {
                             Value = i.Id,
                             Text = i.Title
                         };

            return DataSourceLoader.Load(lookup, loadOptions);
        }
    }
}