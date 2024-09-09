
using CloudinaryDotNet.Actions;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Mvc;
using Utility.General;


namespace GoTaskServiceplus.Server.CompanyController
{
    [ApiController]
    [Route("[controller]")]
    public class BuyCustomerController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private IJWTAutentication _jwt;
        private IUser _User;
        private IBuyCustomer _BuyCustomer;
        private IDataAnalysisService _Analysis;
        private IMail _Mail;
        private IClaims _IClaims;
        private IBuyCustomerUtil _Util;



        public BuyCustomerController(IConfiguration _Config, IJWTAutentication jwt, IUser _User, IBuyCustomer BuyCustomer, IMail _Mail, IDataAnalysisService analysis, IClaims _IClaims, IBuyCustomerUtil _Util)
        {
            this._Config = _Config;
            this._jwt = jwt;
            this._User = _User;
            this._Mail = _Mail;
            this._User = _User;
            this._BuyCustomer = BuyCustomer;
            _Analysis = analysis;
            this._IClaims = _IClaims;
            this._Util = _Util;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddBuyCustomer()
        {
            var key = Autorization();
            var concept = new ConceptFilter();
            var response = new Response<List<string>>();
            response.Data = new List<string>();
            try
            {
                if (key != null)
                {
                    concept.IdProject = key.IdProject;
                    concept.IdCompany = key.IdCompany;
                    concept.IdUser = key.IdUser;
                    concept.MobilNumber = key.MobileNumber;
                    concept.NameUser = key.NameUser;
                    var result = await _BuyCustomer.Save(concept);

                  

                    _Util.SendNotificationCustomerPurchaseAsync(concept,result.Data);

                    _Analysis.Save($"COMPRA REALIZADA", key.IpCutomer);

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
        public async Task<IActionResult> UpdateBuyCustomer(tblBuyerCustomer chat)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {
                    var response = await _BuyCustomer.Update(chat);


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
        public async Task<IActionResult> DeleteAdminBuyCustomer(Guid id)
        {
            var key = Autorization();
            try
            {
                if (key != null)
                {

                    ConceptFilter config = new ConceptFilter();

                    var response = await _BuyCustomer.Delete(config, id);

                    return Ok(response);
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex) { return NotFound(); }

        }

        //[HttpGet("[action]")]
        //public async Task<IActionResult> GetChatById(Guid id)
        //{

        //    var key = Autorization();
        //    try
        //    {
        //        if (key != null)
        //        {
        //            Response<tblBuyerCustomer> response = new Response<tblBuyerCustomer>();
        //            try
        //            {
        //                var config = new ConceptFilter();
        //                response = await _BuyCustomer.Get(config, id);
        //                return Ok(response);
        //            }
        //            catch (Exception ex)
        //            {
        //                //RequestLogService<tblProduct>.Save(response);
        //                return NotFound();
        //            }
        //        }
        //        else
        //        {
        //            return Unauthorized();
        //        }
        //    }
        //    catch (Exception ex) { return NotFound(); }
        //}


        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllBuyCustomerByProject(int page = 0)
        {
            Response<List<tblBuyerCustomer>> response = new Response<List<tblBuyerCustomer>>();

            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {

                    if (key.IdProject != null)
                    {
                        Guid idProject = Null<Guid>.GetNull(key.IdProject);
                        return Ok(response);

                    }
                    else
                    {
                        return NotFound(response);
                    }


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


        [HttpPost("[action]")]
        public async Task<IActionResult> GetAllBuyCustomer(int page = 0)
        {

            Response<List<tblBuyerCustomer>> response = new Response<List<tblBuyerCustomer>>();

            var concept = new ConceptFilter();

            var key = Autorization();
            try
            {
                if (key.Bearer != null)
                {
                    concept.IdUser = key.IdUser;    
                    concept.IdProject = key.IdProject;    

                    response = await _BuyCustomer.GetAllByCustomer(concept, 0);
                    if (response.Data != null) response.Data = response.Data.OrderBy(s => s.PurchareId).OrderBy(o => o.StatusMovementItem).ToList();
                    if (response.Data != null) response.Data = response.Data.Where(s => s.StatusMovementItem != StatusMovement.PurchaseCancelled && s.StatusMovementItem != StatusMovement.PurchaseCancelledByCustomer).ToList();
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



        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllBuyStatusAdmin(string movementTypeItem,string idProject,  int page = 0)
        {
            Response<List<tblBuyerCustomer>> response = new Response<List<tblBuyerCustomer>>();

            var key = Autorization();
            try
            {
                if (key.Bearer != null && key.Bearer != "")
                {

                    ConceptFilter concept = new ConceptFilter();
                    concept.IsAdmin = true;

                    if (Config.GuidParse(idProject) != Config.GuidEmpty)
                        concept.IdProject = Config.GuidParse(idProject);
                    else
                        concept.IdProject = key.IdProject;

                   response = await _BuyCustomer.GetAllStatus(concept, movementTypeItem, 0);
                    if (response.Data != null) response.Data.OrderBy(s => s.PurchareId).OrderBy(o => o.StatusMovementItem).ToList();
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
                return NotFound(response);

            }
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllBuyStatus(string movementTypeItem, int page = 0)
        {
            Response<List<tblBuyerCustomer>> response = new Response<List<tblBuyerCustomer>>();

            var key = Autorization();
            try
            {
                if (key.Bearer != null && key.Bearer != "")
                {

                    ConceptFilter concept = new ConceptFilter();
                    concept.IsAdmin = true;
                    concept.IdProject = key.IdProject;


                    response = await _BuyCustomer.GetAllStatus(concept, movementTypeItem, 0);
                    if (response.Data != null) response.Data.OrderBy(s => s.PurchareId).OrderBy(o => o.StatusMovementItem).ToList();
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
                return NotFound(response);

            }
        }



        [HttpGet("[action]")]
        public async Task<IActionResult> GetCountBuyStatus()
        {
            Response<CountBuyerCustomer> response = new Response<CountBuyerCustomer>();

            var key = Autorization();
            try
            {
                if (key.Bearer != null && key.Bearer != "")
                {
                    ConceptFilter concept = new ConceptFilter();
                    concept.IsAdmin = true;
                    concept.IdProject = key.IdProject;
                    response = await _BuyCustomer.GetCountByStatusAdmin(concept);

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
                return NotFound(response);

            }
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> CancelBuyById(Guid id, string movementTypeItem)
        {
            Response<tblBuyerCustomer> response = new Response<tblBuyerCustomer>();

            var key = Autorization();
            try
            {

                ConceptFilter concept = new ConceptFilter();
                //concept.IsAdmin = true;
                concept.IdUser = key.IdUser;
                concept.NameUser = key.NameUser;
                concept.MobilNumber = key.MobileNumber;

                response = await _BuyCustomer.CancelBuy(concept, movementTypeItem, id);
                var exist = await _BuyCustomer.Get(concept, id);

                if (exist.Status)
                {
                    if (exist.Data.StatusMovementItem == movementTypeItem)
                        response.Status = true;
                    _Util.SendNotificationBuyCancel(movementTypeItem);
                }

                return Ok(response);


            }
            catch (Exception ex)
            {
                //RequestLogService<tblProduct>.Save(response);
                return NotFound(response);

            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CancelAdminBuyById(Guid id, string movementTypeItem)
        {
            Response<tblBuyerCustomer> response = new Response<tblBuyerCustomer>();

            var key = Autorization();
            try
            {

                if (key.Bearer != null)
                {
                    ConceptFilter concept = new ConceptFilter();
                    concept.IsAdmin = true;
                    concept.IdUser =  key.IdUser;
                    concept.NameUser =  key.NameUser;
                    concept.MobilNumber =  key.MobileNumber;


                    response = await _BuyCustomer.CancelAdminBuy(concept, movementTypeItem, id);


                    var exist = await _BuyCustomer.Get(concept, id);

                    //if(exist.Data.MovementTypeItem == MovementType.PurchaseCancelledByVendor)
                    //_Util.SendNotificationInfoPurchase(exist.Data);
                    if (exist.Data == null)
                        response.Status = false;
                    if (exist.Data.StatusMovementItem == StatusMovement.PurchaseInProcess)
                        _Util.SendNotificationInfoPurchase(concept,exist.Data);
                    if (exist.Data.StatusMovementItem == StatusMovement.PurchaseInDelivery)
                        _Util.SendNotificationInfoPurchase(concept,exist.Data);



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

            }
            return NotFound();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCodeVerification(string number)
        {
            Response<string> response = new Response<string>();

            var key = Autorization();
            try
            {
                ConceptFilter concept = new ConceptFilter();

              
                response.Data = await _Util.SendNotificationCodeVerificatione(number);
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
