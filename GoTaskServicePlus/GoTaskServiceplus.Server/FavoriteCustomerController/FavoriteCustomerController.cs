
using CloudinaryDotNet.Actions;
using GoTaskServicePlus.Entities.CartCustomer;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.CarCustomer.Util;
using GoTaskServicePlus.Interfaces.CarCustomers;
using GoTaskServicePlus.Interfaces.FavoriteCustomer.Util;
using GoTaskServicePlus.Interfaces.FavoriteCustomers;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Product;
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
    public class FavoriteCustomerController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private IUser _User;
        private IFavoriteCustomer _IFavoriteCustomer;
        private IDataAnalysisService _Analysis;
        private IMail _Mail;
        private IClaims _IClaims;
        private IUtilFavoriteCustomerService _Util;
        private IProducSearch _Product;



        public FavoriteCustomerController(IConfiguration _Config, IJWTAutentication jwt, IUser _User, IFavoriteCustomer _ICarCustomer, IMail _Mail, IDataAnalysisService analysis, IClaims _IClaims, IUtilFavoriteCustomerService _Util, IProducSearch _Product)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._User = _User;
            this._Mail = _Mail;
            this._User = _User;
            this._IFavoriteCustomer = _ICarCustomer;
            _Analysis = analysis;
            this._IClaims = _IClaims;
            this._Util = _Util;
            this._Product = _Product;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddFavoriteCustomer(tblBuyerCustomerConcept cart)
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


                    var buy = new UtilFavoriteCustomer(concept,cart);
                    var result = await _IFavoriteCustomer.SaveFavoriteCustomer(concept, buy.BuyCustomer);

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
        public async Task<IActionResult> UpdateFavoriteCustomer(tblBuyerCustomer chat)
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
        public async Task<IActionResult> DeleteavoriteItem(Guid id)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {

                    ConceptFilter config = new ConceptFilter();

                    var response = await _IFavoriteCustomer.DeleteFavoriteCustomer(config,id);

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
        public async Task<IActionResult> GetAllFavoriteByUser(int page, string statusMovement)
        {

            Response<List<tblProduct>> response = new Response<List<tblProduct>>();
            var concept = new ConceptFilter();  
            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {
                    concept.IdUser = key.IdUser;

                    var favorites = await _IFavoriteCustomer.GetAllByUserFavoriteCustomer(concept, statusMovement,page);

                    var list = favorites.Data.Select(s=>s.IdProduct).ToList();    

                    response = await  _Product.GetListFavorite(list, 0);

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
