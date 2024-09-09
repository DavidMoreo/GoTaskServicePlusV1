using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class CompanyController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly ICompany _Company;
        private IClaims _IClaims;
        private IJWTAutentication _jwt;


        public CompanyController(IConfiguration _Config, ICompany _Company, IClaims _IClaims, IJWTAutentication _jwt)
        {
            this._Config = _Config;
            this._Company = _Company;
            this._IClaims = _IClaims;
            this._jwt = _jwt;
           
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveCompany([FromBody] tblCompany company)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;

          



            try
            {

                var result = await _Company.Save(company);

                if (result.Status)
                {

                    return Ok(result);
                }
                else
                {
                    return Ok(result);
                }

                
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());

            }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            ConceptFilter config = new ConceptFilter();

            try
            {
                var result = await _Company.Delete(config, id);

                if (result.Status)
                {

                    return Ok(result);
                }
                else
                {
                    return Ok(result);
                }

                return NotFound("No disponible api");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }


        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateCompany([FromBody] tblCompany company)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
         

            try
            {
                var result = await _Company.Update(company);

                if (result.Status)
                {

                    return Ok(result);
                }
                else
                {
                    return NotFound(result);
                }

                return NotFound("No disponible");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCompanyById(Guid id, int page =0)
        {

            var autorization = Autorization();
            ConceptFilter config = new ConceptFilter();

            try
            {

                if (autorization.Bearer !=null)
                {
                    config.IdCompany = autorization.IdCompany;
                    var result = await _Company.Get(config, id);

                    if (result.Status)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound(result);
                    }
                }
                else
                {
                    return Unauthorized();
                }
      
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllCompany(string filter, int page =0)
        {
            var autorization = Autorization();
           
            ConceptFilter config = new ConceptFilter();
            try
            {
                config.IdCompany =  autorization.IdCompany;
                var result = await _Company.GetAll(config,filter, page);
                if (result.Status)
                {

                    return Ok(result);
                }
                else
                {
                    return NotFound(result);
                }

              
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllCompanyAdmin(string filter, int page = 0)
        {
            var autorization = Autorization();

            ConceptFilter config = new ConceptFilter();
            try
            {
                config.IdCompany = autorization.IdCompany;
                var result = await _Company.GetAllAdmin(config, filter, page);
                if (result.Status)
                {

                    return Ok(result);
                }
                else
                {
                    return NotFound(result);
                }


            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }


        }


        private AutorizationUser Autorization()
        {
            var autorizationUser = new AutorizationUser();
            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);

            if (autorization.claim != null && autorization.bearer != null)
            {
                var response = _IClaims.GetAutorizationUser(autorization.claim);
                autorizationUser = response;

                var ipAddress = HttpContext.Connection.RemoteIpAddress;
                autorizationUser.IpCutomer = ipAddress?.ToString();

                autorizationUser.Bearer = autorization.bearer;

            }

            return autorizationUser;
        }


    }
}
