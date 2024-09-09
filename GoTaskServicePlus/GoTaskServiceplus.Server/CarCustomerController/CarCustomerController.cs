
using CloudinaryDotNet.Actions;
using GoTaskServicePlus.Entities.CartCustomer;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.CarCustomer.Util;
using GoTaskServicePlus.Interfaces.CarCustomers;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using iText.Kernel.XMP.Impl;
using Microsoft.AspNetCore.Mvc;
using Utility.General;


namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class CartCustomerController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private IUser _User;
        private ICartCustomer _ICarCustomer;
        private IDataAnalysisService _Analysis;
        private IMail _Mail;
        private IClaims _IClaims;
        private IUtilCarCustomerService _Util;



        public CartCustomerController(IConfiguration _Config, IJWTAutentication jwt, IUser _User, ICartCustomer _ICarCustomer, IMail _Mail, IDataAnalysisService analysis, IClaims _IClaims, IUtilCarCustomerService _Util)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._User = _User;
            this._Mail = _Mail;
            this._User = _User;
            this._ICarCustomer = _ICarCustomer;
            _Analysis = analysis;
            this._IClaims = _IClaims;
            this._Util = _Util;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddCartCustomer(tblBuyerCustomerConcept cart)
        {
            var key = Autorization();
            var concept = new ConceptFilter();
            var response = new Response<List<string>>();
            response.Data = new List<string>();
            try
            {
                if (key.Bearer != null)
                {
                    concept.IdProject = key.IdProject;
                    concept.IdCompany = key.IdCompany;
                    concept.IdUser = key.IdUser;


                    var buy = new UtilCartCustomer(concept,cart);
                    var result = await _ICarCustomer.SaveCustomer(concept, buy.BuyCustomer);

                    //_Util.SendNotificationCustomerPurchaseAsync(concept,result.Data);

                    _Analysis.Save($"EN CARRITO", key.IpCutomer);

                    response.Status = true;
                    return Ok(response);
                }
                else
                {

                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }


        }


        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateCarCustomer(tblBuyerCustomer chat)
        {
            var response = new tblBuyerCustomer();

            var key = Autorization();
            try
            {
                if (key != null)
                {
                  //  var response = await _ICarCustomer.(chat);


                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteCartItem(Guid id)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {

                    ConceptFilter config = new ConceptFilter();

                    var response = await _ICarCustomer.DeleteCustomer(config,id);

                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }

        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllCarByUser(int page, string statusMovement)
        {

            Response<List<tblBuyerCustomer>> response = new Response<List<tblBuyerCustomer>>();
            var concept = new ConceptFilter();  
            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {
                    concept.IdUser = key.IdUser;

                    response = await _ICarCustomer.GetAllByUserCustomer(concept, statusMovement,page);
                    //if (response.Data != null) response.Data = response.Data.OrderBy(s => s.PurchareId).OrderBy(o => o.StatusMovementItem).ToList();
                    //if (response.Data != null) response.Data = response.Data.Where(s => s.StatusMovementItem != StatusMovement.PurchaseCancelled && s.StatusMovementItem != StatusMovement.PurchaseCancelledByCustomer).ToList();
                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound();

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
