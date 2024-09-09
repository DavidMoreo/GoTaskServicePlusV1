using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Products.Concept
{
    public interface ITblReferProduct
    {
        public Task<Response<tblReferProduct>> Get(ConceptFilter config,Guid id);
        public Task<Response<List<tblReferProduct>>> GetAllConceptByCompany(ConceptFilter config);
        public Task<Response<List<tblReferProduct>>> GetByName(ConceptFilter config,string name, int page);       
        public Task<Response<tblReferProduct>> Update(tblReferProduct data);
        public Task<Response<tblReferProduct>> Delete(ConceptFilter config,Guid id);
        public Task<Response<tblReferProduct>> Save(tblReferProduct data);
    }
}
