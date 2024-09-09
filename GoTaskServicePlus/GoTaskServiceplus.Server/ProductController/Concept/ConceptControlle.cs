using AngleSharp.Io;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Interfaces.Products.Concept;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.RequestLog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServicePlus.GoTaskServiceplus.Server.ProductController.Concept
{
    [ApiController]
    [Route("[controller]")]

    public class ConceptController : ControllerBase
    {
        private HttpClient http { get; set; }
        public Response<tblConcepValue> response { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private readonly IConcept _CrudService;
        private IClaims _IClaims;


        public ConceptController(IConfiguration _Config, IConcept _CrudService, IJWTAutentication jwt, IClaims _IClaims)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._CrudService = _CrudService;
            this._IClaims = _IClaims;
        }



        [HttpPost("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SaveAndUpdateConcept([FromBody] tblConcepValue concept)
        {

            var autorization = Autorization();
            ConceptFilter config = new ConceptFilter();

            var identy = HttpContext.User.Identity as ClaimsIdentity;

            try
            {
                if (autorization.Bearer != null)
                {

                    if (concept.Id == Guid.Empty)
                    {

                        //var exist = await _CrudService.GetByName(config,concept.Name);
                        //if (exist.Data == null || exist.Data.Id == Config.GuidEmpty)
                        //{
                        concept.IdProject = autorization.IdProject;
                        concept.IdCompany = autorization.IdCompany;

                        response = await _CrudService.Save(concept);
                        //}
                    }
                    else
                    {
                        var exist = await _CrudService.Get(config, concept.Id);

                        if (exist.Data != null && exist.Data != new tblConcepValue())
                        {
                            concept.IdProject = autorization.IdProject;
                            concept.IdCompany = autorization.IdCompany;
                            response = await _CrudService.Update(concept);
                        }

                    }
                }

            }
            catch (Exception ex)
            {
                //response = await RequestLogService<tblConcepValue>.Save(response);
                return NotFound(response);
                throw;
            }
            return Ok(response);
        }



        [HttpDelete("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteConcept(string id)
        {

            response = new Response<tblConcepValue>();
            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);

            ConceptFilter config = new ConceptFilter();
            try
            {
                if (autorization.bearer != null)
                {
                    var response = await _CrudService.Delete(config, Guid.Parse(id));

                    if (response != null && response.Status)
                    {

                        return Ok(response);
                    }
                    else
                    {
                        response.Msg = new List<MsgResponse>() { new MsgResponse() { Msg = "No eliminado" } };
                        return Ok(response);
                    }

                }
            }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }

            //response = await RequestLogService<tblConcepValue>.Save(response);
            return NotFound(response);


        }


        [HttpGet("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // [Authorize]
        public async Task<IActionResult> GetAllConcept(string filter, string type, int page)
        {
            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            response = new Response<tblConcepValue>();

            var autorization = Autorization();

            ConceptFilter concet = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                concet.IdProject = autorization.IdProject;
                var response = await _CrudService.GetAllConceptValue(concet, type, page, filter);
                response.KeyRefresh = autorization.Bearer;
                if (response != null && response.Status)
                {
                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }


            }
            else { return Unauthorized(); }


            try
            { }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }



            return NotFound(response);



        }


        [HttpGet("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // [Authorize]
        public async Task<IActionResult> GetAdminAllConceptByIdProject(string filter, string type, int page, Guid idProject)
        {
            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            response = new Response<tblConcepValue>();

            var autorization = Autorization();

            ConceptFilter concet = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                concet.IdProject = idProject;
                var response = await _CrudService.GetAllConceptValue(concet, type, page, filter);
                response.KeyRefresh = autorization.Bearer;
                if (response != null && response.Status)
                {
                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }


            }
            else { return Unauthorized(); }


            try
            { }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }



            return NotFound(response);



        }



        [HttpGet("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // [Authorize]
        public async Task<IActionResult> GetAdminAllConceptByIdCompany(string filter, string type, int page, Guid idCompany)
        {
            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            response = new Response<tblConcepValue>();

            var autorization = Autorization();

            ConceptFilter concet = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                concet.IdCompany = idCompany;
                var response = await _CrudService.GetAllConceptByIdCompany(concet, type, page, filter);
                response.KeyRefresh = autorization.Bearer;
                if (response != null && response.Status)
                {
                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }


            }
            else { return Unauthorized(); }


            try
            { }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }



            return NotFound(response);



        }



        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllConceptByCountry(string type, string countryId)
        {
            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            response = new Response<tblConcepValue>();

            var autorization = Autorization();

            ConceptFilter concet = new ConceptFilter();

            if (autorization.Bearer != null || true)
            {

                concet.IsAdmin = true;
                var response = await _CrudService.GetAllConceptByCountry(concet, type, countryId);
                //response.KeyRefresh = autorization.Bearer;
                if (response != null && response.Status)
                {
                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }


            }
            else { return Unauthorized(); }


            try
            { }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }



            return NotFound(response);



        }


        [HttpGet("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        // [Authorize]
        public async Task<IActionResult> GetConceptById(Guid id)
        {

            response = new Response<tblConcepValue>();

            var autorization = Autorization();
            ConceptFilter config = new ConceptFilter();


            if (autorization.Bearer != null)
            {

                config.IdProject = autorization.IdProject;
                config.IdCompany = autorization.IdCompany;
                var response = await _CrudService.Get(config, id);
                response.KeyRefresh = autorization.Bearer;
                if (response != null && response.Status)
                {
                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }


            }
            else { return Unauthorized(); }


            try
            { }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }



            return NotFound(response);



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
