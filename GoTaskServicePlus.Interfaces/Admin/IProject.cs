using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Admin
{
    public  interface IProject
    {
        public Task<Response<tblProject>> Save(tblProject data);
        public Task<Response<tblProject>> Update(tblProject data);
        public Task<Response<tblProject>> Get(ConceptFilter config, Guid id);
        public Task<Response<tblConcepValue>> GetAddressProject(Guid idProject);
        public Task<Response<tblProject>> Get(ConceptFilter config, string name);
        public Task<Response<tblProject>> Delete(ConceptFilter config, Guid id);
        public Task<Response<List<tblProject>>> GetAll(ConceptFilter config, string filter, int page);
        public Task<Response<List<tblProject>>> GetAllAdmin(ConceptFilter config, string filter, int page);
        public Task<Response<List<tblProject>>> GetAllByCompany(ConceptFilter config, int page);
       
    }
}
