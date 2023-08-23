namespace DevExtApp.Controllers
{
    //[Route("api/[controller]/[action]")]
    //public class CareerAreasController : Controller
    //{
    //    private ApplicationDbContext _context;

    //    public CareerAreasController(ApplicationDbContext context)
    //    {
    //        _context = context;
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> Get(DataSourceLoadOptions loadOptions)
    //    {

    //        // If underlying data is a large SQL table, specify PrimaryKey and PaginateViaPrimaryKey.
    //        // This can make SQL execution plans more efficient.
    //        // For more detailed information, please refer to this discussion: https://github.com/DevExpress/DevExtreme.AspNet.Data/issues/336.
    //        // loadOptions.PrimaryKey = new[] { "Id" };
    //        // loadOptions.PaginateViaPrimaryKey = true;

    //        return Json(await DataSourceLoader.LoadAsync(_context.CareerAreas.Include(c => c.Careers), loadOptions));
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> Post(string values)
    //    {
    //        var model = new CareerArea();
    //        var valuesDict = JsonConvert.DeserializeObject<IDictionary>(values);
    //        PopulateModel(model, valuesDict);

    //        if (!TryValidateModel(model))
    //            return BadRequest(GetFullErrorMessage(ModelState));

    //        var result = _context.CareerAreas.Add(model);
    //        await _context.SaveChangesAsync();

    //        return Json(new { result.Entity.Id });
    //    }

    //    [HttpPut]
    //    public async Task<IActionResult> Put(int key, string values)
    //    {
    //        var model = await _context.CareerAreas.FirstOrDefaultAsync(item => item.Id == key);
    //        if (model == null)
    //            return StatusCode(409, "Object not found");

    //        var valuesDict = JsonConvert.DeserializeObject<IDictionary>(values);
    //        PopulateModel(model, valuesDict);

    //        if (!TryValidateModel(model))
    //            return BadRequest(GetFullErrorMessage(ModelState));

    //        await _context.SaveChangesAsync();
    //        return Ok();
    //    }

    //    [HttpDelete]
    //    public async Task Delete(int key)
    //    {
    //        var model = await _context.CareerAreas.FirstOrDefaultAsync(item => item.Id == key);

    //        _context.CareerAreas.Remove(model);
    //        await _context.SaveChangesAsync();
    //    }


    //    private void PopulateModel(CareerArea model, IDictionary values)
    //    {
    //        string ID = nameof(CareerArea.Id);
    //        string DESCRIPTION = nameof(CareerArea.Description);

    //        if (values.Contains(ID))
    //        {
    //            model.Id = Convert.ToInt32(values[ID]);
    //        }

    //        if (values.Contains(DESCRIPTION))
    //        {
    //            model.Description = Convert.ToString(values[DESCRIPTION]);
    //        }
    //    }

    //    private string GetFullErrorMessage(ModelStateDictionary modelState)
    //    {
    //        var messages = new List<string>();

    //        foreach (var entry in modelState)
    //        {
    //            foreach (var error in entry.Value.Errors)
    //                messages.Add(error.ErrorMessage);
    //        }

    //        return String.Join(" ", messages);
    //    }
    //}
}