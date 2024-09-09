using AngleSharp.Common;
using AngleSharp.Io;
using CloudinaryDotNet;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.IA.SearchProduct;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.Admin;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Interfaces.Mail;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Security;
using GoTaskServicePlus.Model.Statistics;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.RequestLog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using System;
using System.Net;
using System.Security.Claims;
using System.Text.Json;
using Utility.General;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace GoTaskServiceplus.Server.ProductController
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private HttpClient http { get; set; }
        private readonly IConfiguration _Config;
        private readonly IProductService _CrudService;
        private readonly IProducSearch _search;
        private readonly IPredictionProductName _IPredictionProductName;
        private IJWTAutentication _jwt;
        private IChat _Chat;
        private IMail _Mail;
        private IDataAnalysisService _Analysis;
        private IClaims _IClaims;
        private IProductUtil _IUtil;

        public ProductController(IConfiguration _Config, IProductService _CrudService, IProducSearch _search, IJWTAutentication jwt, IPredictionProductName _IPredictionProductName, IChat _IChat, IMail _Mail, IDataAnalysisService _Analysis, IClaims _IClaims, IProductUtil _IUtil)
        {
            this._Config = _Config;
            this._CrudService = _CrudService;
            this._search = _search;
            this._jwt = jwt;
            this._IPredictionProductName = _IPredictionProductName;
            this._Chat = _IChat;
            this._Mail = _Mail;
            this._Analysis = _Analysis;
            this._IClaims = _IClaims;
            this._IUtil = _IUtil;
        }



        [HttpPost("[action]")]
        public async Task<IActionResult> SaveProduct(CancellationToken cancel,[FromBody] tblProduct product)
        {

            Response<tblProduct> response = new Response<tblProduct>();

            var autorization = Autorization();
            try
            {
                if (autorization.Bearer != null)
                {
                    var list = (from i in product.ImgList
                                where i.url.Contains("PC")
                                select i.Id).ToList();

                    if (autorization.IdProject != Config.GuidEmpty && autorization.IdCompany != Config.GuidEmpty)
                    {
                        product.ConceptProject = new UtilNameCancept(autorization.NameProject, autorization.IdProject).Concept;
                        product.ConceptCompany = new UtilNameCancept(autorization.NameCompany, autorization.IdCompany).Concept;
                        product.ConceptPrevious = new UtilNameCancept("NamePrevious", Config.GuidEmpty).Concept;                       
                        product.IdCompany = autorization.IdCompany;
                        product.IdProject = autorization.IdProject;


                       int count = autorization.Rol.Where(s => s.IsAdmin == true).Count();
                        if (count <= 0)
                        {
                            product.Disable = true;
                           _= _IUtil.ProductCreate(autorization.NameProject);
                        }
                        else
                        {
                            product.Disable = false;
                        }

                        product.IdProject = autorization.IdProject; 
                        response = await _CrudService.Save(product);
                        //var imgResponse = await _CrudService.SelectedImg(list, conceptProject, conceptCompany, product.Id);

                        //response = await RequestLogService<tblProduct>.Save(response);
                        if (response.Status) _Chat.ClearListBdTemp("SaveProduct");
                        _IPredictionProductName.IaModel = null;
                        response.Msg.Add(new MsgResponse() { Msg = $"Guardado {(Null<bool>.GetNull(product.Disable)? "y pendiente de revisión" : "")}" });
                    }
                    else
                    {
                        response.Msg.Add(new MsgResponse() { Msg = "Id de sucursar requerida" });
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
                throw;
            }
        }

      
        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProduct(CancellationToken cancel,tblProduct product)
        {


            var autorization = Autorization();

            try
            {
                if (autorization.Bearer != null )
                {

                    product.IdCompany = autorization.IdCompany;
                    product.IdProject = autorization.IdProject;
                    product.ConceptProject = new NameConcept { Name = autorization.NameProject };
                    product.ConceptCompany = new NameConcept { Name = autorization.NameProject };

                    int count = autorization.Rol.Where(s => s.IsAdmin == true).Count();
                    if (count <= 0)
                    {
                        product.Disable = true;
                        _ = _IUtil.ProductCreate(autorization.NameProject);
                    }
                    else
                    {
                        product.Disable = false;
                    }


                    var result = await _CrudService.Update(product);

                    if (result.Status)
                    {
                        if (result.Status) _Chat.ClearListBdTemp("UpdateProduct");
                        _IPredictionProductName.IaModel = null;
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
                return NotFound((ex.Message, false, ""));
            }


        }



        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteProduct(CancellationToken cancel, Guid id)
        {


            var token = HttpContext.Request.Headers.Authorization;
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);


            if (autorization.bearer != "" && autorization.bearer != null)
            {
                var project = autorization.claim.FirstOrDefault(s => s.Type == "idProject");
                var company = autorization.claim.FirstOrDefault(s => s.Type == "idCompany");


                Guid idProject = Null<Guid>.GetNull((project != null ? project.Value : Config.GuidEmpty.ToString()));
                Guid idCompany = Null<Guid>.GetNull((company != null ? company.Value : Config.GuidEmpty.ToString()));

                ConceptFilter config = new ConceptFilter()
                {
                    IdCompany = idCompany,
                    IdProject = idProject
                };


                try
                {

                    var product = await _CrudService.Get(config, id);
                    if (product.Data.ImgList == null) product.Data.ImgList = new List<ImgItem>();
                    var list = (from i in product.Data.ImgList
                                where i.url.Contains("PC")
                                select i.Id).ToList();

                    var conceptProject = new NameConcept { Id = idProject, Name = "", };
                    var conceptCompany = new NameConcept { Id = idCompany, Name = "", Value = "" };



                    var imgResponse = await _CrudService.SelectedImg(new List<Guid>(), config, id);
                    var result = await _CrudService.Delete(config, id);

                    if (result.Status)
                    {
                        if (result.Status) _Chat.ClearListBdTemp("DeleteProduct");
                        _IPredictionProductName.IaModel = null;
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound(result);
                    }
                }
                catch (Exception ex)
                {
                    return NotFound((ex.Message, false, ""));
                }
            }
            else
            {
                return Unauthorized();

            }
        }




        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductById(Guid id)
        {

            var autorization = Autorization();
            ConceptFilter config = new ConceptFilter();
            try
            {
                if (autorization.Bearer != null || true)
                {

                    var result = await _CrudService.Get(config, id);

                    if (result.Status)
                    {
                        _Analysis.Save("Seleccionado:"+ result.Data.Name, autorization.IpCutomer);
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
                _IUtil.SendNotificationBuyCancel($"Seleccionado da error id: {id}");
                return NotFound(("No identificado", false, ""));
            }

            
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductByName(CancellationToken cancel, string filter, Guid typeId,int page = 0)
        {
           var autorization = Autorization();
           var response =  new Response <List<tblProduct>>();
            var conceptFilter = new ConceptFilter();    

            try
            {

                if (autorization !=null &&  autorization.Bearer !=null )
                {
                    PropertySegurity.IsLogin = true;
                    int count = autorization.Rol.Where(s => s.IsAdmin == true).Count();
                    PropertySegurity.IsAdmin = count>0;

                    count =0;
                    count = autorization.Rol.Where(s => s.IsVendor == true).Count();
                    PropertySegurity.IsVendor = count > 0;

                    count = 0;
                    count = autorization.Rol.Where(s => s.IsMaker == true).Count();
                    PropertySegurity.IsMaker = count > 0;

                    conceptFilter.IdProject = autorization.IdProject;


                }
                else
                {
                    PropertySegurity.IsLogin = false;
                }

                conceptFilter.IdCitys = autorization.FilterCitysRules;
                
                response = await _search.GetProducByName(conceptFilter, filter, typeId, page);
                _Analysis.Save($"Busqueda: {filter}", autorization.IpCutomer);

              

                if (response !=null && response.Status)
                {
                   if(response.Data!=null) response.Data = response.Data.Where(s=>s.Name !=null).OrderBy(s=>s.Name).ToList();
                    if (response.Data == null) response = new Response<List<tblProduct>>();
                 
                    response.Data = await _IUtil.OrderProduct(response.Data); 
                    return Ok(response);
                }
                else
                {
                    response.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                    if (response.Data == null) response = new Response<List<tblProduct>>();
                   
                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                response.Msg = new List<MsgResponse> { new MsgResponse { Msg = ex.Message } };
                if (response.Data == null) response.Data = new List<tblProduct>();
                _IUtil.SendNotificationBuyCancel($"({filter}) Resultados: Genero un error");
                return StatusCode(500, response);
            }


        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllCategoryList(CancellationToken cancel)
        {
            var autorization = Autorization();
            var response = new Response<List<ConceptCategory>>();
            var conceptFilter = new ConceptFilter();

            try
            {


                if (autorization != null && autorization.Bearer != null)
                {
                    PropertySegurity.IsLogin = true;
                    int count = autorization.Rol.Where(s => s.IsAdmin == true).Count();
                    PropertySegurity.IsAdmin = count > 0;

                    count = 0;
                    count = autorization.Rol.Where(s => s.IsVendor == true).Count();
                    PropertySegurity.IsVendor = count > 0;

                    count = 0;
                    count = autorization.Rol.Where(s => s.IsMaker == true).Count();
                    PropertySegurity.IsMaker = count > 0;

                    conceptFilter.IdProject = autorization.IdProject;


                }
                else
                {
                    PropertySegurity.IsLogin = false;
                }

                response = await _search.CategoryOfProduct(conceptFilter);
              

                if (response != null && response.Status)
                {                   
                    return Ok(response);
                }
                else
                {
                    response.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                  

                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                response.Msg = new List<MsgResponse> { new MsgResponse { Msg = ex.Message } };
                return StatusCode(500, response);
            }


        }





        [HttpGet("[action]")]
        public async Task<IActionResult> GetProducByPartial(CancellationToken cancel,Guid typeId)
        {

            var autorization = Autorization();
            var response = new Response<List<tblProduct>>();
            var concept = new ConceptFilter();
            try
            {

                if (autorization != null && autorization.Bearer != null)
                {
                    PropertySegurity.IsLogin = true;
                    int count = autorization.Rol.Where(s => s.IsAdmin == true).Count();
                    PropertySegurity.IsAdmin = count > 0;

                    count = 0;
                    count = autorization.Rol.Where(s => s.IsVendor == true).Count();
                    PropertySegurity.IsVendor = count > 0;

                    count = 0;
                    count = autorization.Rol.Where(s => s.IsMaker == true).Count();
                    PropertySegurity.IsMaker = count > 0;

                    concept.IdProject = autorization.IdProject;


                }
                else
                {
                    PropertySegurity.IsLogin = false;
                }

                response = await _search.GetProducByPartial(concept,typeId);
               

                if (response != null && response.Status)
                {
                    if (response.Data != null) response.Data = response.Data.Where(s => s.Name != null).OrderBy(s => s.Name).ToList();
                    if (response.Data == null) response = new Response<List<tblProduct>>();

                    response.Data = await _IUtil.OrderProduct(response.Data);
                    return Ok(response);
                }
                else
                {
                    response.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                    if (response.Data == null) response = new Response<List<tblProduct>>();

                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                response.Msg = new List<MsgResponse> { new MsgResponse { Msg = ex.Message } };
                if (response.Data == null) response.Data = new List<tblProduct>();
                _IUtil.SendNotificationBuyCancel($" Resultados: Genero un error {ex.Message}");
                return StatusCode(500, response);
            }


        }




        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductImageByName(string filter, Guid typeId)
        {


            var autorization = Autorization();
           
            try
            {             

                var result = await _search.GetProducImageByName(filter, typeId);

                if (result.Status)
                {
                    result.Data = result.Data.OrderBy(s => s.Name).ToList();                  
                    return Ok(result);
                }
                else
                {
                    result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }
         
        }




        [HttpGet("[action]")]
        public async Task<IActionResult> GetListSearch()
        {
            Response<List<SearchFilter>> response = new Response<List<SearchFilter>>();
            response.Data = _Analysis.SearchList;
            response.Status = true;
           return Ok(response);

        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductByProject(string filter, Guid typeId, int page = 0)
        {
            ConceptFilter concept = new ConceptFilter();
            var autorization = Autorization();
            try
            {
                if (autorization.Bearer != null)
                {
                    concept.IdProject = autorization.IdProject;
                    PropertySegurity.IsLogin = true;

                    var result = await _search.GetProducByName (concept, filter,typeId, page);
                 
                    if (result.Status)
                    {
                        result.Data = result.Data.OrderBy(s => s.Name).ToList();
                        return Ok(result);
                    }
                    else
                    {
                        result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                        return Ok(result);
                    }
                }else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }
            return NotFound("");

        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetProductByNameIA(CancellationToken cancel, string filter, Guid typeId, int page = 0)
        {

            var autorization = Autorization();
            var conceptFilter = new ConceptFilter();
            try
            {

                if (autorization.Bearer!=null)
                {
                    PropertySegurity.IsLogin = true;
                    conceptFilter.IdProject = autorization.IdProject;
                    conceptFilter.IdCompany = autorization.IdCompany;


                }
                else
                {
                    PropertySegurity.IsLogin = false;

                }

                conceptFilter.IdCitys = autorization.FilterCitysRules;

                var result = new Response<List<tblProduct>>();// await _search.GetProducByName(conceptFilter, true,filter, typeId, page);

                if (result.Status)
                {
                    //await Task.Delay(TimeSpan.FromSeconds(30));
                  
                    return Ok(result);
                }
                else
                {
                  
                    result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                _IUtil.SendNotificationBuyCancel($"Busqueda con IA ({filter}) Resultado: con error");
                return NotFound((ex.Message, false, ""));
            }
        

        }



        [HttpPost("[action]")]
        public async Task<IActionResult> GetListFavorite(CancellationToken cancel,List<Guid> list, int page = 0)
        {

            var autorization = Autorization();

            try
            {

                if (true)
                {
                    PropertySegurity.IsLogin = true;
                    //PropertySegurity.SegurityClaim = autorization.claim;
                }
                else
                {
                    PropertySegurity.IsLogin = false;

                }
                var result = await _search.GetListFavorite(list, page);

                if (result.Status)
                {
                    _Analysis.Save("Lectura de favoritos:" , " IP : " + autorization.IpCutomer);

                    return Ok(result);
                }
                else
                {
                    result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }
            return NotFound("");

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetImgByByComapny(CancellationToken cancel,string  filter , int page = 0)
        {                        
            var autorization = Autorization();

            try
            {


                Guid idCompany = autorization.IdCompany;
                ConceptFilter config = new ConceptFilter()
                {
                    IdCompany = idCompany,
                    
                };

                var result = await _CrudService.GeImagesByCompanyId(config, filter, page);
              

                if (result.Status)
                {

                    return Ok(result);
                }
                else
                {
                    result.Msg = new List<MsgResponse> { new MsgResponse { Msg = "No datos para mostrar" } };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return NotFound((ex.Message, false, ""));
            }
            return NotFound("");

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
                autorizationUser.Bearer = autorization.bearer;

            }

            autorizationUser.IpCutomer = Request.Headers["X-Client-IP"].FirstOrDefault();
            var filter = Request.Headers["X-Filter-Rules"].FirstOrDefault();


            if (filter != null)
            {
                autorizationUser.FilterCitysRules = Null<List<string>>.Get(filter);

            }

            return autorizationUser;
        }


    }
}
