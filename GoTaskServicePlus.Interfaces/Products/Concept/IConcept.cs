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
    public interface IConcept
    {

        public Task<Response<tblConcepValue>> Get(ConceptFilter config,Guid id);
        public Task<Response<tblConcepValue>> GetByName(ConceptFilter config,string name);
        public Task<Response<List<tblConcepValue>>> GetAllConceptValue(ConceptFilter config,string typeConcept,int page, string filter ="all");
        public Task<Response<List<tblConcepValue>>> GetAllConceptByIdCompany(ConceptFilter config,string typeConcept,int page, string filter ="all");
        public Task<Response<List<tblConcepValue>>> GetAllConceptByCountry(ConceptFilter config,string typeConcept,string countryId);
        public Task<Response<tblConcepValue>> Update(tblConcepValue data);
        public Task<Response<tblConcepValue>> Delete(ConceptFilter config,Guid id);
        public Task<Response<tblConcepValue>> Save(tblConcepValue data);
      



    }
}
