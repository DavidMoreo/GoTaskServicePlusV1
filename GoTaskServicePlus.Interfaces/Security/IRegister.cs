using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Security
{
    public interface IRegister
    {
        public Task<Response<tblUser>> SaveRegister(tblUser item);
        public Task<Response<tblUser>> DeleteRegister(Guid Id);
        public Task<Response<tblUser>> UpdateRegister(tblUser user);
        public Task<Response<tblUser>> GetRegister(Guid Id);
        public Task<Response<tblUser>> GetRegister(string name);
        public Task<Response<tblUser>> GetRegisterByCompany(Guid IdCompany);
        public Task<Response<tblUser>> GetRegisterByProject(Guid IdProject);

    }
}
