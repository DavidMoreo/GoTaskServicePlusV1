using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Admin
{
    public interface IRolUser
    {
        Task<Response<tblRol>> Delete(ConceptFilter config, Guid id);
        Task<Response<List<tblRol>>> GetAllByProject(ConceptFilter config,int page, string filter = "all");
        Task<Response<tblRol>> Get(ConceptFilter config, Guid id);
        Task<Response<List<tblRol>>> GetRolByRol(ConceptFilter config);
        Task<Response<tblRol>> Get(ConceptFilter config, string filter);
        Task<Response<tblRol>> Save(tblRol data);
        Task<Response<tblRol>> Update(tblRol data);
    }
}
