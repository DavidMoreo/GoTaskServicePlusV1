using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Statistics;
using GoTaskServicePlus.Model.Structure;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Products
{
    public interface IProductService 
    {
        
        public Task<Response<List<tblProduct>>> GetAll(ConceptFilter config, Guid typeId, int page, string filter);
       
        public Task<Response<tblProduct>> Get(ConceptFilter config, Guid id);

        public Task<Response<tblProduct>> Update(tblProduct data);
        public Task<Response<tblProduct>> Delete(ConceptFilter config, Guid id);
        public Task<Response<tblProduct>> Save(tblProduct data);
        public Task<Response<ImgItem>> SaveNameImg(List<ImgItem> img);

        public Task<Response<ImgItem>> GetImgByUrl(ConceptFilter config, string url);
        public Task<Response<ImgItem>> SelectedImg(List<Guid> listImg, ConceptFilter config, Guid idrefer);
        public Task<Response<ImgItem>> UpdateByUrl(ConceptFilter config,ImgItem image);
        public Task<Response<List<ImgItem>>> GeImagesByCompanyId(ConceptFilter config, string filter,int page);

    }
}
