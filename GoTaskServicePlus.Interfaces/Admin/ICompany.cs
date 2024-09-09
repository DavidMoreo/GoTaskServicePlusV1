using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Admin
{
    public  interface ICompany : ISqlModel<tblCompany>
    {
        public Task<Response<tblCompany>> Save(tblCompany data);
        public Task<Response<tblCompany>> Update(tblCompany data);        
        public Task<Response<List<tblCompany>>> GetAll(ConceptFilter config, string filter, int page);
        public Task<Response<List<tblCompany>>> GetAllAdmin(ConceptFilter config, string filter, int page);
       
    }
}
