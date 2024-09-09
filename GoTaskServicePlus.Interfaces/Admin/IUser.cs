using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Admin
{
    public interface IUser 
    {
        public List<CounterUser> CounterUsers { get; set; }
        Task<Response<List<tblUser>>> GetAllByIdProjet(ConceptFilter config,int page);
        Task<Response<List<tblUser>>> GetAllByIdCompny(ConceptFilter config,int page);
        Task<Response<tblUser>> Delete(ConceptFilter config, Guid id);
        Task<Response<tblUser>> Get(ConceptFilter config, Guid id);
        Task<Response<tblUser>> Save(tblUser data);
        Task<Response<tblUser>> Update(tblUser data);
   

    }
}
