using AngleSharp.Io;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Chats;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Notification;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.KeyValidation;
using GoTaskServicePlus.Services.MailService;
using GoTaskServicePlus.Services.RequestLog;
using iText.Kernel.XMP.Impl;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class KeyValidationController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;  
        private IDataAnalysisService _Analysis;
        private IMail _Mail;
        private IClaims _IClaims;
        private IKeyValidation _IKeyValidation;
        private IBuyCustomerUtil _Util;




        public KeyValidationController(IConfiguration _Config, IJWTAutentication jwt, IUser _User,  IMail _Mail, IDataAnalysisService analysis, IClaims _IClaims, IKeyValidation _IKeyValidation, IBuyCustomerUtil _Util)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._IKeyValidation = _IKeyValidation;
            this._Mail = _Mail;
            this._Util = _Util;

            _Analysis = analysis;
            this._IClaims = _IClaims;

        }

     

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCodeVerification(string number)
        {
            Response<string> response = new Response<string>();

            var key = Autorization();
            try
            {
                ConceptFilter concept = new ConceptFilter();

              
                response = await _IKeyValidation.KeySendAsync(number);

                response.Data = _IKeyValidation.KeyCrypt(response.Data);

                return Ok(response);


            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound(response);

            }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> ValidationCode(string code)
        {
            Response<string> response = new Response<string>();

            var key = Autorization();
            try
            {
                ConceptFilter concept = new ConceptFilter();


                response.Data = await _Util.SendNotificationCodeVerificatione(code);

                string descript  =  _IKeyValidation.KeyDesCrypt(response.Data);

                response.Data = (descript == code).ToString();

                return Ok(response);

            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
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
