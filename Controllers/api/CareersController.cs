﻿using DevExtAspNetReactProject.Models;
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