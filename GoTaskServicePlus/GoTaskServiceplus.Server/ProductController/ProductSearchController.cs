using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
using System.Security.Claims;
using System.Text.Json;

namespace GoTaskServiceplus.Server.ProductController
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductSearchController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly ISqlModelSearch<tblProduct> ISqlSearchProduct;

        public ProductSearchController(IConfiguration _Config, ISqlModelSearch<tblProduct> _Sql)
        {
            this._Config = _Config;
            this.ISqlSearchProduct = _Sql;
        }

      

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSearchProduct([FromBody] string filter)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
           

            try
            {
                //var result = await model.GetFilter(filter);

                //if (result.Status)
                //{

                //    return Ok(result);
                //}
                //else
                //{
                //    return NotFound(result);
                //}
                return NotFound("No disponible");
            }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }


        }

    }
}
