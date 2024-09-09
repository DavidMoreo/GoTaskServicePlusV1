using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Product
{
    public interface IProducSearch
    {
        public  Task<Response<List<tblProduct>>> GetProducByName(ConceptFilter concept , string filter, Guid typeId, int page);

        public Task<Response<List<ConceptCategory>>> CategoryOfProduct(ConceptFilter config);

        public  Task<Response<List<tblProduct>>> GetProducByPartial(ConceptFilter concept,Guid typeId);

        public  Task<Response<List<tblProduct>>> GetListProductById( List<Guid> idProducts,int page);
        public  Task<Response<List<ImgItem>>> GetProducImageByName( string filter, Guid typeId);
        public Task<Response<List<tblProduct>>> GetListFavorite(List<Guid> list, int page);

    }
}
