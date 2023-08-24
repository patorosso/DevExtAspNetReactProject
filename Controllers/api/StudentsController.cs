using DevExtAspNetReactProject.Models;
using DevExtreme.AspNet.Data;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevExtAspNetReactProject.Controllers.api
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
        public async Task<IActionResult> InsertStudent([FromBody] Student newStudent)
        {

            await _context.Students.AddAsync(newStudent);
            await _context.SaveChangesAsync();

            return Ok(newStudent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student newStudent)
        {
            Student? studentInDb = await _context.Students.FirstOrDefaultAsync(c => c.Id == id);

            if (studentInDb == null)
                return NotFound();

            studentInDb.CareerId = newStudent.CareerId;
            studentInDb.DateOfBirth = newStudent.DateOfBirth;
            studentInDb.EnrollmentDate = newStudent.EnrollmentDate;
            studentInDb.Name = newStudent.Name;
            studentInDb.HasGraduated = newStudent.HasGraduated;
            studentInDb.IsActive = newStudent.IsActive;

            await _context.SaveChangesAsync();

            return Ok(newStudent);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] JsonPatchDocument<Student> patchDoc)
        {
            Console.WriteLine("Received request body: " + Request.Body);
            var studentInDb = await _context.Students.FirstOrDefaultAsync(c => c.Id == id);

            if (studentInDb == null)
                return NotFound();

            patchDoc.ApplyTo(studentInDb, ModelState); //dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.SaveChangesAsync();

            return Ok(studentInDb);
        }

        [HttpDelete("{id}")]
        public void DeleteStudent(int id)
        {
            var student = _context.Students.First(c => c.Id == id);
            _context.Students.Remove(student);
            _context.SaveChanges();
        }

        [HttpGet]
        public object CareerLookup(DataSourceLoadOptions loadOptions)
        {
            var lookup = from i in _context.Careers
                         where i.ParentCareerId != null //no llamo a los padres
                         orderby i.Title
                         select new
                         {
                             i.Id,
                             i.Title
                         };

            return DataSourceLoader.Load(lookup, loadOptions);
        }
    }
}