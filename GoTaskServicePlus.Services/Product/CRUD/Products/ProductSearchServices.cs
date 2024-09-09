using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Model.Comon;
using System.Linq;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Services.Product.CRUD.Products.UtilSearch;
using GoTaskServicePlus.IA.SearchProduct;
using GoTaskServicePlus.Interfaces.IA;
using GoTaskServicePlus.Model.IA;
using System.Collections.Generic;
using System;
using GoTaskServicePlus.Interfaces.Admin;
using Utility.General;
using GoTaskServicePlus.Interfaces.Products;

namespace GoTaskServicePlus.Services.Product
{
    public class IProductSearchService : IProducSearch
    {
        private readonly ISqlSearch<tblProduct> _search;
        private IJWTAutentication _jwt;
        private IPredictionProductName _IPredictionProductName;
        private IStorageTemp _CacheTemp;
        private IDataAnalysisService _Analysis;
        private IProductUtil _IProductUtil;

        public IProductSearchService(ISqlModelProduct<tblProduct> _CrudService, ISqlSearch<tblProduct> _search, IJWTAutentication _jwt, IPredictionProductName _IPredictionProductName, IStorageTemp _CacheTemp, IDataAnalysisService _Analysis, IProductUtil _IProductUtil)
        {

            this._search = _search;
            this._jwt = _jwt;
            this._IPredictionProductName = _IPredictionProductName;
            this._CacheTemp = _CacheTemp;
            this._Analysis = _Analysis;
            this._IProductUtil = _IProductUtil;
        }

        public async Task<Response<List<tblProduct>>> GetListFavorite(List<Guid> list, int page)
        {

            var filterResult = new List<tblProduct>();

            var response = new Response<List<tblProduct>>();
            response = await _search.GetListById(list);

            return response;
        }

        public async Task<Response<List<tblProduct>>> GetProducByName(ConceptFilter concept, string filter, Guid typeId, int page)
        {
            var listFilter = new List<Guid>();
            var filterResult = new List<tblProduct>();
            var response = new Response<List<tblProduct>>();
            //var listProduct = new List<ChatBot>();
            var listProductInUse = new List<ChatBot>();

            filter = filter.Replace("-", " ").Trim();

            var product = new tblProduct();
            product.Name = filter;
            product.IdTypeOfProduct = typeId;

            response = await _search.GetFilterByName(concept, product, page, 10);

            if (!PropertySegurity.IsLogin || (PropertySegurity.IsLogin && !PropertySegurity.IsVendor && !PropertySegurity.IsMaker && !PropertySegurity.IsAdmin))
                response.Data = (from g in response.Data where g.IsPublic == true && g.Disable == false select g).ToList();
            else if (PropertySegurity.IsVendor || PropertySegurity.IsMaker || PropertySegurity.IsAdmin)
                response.Data = (from g in response.Data where g.IdProject == concept.IdProject select g).ToList();

            //if (typeId != Config.GuidEmpty)
            //    listProductInUse = (from g in listProductInUse where g.TypeProductId == typeId select g).ToList();



            //if (concept.IdCitys != null && concept.IdCitys.Count > 0)
            //{
            //    var prodoctCity = UtilProducByName.FilterProducByCity(listProductInUse, concept.IdCitys);
            //    listFilter = (from d in UtilProducByName.ConverProducByChactBotConcept(prodoctCity) select d.Id).ToList();
            //}
            //else
            //{
            //    listFilter = (from d in listProductInUse select d.Id).ToList();
            //}



            //if (listFilter.Count > 0) response = await _search.GetListById(listFilter);


            if (response == null) response = new Response<List<tblProduct>>();
            if (response.Data == null) response.Data = new List<tblProduct>();

            return response;
        }


        public async Task<Response<List<tblProduct>>> GetProducByPartial(ConceptFilter concept, Guid typeId)
        {
            var listFilter = new List<tblProduct>();
            var response = new Response<List<tblProduct>>();

            var product = new tblProduct();
            product.IdTypeOfProduct = typeId;
            product.Name = "all";

            response = await _search.GetFilterByName(concept, product, 1, 10);

            if (!PropertySegurity.IsLogin || (PropertySegurity.IsLogin && !PropertySegurity.IsVendor && !PropertySegurity.IsMaker && !PropertySegurity.IsAdmin))
                response.Data = (from g in response.Data where g.IsPublic == true && g.Disable == false select g).ToList();
            else if (PropertySegurity.IsVendor || PropertySegurity.IsMaker || PropertySegurity.IsAdmin)
                response.Data = (from g in response.Data where g.IdProject == concept.IdProject select g).ToList();

            //if (listFilter != null && listFilter.Count() > 0)
            //{
            //    //var pages = UtilProducByName.GetPages(listFilter, 10);
            //    //listFilter = UtilProducByName.FilterPages(listFilter, 10, 0);
            //    if (listFilter.Count > 0)
            //    {
            //        response = await _search.GetListById(listFilter);
            //       // response.Pages = pages;
            //    }
            //}

            if (response == null) response = new Response<List<tblProduct>>();
            if (response.Data == null) response.Data = new List<tblProduct>();


            response.Status = true;
            return response;
        }

        public async Task<Response<List<tblProduct>>> GetListProductById(List<Guid> idProducts, int page)
        {
            var response = await _search.GetListById(idProducts);
            return response;
        }

        public async Task<Response<List<ImgItem>>> GetProducImageByName(string filter, Guid typeId)
        {


            var response = new Response<List<ImgItem>>();
            if (response.Data == null) response.Data = new List<ImgItem>();
            var img = new ImgItem();

            filter = filter.Replace("-", " ").Trim();

            //_CacheTemp.LoadCacheProductAsync();

            //if (_CacheTemp.ListPoductChatBotTemp.Count() >= 1)
            //{

            //    var item = _CacheTemp.ListPoductChatBotTemp.ElementAtOrDefault(0);
            //    img.url = item.Url;
            //    response.Data.Add(img);
            //}








            return response;
        }




        public async Task<Response<List<tblProduct>>> GetProduct(string filter, Guid type, int page)
        {
            var response = new Response<List<tblProduct>>();

            if (_search.ListFilter == null)
            {
                var list = await _search.GetListFilter();
                _search.ListFilter = list.Data;
            }


            return response;
        }
        public async Task<Response<List<ConceptCategory>>> CategoryOfProduct(ConceptFilter config)
        {
            var response = new Response<List<ConceptCategory>>();
            response.Data = new List<ConceptCategory>();


            var data = await _search.CategoryOfProduct(config);

            //"CategoryOfProduct"
            if (data.Data.Count() >= 1)
            {
                var listProductInUse = data.Data;

                if (!PropertySegurity.IsLogin || (PropertySegurity.IsLogin && !PropertySegurity.IsVendor && !PropertySegurity.IsMaker && !PropertySegurity.IsAdmin))
                    listProductInUse = (from g in listProductInUse select g).ToList();
                else if (PropertySegurity.IsVendor || PropertySegurity.IsMaker || PropertySegurity.IsAdmin)
                    listProductInUse = (from g in listProductInUse where g.IdProject == config.IdProject  select g).ToList();


                if (listProductInUse.Count > 0)
                {
                    response.Data = (from s in listProductInUse
                                     select
                                       new ConceptCategory
                                       {
                                           Url = s.FirsImg.url,
                                           Id = s.IdTypeOfProduct,
                                           IdCompany = s.IdCompany,
                                           Name = s.Name.ToUpper()
                                           

                                       }).ToList();
                }



            }


            return response;
        }

    }
}
