using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static GoTaskServiceplus.Client.Model.Security.tblUser;


namespace GoTaskServicePlus.Services.LoginService.Interfaces
{
   public interface IUserValidationUser
    {
        Task<(tblUser user, MsgResponse msgPublic, bool status)> ValidateUser(tblUser user, TypeValidateUser typeUser);
        Task<tblUser> ValidateLogin(tblUser user, string password);



    }
}
