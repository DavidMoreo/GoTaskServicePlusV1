using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Services.LoginService;
using JWT;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Json;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace GoTaskServiceplus.Server.SecurityController
{
    [ApiController]
    [Route("[controller]")]

    public class PagesController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IPagesService _Page;
     

        public PagesController(IConfiguration _Config, IPagesService _Page)
        {
            this._Config = _Config;
            this._Page = _Page;
           
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SavePages(tblRol item)
        {
          
            return Ok("no");

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> UpdatePages(tblRol item)
        {
            return Ok("no");

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> DeletePages([FromBody] Guid id)
        {
            return Ok("no");

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllPages( string filter ,int page = 0)
        {

            ConceptFilter concept = new ConceptFilter();
            var response = await _Page.GetAll();
            return Ok(response);

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetPagesById(Guid id)
        {

            return Ok("no");

        }


    }
}
