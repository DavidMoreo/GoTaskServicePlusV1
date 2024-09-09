using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;

namespace GoTaskServiceplus.Server.PaymentController
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IClaims _IClaims;
        private IJWTAutentication _jwt;

        public PaymentController(IConfiguration _Config, IClaims _IClaims, IJWTAutentication _jwt)
        {
            this._Config = _Config;
            this._IClaims = _IClaims;           
            this._jwt = _jwt;           
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SavePayment([FromBody] tblPayment payment)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;

            //var model = _Sql.GetModelSql(TypeModelSql.Payment);


            return NotFound("No disponible");

        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeletePayment([FromBody] string id)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            return NotFound("No disponible");


        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdatePayment([FromBody] tblPayment payment)
        {

            //var identy = HttpContext.User.Identity as ClaimsIdentity;
            //var model = _Sql.GetModelSql(TypeModelSql.Payment);

            //try
            //{
            //    var result = await model.Update(JsonSerializer.Serialize(payment));

            //    if (result.Status)
            //    {

            //        return Ok(result);
            //    }
            //    else
            //    {
            //        return NotFound(result);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    return NotFound((ex.Message, false, ""));
            //}

            return Ok("ok");


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPaymentById([FromBody] string idPayment, int page)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
            return NotFound("No disponible");

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllPayment(Guid idProject, int page =0)
        {

            var identy = HttpContext.User.Identity as ClaimsIdentity;
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
