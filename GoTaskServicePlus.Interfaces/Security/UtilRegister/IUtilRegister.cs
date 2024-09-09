using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Security.UtilRegister
{
    public interface IUtilRegister
    {
        Task<Response<tblCompany>> ValidateCompanyCustomer();
        Task<Response<tblProject>> ValidateProjectCustomer();

        Task<Response<tblCompany>> CreateCompanyCustomer();
        Task<Response<tblProject>> CreateProjectCustomer(Guid IdProject);

    }
}
