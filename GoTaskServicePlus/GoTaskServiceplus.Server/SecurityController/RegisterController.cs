using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.BuyCustomer;
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
using Utility.General;

namespace GoTaskServiceplus.Server.SecurityController
{
    [ApiController]
    [Route("[controller]")]

    public class RegisterController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IRegister _Register;
        private readonly IUtilNotificationRegister _IUtilNotificationRegister;
  

        public RegisterController(IConfiguration _Config, IRegister _Register, IUtilNotificationRegister IUtilNotificationRegister)
        {
            this._Config = _Config;
            this._Register = _Register;
            this._IUtilNotificationRegister = IUtilNotificationRegister;
          
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveRegister([FromBody] tblUser item)
        {
            var result = new Response<tblUser>();

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            result = await _Register.SaveRegister(item);
            if (result.Status)
            {
                result.Msg = new List<MsgResponse> { new MsgResponse() {Msg = "Tu registro se completó de manera exitosa, ya puedes ingresar a tu cuenta." } };   
                _IUtilNotificationRegister.SendNotificationRegister(item.Email);
            }
            else
            {
                result.Data = null;
            }

            result.Data.Password = "";
            result.Data.KeyPassword = "";

            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateRegister( string Id, int statusRegister )
        {
            var identy = HttpContext.User.Identity as ClaimsIdentity;
            return NotFound("No disponible");
        }


      

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteRegister([FromBody] string id)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            return NotFound("No disponible");


        }


        [HttpPost("[action]")]
        public async Task<IActionResult> GetRegisterAll(Guid idProject, int page = 0)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            return NotFound("No disponible");
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> GetRegisterStatus(Guid id, int page = 0)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            return NotFound("No disponible");

        }


         [HttpGet("[action]")]
        public async Task<IActionResult> GetIdUSer()
        {

            var response = new Response<string>();
            response.Data = Config.NewGuid.ToString();
            return Ok(response);

        }


    }
}
