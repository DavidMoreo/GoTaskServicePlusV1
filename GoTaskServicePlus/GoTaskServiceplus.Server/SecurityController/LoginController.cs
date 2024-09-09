using AngleSharp.Io;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Services.KeyValidation;
using GoTaskServicePlus.Services.LoginService;
using JWT;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
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

    public class LoginController : ControllerBase
    {
        private HttpClient http { get; set; }
        tblRequest request { get; set; }    
        static IConfiguration IConfig;
        private IClaims _Claim;
        private ILogin _Login;
        private IJWTAutentication _jwt;
        private readonly IRolUser _IRolUser;
        private readonly IKeyValidation _IKeyValidation;
        private readonly IProject _IProject;
        public LoginController(IKeyValidation _IKeyValidation,IConfiguration _Config, IClaims _Claim, ILogin _Login, IJWTAutentication jwt, IRolUser _IRolUser, IProject _IProject)
        {
            IConfig = _Config;
            this._Claim = _Claim;
            this._Login = _Login;
            this._jwt = jwt;
            this._IRolUser = _IRolUser;
            this._IKeyValidation = _IKeyValidation;
            this._IProject = _IProject;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Loging([FromBody] login item)
        {
            var response = new Response<tblRequest>();
            response.Status = false;
            tblRequest request = new tblRequest();
           
            if (item.Password == "" || item.Email == "")
            {
                request.Msg = "Clave y Usuario requeridos";
                return NotFound(request);
            }

            var result = await _Login.Get(item.Email, item.Password);
            var project = await _IProject.Get(new ConceptFilter{ IdProject = result.Data.IdProject }, result.Data.IdProject);

            var config = new ConceptFilter();
           
            if (result.Data != null)
            {
                int count = result.Data.RolUser.Where(s=>s.IsAdmin == true).Count();
                config.IsAdmin = count > 0;

                count = 0;
                count = result.Data.RolUser.Where(s => s.IsCustomer == true).Count();
                config.IsCustomer = count > 0;

                count = 0;
                count = result.Data.RolUser.Where(s => s.IsVendor == true).Count();
                config.IsVendor = count > 0;

                count = 0;
                count = result.Data.RolUser.Where(s => s.IsMaker == true).Count();
                config.IsMaker = count > 0;

                var rols = await _IRolUser.GetRolByRol(config);
                result.Data.RolUser = rols.Data;

                if (result.Data != null)
                {
                    JWTAutentication jwt = new JWTAutentication(IConfig);
                    var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
                    var dateExpiresRefesh = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute + 5);

                    var claimTemp = _Claim.GetClaimsUser(result.Data, dateExpires, false);
                    var claimRefresh = _Claim.GetClaimsUser(result.Data, dateExpiresRefesh, true);
                    var JsonResult = jwt.GetJws(claimTemp.list, dateExpires);
                    var JsonResultRefres = jwt.GetJws(claimRefresh.list, dateExpiresRefesh);
                    request.KeyLogin = "Bearer " + JsonResult.ToString();
                    request.KeyRefresh = JsonResultRefres;
                    request.Code = 200;
                    
                    request.Date = Config.ExpiresTokenMinute.ToString();
                    response.Data = request;
                    response.rols = rols.Data;
                    response.Data.NameUser = result.Data.Name != null && result.Data.Name != null ? result.Data.Name : "";
                    response.Data.NameProject = project.Data != null ? project.Data.Name: "";


                    return Ok(response);
                }

            }
            else
            {
                request.Msg = "Usuario o clave no válida";
            }

            return Ok(request);
        }



        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePassword( ChangePassword item)
        {
            var response = new Response<tblRequest>();
            response.Status = false;
            tblRequest request = new tblRequest();

            if (item.Password == "" || item.Email == "")
            {
                request.Msg = "Clave y Usuario requeridos";
                return NotFound(request);
            }

            var result = await _Login.ChangePassword(item.Email, _IKeyValidation.Encrypt(item.Password, item.Password), item.Code);

            var config = new ConceptFilter();

            response.Status = result.Data;

            if (response.Status)
            {
                request.Msg = "La clave cambió de manera exitosa.";
            }
            else
            {
                request.Msg = "La clave no pudo ser cambiada.";
            }

            return Ok(request);
        }



        [HttpGet("[action]")]
        public async Task<IActionResult> ChangeKeyPassword(string number)
        {
            var response = new Response<tblRequest>();
            response.Status = false;
            tblRequest request = new tblRequest();          

            var result = await _Login.ChangedKeyPassword(number);

            var config = new ConceptFilter();

            response.Status = result.Status;

            if (response.Status)
            {
                request.Msg = "Código enviado";
            }
            else
            {
                request.Msg = "Código no enviado";
            }

            return Ok(request);
        }



        [HttpGet("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize]
        public IActionResult RefreshToken()
        {
            request =new tblRequest();
            var response = new Response<tblRequest>();
            // var identity = HttpContext.User.Identity as ClaimsIdentity;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var token = HttpContext.Request.Headers.Authorization;
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);

            if (autorization.bearer != null)
            {
                request.KeyLogin = autorization.bearer;
                request.Msg = "Actualizado";
                response.Data = request;    
                return Ok(response);

            }

            request = new tblRequest()
            {
                Code = 401,
                KeyLogin = "",
                Msg = "Token no valido"
            };

            return NotFound(response);

        }







    }
}
