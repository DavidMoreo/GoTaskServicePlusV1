using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.BD.SqlServer
{
    public interface ISqlModel<T> : ISqlModelBasic<T>
    {
        public Task<Response<T>> Get(ConceptFilter config, Guid id);
        public Task<Response<T>> Get(ConceptFilter config, string filter);     

    }

    public interface ISqlModelBasic<T>
    {
      
        public Task<Response<T>> Delete(ConceptFilter config, Guid id);
        public Task<Response<T>> Update(T data);
        public Task<Response<T>> Save(T data);

    }


    


}
