using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.BD.SqlServer
{
    public interface ISqlSearch<T>
    {
  
        public  Task<Response<List<T>>> GetFilterByName(ConceptFilter concept,tblProduct product, int page,int pageSize );
        public Task<Response<List<tblProduct>>> CategoryOfProduct(ConceptFilter config);

        public  Task<Response<List<T>>> GetListFilter();
        public  Task<Response<List<T>>> GetListIAData();
        public Task<Response<List<T>>> GetListById(List<Guid> IdProducts);
        public Task<Response<List<ImgItem>>> GetListFirsImages(List<Guid> IdProducts);
        public List<T> ListFilter { get; set; }


    }
}
