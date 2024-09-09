using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Notification;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServiceplus.Server.PaymentController
{
    [ApiController]
    [Route("[controller]")]
    public class NotificationController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IDataAnalysisService _Analysis;
        private IJWTAutentication _jwt;
        private IClaims _IClaims;
        private INotification _INotification;


        public NotificationController(IConfiguration _Config, IDataAnalysisService _Analysis, IJWTAutentication _jwt, IClaims _IClaims, INotification _INotification)
        {
            this._Config = _Config;
            this._Analysis = _Analysis;
            this._jwt = _jwt;
            this._IClaims = _IClaims;
            this._INotification = _INotification;

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNotification(CancellationToken cancel)
        {
            //var autorization = Autorization();

            var response = new Response<List<NotificationModel>>();
            var list = _INotification.ListTempNotification.Where(s => s.Status == false).ToList();


            //while (list.Count <= 0)
            //{
            //    list = _INotification.ListTempNotification.Where(s => s.Status == false).ToList();
            //    await Task.Delay(TimeSpan.FromSeconds(2));
            //}


                if (list != null && list.Count() > 0)
                {
                    var data = Null<List<NotificationModel>>.Set(list.OrderByDescending(s => s.Id).ToList());
                    response.Data = Null<List<NotificationModel>>.Get(data);

                    foreach (var item in response.Data)
                    {
                        var msg = _INotification.ListTempNotification.FirstOrDefault(s => s.Id == item.Id);
                        if (msg != null)
                            msg.Status = true;
                    }
                }

          

            

            return Ok(response.Data);

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
