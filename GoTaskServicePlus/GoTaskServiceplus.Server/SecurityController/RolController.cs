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
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Json;
using Utility.General;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace GoTaskServiceplus.Server.SecurityController
{
    [ApiController]
    [Route("[controller]")]

    public class RolController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IRolUser _IRolUser;
        private readonly IAutorizacionService _Autenticate;
        private IJWTAutentication _jwt;
        private IClaims _IClaims;


        public RolController(IConfiguration _Config, IRolUser _IRolUser, IAutorizacionService _Autenticate, IJWTAutentication _jwt, IClaims _IClaims)
        {
            this._Config = _Config;
            this._IRolUser = _IRolUser;
            this._Autenticate = _Autenticate;
            this._jwt = _jwt;
            this._IClaims = _IClaims;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveRol(tblRol item)
        {
            var authorization = Autorization();
            try
            {
                if (authorization.Bearer != null)
                {
                    item.IdCompany = authorization.IdCompany;
                    item.IdProject = authorization.IdProject;
                    var response = await _IRolUser.Save(item);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
                throw;
            }

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateRol(tblRol item)
        {
            var authorization = Autorization();

            try
            {
                if (authorization.Bearer != null)
                {
                    var response = await _IRolUser.Update(item);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");

            }

        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteRol(Guid id)
        {
            var authorization = Autorization();

            try
            {
                if (authorization.Bearer != null)
                {
                    ConceptFilter concept = new ConceptFilter();
                    var response = await _IRolUser.Delete(concept, id);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");

            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllRol(string filter, int page = 0)
        {
            var authorization = Autorization();

            try
            {
                if (authorization.Bearer != null)
                {
                    ConceptFilter concept = new ConceptFilter();
                    concept.IdProject = authorization.IdProject;
                    concept.IdCompany = authorization.IdCompany;
                    var response = await _IRolUser.GetAllByProject(concept, page);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");

            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetRolById(Guid id)
        {
            var authorization = Autorization();

            try
            {

                if (authorization.Bearer != null)
                {
                    ConceptFilter concept = new ConceptFilter();
                    concept.IdProject = authorization.IdProject;
                    concept.IdCompany = authorization.IdCompany;
                    var response = await _IRolUser.Get(concept, id);
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception)
            {

                return StatusCode(500, "Internal server error");
               
            }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetlRolActive()
        {
            var authorization = Autorization();

            try
            {
                if (authorization.Bearer != null)
                {
                    ConceptFilter concept = new ConceptFilter();

                    var response = new Response<tblRol>();
                    response.Status = true;
                    //response.Data = authorization.Rol;
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");

            }
        }


        private AutorizationUser Autorization()
        {
            var autorizationUser = new AutorizationUser();
            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);
            autorizationUser.IpCutomer = Request.Headers["X-Client-IP"].FirstOrDefault();


            if (autorization.claim != null && autorization.bearer != null)
            {
                var response = _IClaims.GetAutorizationUser(autorization.claim);
                autorizationUser = response;              
                autorizationUser.Bearer = autorization.bearer;
            }

            return autorizationUser;
        }


    }





}
