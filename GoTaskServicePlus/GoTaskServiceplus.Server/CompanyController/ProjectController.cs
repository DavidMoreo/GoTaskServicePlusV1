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

namespace GoTaskServiceplus.Client.Controllers.Product
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IProject _Project;
        private IJWTAutentication _jwt;
        private IClaims _IClaims;

        public ProjectController(IConfiguration _Config, IProject _Project, IJWTAutentication _jwt, IClaims _IClaims)
        {
            this._Config = _Config;
            this._Project = _Project;
            this._jwt = _jwt;
            this._IClaims = _IClaims;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveProject([FromBody] tblProject project)
        {
            var autorization = Autorization();
            try
            {
                if (autorization != null ||  autorization.Bearer != null)
                {
                    var result = await _Project.Save(project);

                    if (result.Status)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return Ok(result);
                    }
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return NotFound((ex.Message.ToString(), false, ""));
            }

        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteProjectById(Guid id)
        {

            ConceptFilter config = new ConceptFilter();

            var autorization = Autorization();
            try
            {
                if (autorization != null ||  autorization.Bearer != null)
                {
                    var result = await _Project.Delete(config, id);

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

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProject([FromBody] tblProject project)
        {
            var autorization = Autorization();
            try
            {
                if (autorization != null ||  autorization.Bearer != null)
                {
                    var result = await _Project.Update(project);

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
        public async Task<IActionResult> GetMobilNumberByProject(Guid id)
        {

        
            try
            {
                var config = new ConceptFilter();
                var result = await _Project.Get(config, id);

                if (result.Status)
                {
                    var project = new tblProject();
                    project.MobileNumber = result.Data.MobileNumber;
                    result.Data = project;
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

        [HttpGet("[action]")]
        public async Task<IActionResult>  GetProjectById(Guid idProject)
        {


           
            var autorization = Autorization();
            try
            {
               
                if (autorization != null || autorization.Bearer != null)
                {
                    var config = new ConceptFilter();

                    if (idProject != Config.GuidEmpty)
                        config.IdProject = idProject;
                    else
                        config.IdProject = autorization.IdProject;

                    var result = await _Project.Get(config, config.IdProject);

                    if (result.Status)
                    {

                        return Ok(result);
                    }
                    else
                    {
                        return Ok(result);
                    }
                }
                else
                {
                  return  Unauthorized();
                }
               
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllProject(string filter, int page = 0)
        {
            ConceptFilter config = new ConceptFilter();

            var autorization = Autorization();
            try
            {
                if (autorization != null ||  autorization.Bearer != null)
                {
                   
                    config.IdCompany = autorization.IdCompany;
                    config.IdProject = autorization.IdProject;
                    

                    var result = await _Project.GetAll(config, filter, page);

                    if (result.Status)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return Ok(result);
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
        public async Task<IActionResult> GetAllProjectAdmin(string filter, Guid idCompany, int page = 0)
        {
            ConceptFilter config = new ConceptFilter();

            var autorization = Autorization();
            try
            {
                if (autorization != null || autorization.Bearer != null)
                {

                    config.IdCompany = idCompany;

                    var result = await _Project.GetAllAdmin(config, filter, page);

                    if (result.Status)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return Ok(result);
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
        public async Task<IActionResult> GetAllProjectByCompany(Guid id, int page = 0)
        {
            ConceptFilter config = new ConceptFilter();

            var autorization = Autorization();
            try
            {
                if (autorization !=null ||  autorization.Bearer != null)
                {

  
                    config.IdCompany = id;  //autorization.idCompany;
                    var result = await _Project.GetAllByCompany(config, page);

                    if (result.Status)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return Ok(result);
                    }

                }
                else
                {
                    Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message.ToString());
            }

            return NotFound("No disponible");

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
