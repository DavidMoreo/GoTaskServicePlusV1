using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace GoTaskServiceplus.Server.PaymentController
{
    [ApiController]
    [Route("[controller]")]
    public class MailController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IMail _Mail;
       

        public MailController(IConfiguration _Config, IMail _Mail)
        {
            this._Config = _Config;
            this._Mail = _Mail;
           
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SendMail([FromBody] MailContent mail)
        {
           
           
            var identy = HttpContext.User.Identity as ClaimsIdentity;
           var rest =await _Mail.SenrMail(mail);
            return Ok(rest);

        }



    }
}
