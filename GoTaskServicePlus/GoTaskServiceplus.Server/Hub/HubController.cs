using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Hub;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using HubAction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class HubController : ControllerBase
    {
        private readonly IHubNotification _HubNotification;
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;      
        private IJWTAutentication _jwt;
        private IClaims _IClaims;


        public HubController(IConfiguration _Config,  IClaims _IClaims, IJWTAutentication _jwt, IHubNotification _HubNotification)
        {
            this._Config = _Config;          
            this._jwt = _jwt;
            this._HubNotification = _HubNotification;
           
        }

      

        [HttpPost("[action]")]
        public async Task<IActionResult> Msg(string text)
        {
            await _HubNotification.Send(text);
            
            return Ok("ok hub");

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
