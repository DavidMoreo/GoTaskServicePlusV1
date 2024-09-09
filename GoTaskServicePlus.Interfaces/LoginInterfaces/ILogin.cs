using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;

namespace GoTaskServicePlus.Interfaces
{
    public interface ILogin

    {
        public Task<Response<tblUser>> Get(string email, string password);
        public Task<Response<tblUser>> ChangedKeyPassword(string number);
        public Task<Response<bool>> ChangePassword(string email, string password,string code);
        public Task<Response<tblUser>> GetEmail(string email);
        public Task<Response<tblUser>> UpdateUser(tblUser user);

        public Task<Response<tblUser>> GetByKey(tblUser user);

    }
}
