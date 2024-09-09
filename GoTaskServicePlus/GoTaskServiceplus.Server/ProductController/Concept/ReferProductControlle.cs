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
using System.ComponentModel.Design;
using System.Net;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServicePlus.GoTaskServiceplus.Server.ProductController.ReferProductControlle
{
    [ApiController]
    [Route("[controller]")]

    public class ReferProductControlle : ControllerBase
    {
        private HttpClient http { get; set; }
        public Response<tblReferProduct> response { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private readonly ITblReferProduct _CrudService;
        private IClaims _IClaims;


        public ReferProductControlle(IConfiguration _Config, IJWTAutentication jwt, IClaims _IClaim, ITblReferProduct _CrudService)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._IClaims = _IClaim;
            this._CrudService = _CrudService;
        }



        [HttpPost("[action]")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SaveAndUpdateReferProduct([FromBody] tblReferProduct refer)
        {

            var autorization = Autorization();
            ConceptFilter config = new ConceptFilter();

            var identy = HttpContext.User.Identity as ClaimsIdentity;

            try
            {
                if (autorization.Bearer != null)
                {

                    if (refer.Id == Guid.Empty)
                    {

                        //var exist = await _CrudService.GetByName(config,concept.Name);
                        //if (exist.Data == null || exist.Data.Id == Config.GuidEmpty)
                        //{
                        refer.IdProject = autorization.IdProject;
                        refer.IdCompany = autorization.IdCompany;


                        response = await _CrudService.Save(refer);

                        //}
                    }
                    else
                    {
                        var exist = await _CrudService.Get(config, refer.Id);

                        if (exist.Data != null && exist.Data != new tblReferProduct())
                        {
                            refer.IdProject = autorization.IdProject;
                            refer.IdCompany = autorization.IdCompany;

                            foreach (var item in refer.Prices)
                            {
                                if (item.Id == Config.GuidEmpty)
                                {
                                    item.Id = Config.NewGuid;
                                }
                            }
                            response = await _CrudService.Update(refer);
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
        public async Task<IActionResult> DeleteRefeProduct(string id)
        {

            response = new Response<tblReferProduct>();
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
        public async Task<IActionResult> GetAllReferProduct(string filter, int page)
        {
            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            response = new Response<tblReferProduct>();

            var autorization = Autorization();

            ConceptFilter concet = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                concet.IdProject = autorization.IdProject;
                var response = await _CrudService.GetByName(concet, filter, page);
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
        public async Task<IActionResult> GetAllConceptReferProductByCompany()
        {
            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            response = new Response<tblReferProduct>();

            var autorization = Autorization();

            ConceptFilter concet = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                concet.IdProject = autorization.IdProject;
                concet.IdCompany = autorization.IdCompany;
                var response = await _CrudService.GetAllConceptByCompany(concet);
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
        public async Task<IActionResult> GetReferProductById(string id)
        {

            response = new Response<tblReferProduct>();

            var autorization = Autorization();
            ConceptFilter config = new ConceptFilter();


            if (autorization.Bearer != null)
            {

                config.IdProject = autorization.IdProject;
                config.IdCompany = autorization.IdCompany;
                var response = await _CrudService.Get(config, Config.GuidParse(id));
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
