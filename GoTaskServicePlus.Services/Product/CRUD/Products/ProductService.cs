using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Product;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.IA;
using GoTaskServicePlus.Model.Statistics;
using GoTaskServicePlus.Model.Structure;
using GoTaskServicePlus.Services.Product.CRUD.Product;
using GoTaskServicePlus.Services.Product.CRUD.Products.UtilSearch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.Product.CRUD.Products
{
    public class ProductService : IProductService
    {

        private readonly ISqlModelProduct<tblProduct> _CrudService;
        private readonly IProducSearch _IProducSearch;
        private IJWTAutentication _jwt;

        public List<ConceptProduct> ListFilterProduct { get; set; }
        public List<SearchFilter> SearchList { get ; set ; }

        public ProductService(ISqlModelProduct<tblProduct> _CrudService, IProducSearch _IProducSearch, IJWTAutentication _jwt)
        {
            this._CrudService = _CrudService;
            this._IProducSearch = _IProducSearch;
            this._jwt = _jwt;
        }

        public async Task<Response<tblProduct>> Save(tblProduct data)
        {
            List<Guid> list = new List<Guid>();

            var response = await ProductUtil.ValidationSaveProduct(data);
            var listPC = (from i in data.ImgList select i.url).ToList();
            var listPhone = (from i in data.ImgList select i.url.Replace("PHONE", "PC")).ToList();
            list = (from g in data.ImgList select g.Id).ToList();

            var result = await _CrudService.Save(response.Data);

            ConceptFilter config = new ConceptFilter()
            {
                IdCompany = data.IdCompany,
                IdProject = data.IdProject,
            };

            var files = await SelectedImg(list, config, data.Id);
            return result;
        }
        public async Task<Response<tblProduct>> Delete(ConceptFilter config, Guid id)
        {
            var result = await _CrudService.Delete(config, id);
            return result;
        }
        public async Task<Response<tblProduct>> Get(ConceptFilter config, Guid id)
        {
            var result = await _CrudService.Get(config, id);
            return result;
        }

        public async Task<Response<ImgItem>> GetImgByUrl(ConceptFilter config, string url)
        {
            var result = await _CrudService.GetImgByUrl(config, url);
            return result;
        }

        public async Task<Response<tblProduct>> Update(tblProduct data)
        {
            List<Guid> list = new List<Guid>();
            var response = await ProductUtil.ValidationSaveProduct(data);

            var listPC = (from i in data.ImgList where i.url.Contains("PC") select i.url).ToList();
            var listPhone = (from i in data.ImgList select i.url.Replace("PHONE", "PC")).ToList();
            list = (from g in data.ImgList where g.url.Contains("PC") select g.Id).ToList();

            ConceptFilter config = new ConceptFilter()
            {
                IdProject = data.IdProject,
                IdCompany = data.IdCompany,
            };

            var files = await SelectedImg(list, config, data.Id);
            var result = await _CrudService.Update(response.Data);
            return result;
        }

       

        public async Task<Response<ImgItem>> SelectedImg(List<Guid> listImg, ConceptFilter config, Guid refer)
        {
            return await _CrudService.SelectedImg(listImg, config, refer);
        }

        public Task<Response<ImgItem>> SaveNameImg(List<ImgItem> img)
        {
            return _CrudService.SaveImg(img);
        }

        public async Task<Response<ImgItem>> UpdateByUrl( ConceptFilter config, ImgItem image)
        {
            return await _CrudService.UpdateImgByName(config, image);
        }

        public Task<Response<List<ImgItem>>> GeImagesByCompanyId(ConceptFilter config, string filter, int page)
        {
            return _CrudService.GeImagesByCompanyId(config, filter);
        }

        public async Task<Response<List<tblProduct>>> GetAll(ConceptFilter config,  Guid typeId, int page,string filter = "all")
        {
            var listFilter = new List<Guid>();
            var filterResult = new List<tblProduct>();
            var listProduct = new List<tblProduct>();
            var response = new Response<List<tblProduct>>();

            filter = filter.Replace("-", " ").Trim();

            var data = await _CrudService.GetFilterByName(config, new tblProduct { Name = filter, IdTypeOfProduct = typeId }, page, 10);

            if (data != null && data.Status)
            {
                response.Data = data.Data;
                response.Status = true;
            }
           

            return response;
        }

        public Task<Response<tblProduct>> GetFilter(ConceptFilter config)
        {
            throw new NotImplementedException();
        }
    }


}
