using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.RequestLog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private IUser _User;
        private IClaims _IClaims;

        public UserController(IConfiguration _Config, IJWTAutentication jwt, IUser _User, IClaims _IClaims)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._User = _User;
            this._IClaims = _IClaims;
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {

            var response = new Response<tblUser>();
            var autorization = Autorization();

            var concept = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                response = await _User.Delete(concept, id);
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }


        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DisableUser(Guid id)
        {
            var response = new Response<tblUser>();
            var autorization = Autorization();

            var concept = new ConceptFilter();

            if (autorization.Bearer != null)
            {
                response = await _User.Delete(concept, id);
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateUser([FromBody] tblUser user)
        {
            var response = new Response<tblUser>();
            var autorization = Autorization();

            if (autorization.Bearer != null)
            {
                response = await _User.Update(user);
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> SaveUser([FromBody] tblUser user)
        {
            var response = new Response<tblUser>();
            var autorization = Autorization();

            if (autorization.Bearer != null)
            {
                response = await _User.Save(user);
                return Ok(response);
            }
            else
            {
                return Unauthorized();
            }

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProjectActive(tblUser userId)
        {
            var obj = new Response<tblUser>();

            var autorization = Autorization();

            if (autorization.Bearer != "")
            {
                ConceptFilter config = new ConceptFilter()
                {

                };

                var exist = await _User.Get(config, autorization.IdUser);
                if (exist.Data != null)
                {
                    var data = new UtilUser(exist.Data, userId.IdCompany, userId.IdProject);
                    var user = await _User.Update(data.user);
                    return Ok(user);
                }
                else
                {
                    return NotFound("Usuario no existe");
                }

            }

            return Unauthorized();

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserById(Guid id)
        {

            Response<tblUser> response = new Response<tblUser>();

            var autorization = Autorization();

            ConceptFilter config = new ConceptFilter()
            {

            };


            try
            {
                if (autorization.Bearer != null || true)
                {
                    response = await _User.Get(config, id);
                    response.Data.Password = "";
                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }

            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound();

            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllUserByProject(string filter, string idProject, int page = 0)
        {

            Response<List<tblUser>> response = new Response<List<tblUser>>();

            var autorization = Autorization();

            try
            {
                if (autorization.Bearer != null)
                {

                    ConceptFilter config = new ConceptFilter();


                    if (Config.GuidIsNotValid(idProject))
                    {
                        config.IdProject = Config.GuidParse(idProject);

                        if (Config.GuidIsNotValid(idProject))
                            response = await _User.GetAllByIdProjet(config, page);

                        if (response.Data != null)
                        {

                            foreach (var user in response.Data)
                            {
                                user.Password = "";
                            }
                        }
                    }

                    return Ok(response);
                }
                else
                {
                    return Ok(response);
                }

            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound();

            }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetVisitorCounter(string key)
        {
            Response<List<CounterUser>> response = new Response<List<CounterUser>>();
            try
            {
                if (key == "key123456789")
                {
                    response.Data = _User.CounterUsers != null ? _User.CounterUsers : new List<CounterUser>();
                    return Ok(response);
                }
                else
                {
                    return NotFound(response);
                }

            }
            catch (Exception ex)
            {

                return NotFound(response);

            }
        }



        [HttpPost("[action]")]
        public async Task<IActionResult> SetVisitorCounter(CounterUser counterUser)
        {
            Response<List<CounterUser>> response = new Response<List<CounterUser>>();
            var date = new DateTime();
            date = DateTime.Today;
            try
            {
                if (counterUser != null)
                {
                    if (_User.CounterUsers == null) _User.CounterUsers = new List<CounterUser>();
                    var exist = _User.CounterUsers.FirstOrDefault(s => s.Page == counterUser.Page);

                    if (exist == null)
                    {
                        counterUser.Count = 1;
                        _User.CounterUsers.Add(counterUser);
                    }
                    else
                    {
                        exist.Date = date.ToString("dd-MM-yyyy hh:mm");
                        exist.Count++;
                    }

                }

                response.Data = _User.CounterUsers != null ? _User.CounterUsers : new List<CounterUser>();
                return Ok(response);

            }
            catch (Exception ex)
            {

                return NotFound(response);

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
