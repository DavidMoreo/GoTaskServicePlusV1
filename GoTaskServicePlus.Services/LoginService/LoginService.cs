using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.Notification;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Services.KeyValidation;
using GoTaskServicePlus.Services.LoginService.Interfaces;
using Utility.General;

namespace GoTaskServicePlus.Services.LoginService
{
    public class LoginService : ILogin
    {
        private ISqlModelLogin<tblUser> _Service;
        private IUserValidationUser _Validate;
        private IKeyValidation _INotification;

        public LoginService(ISqlModelLogin<tblUser> _Service, IUserValidationUser _Validate, IKeyValidation _INotification)
        {
            this._Service = _Service;
            this._Validate = _Validate;
            this._INotification = _INotification;
        }

        public async Task<Response<tblUser>> GetEmail(string email)
        {
            var obj = new Response<tblUser>();
            tblUser user = new tblUser();
            user.Email = email;
            var userResult = await _Service.GetByEmail(email);     


            return userResult;
        }

        public async Task<Response<tblUser>> Get(string email, string password)
        {

            var userResult = await _Service.GetByEmail(email);
            userResult.Data = await  _Validate.ValidateLogin(userResult.Data, password);

            return userResult;
        }

        public async Task<Response<bool>> ChangePassword(string email, string password, string code)
        {
            var response = new Response<bool>();
            var userResult = await _Service.GetByEmail(email);          
            response.Data = (userResult.Data.KeyPassword.ToUpper() == code.ToUpper());
            response.Status = (userResult.Data.KeyPassword.ToUpper() == code.ToUpper());

            if (response.Status)
            {
                userResult.Data.Password = password;    
                userResult.Data.KeyPassword = Config.NewGuid.ToString().Replace("-","");
                await _Service.UpdatePassword(userResult.Data);
            }

            return response;
        }


        public async Task<Response<tblUser>> UpdateUser(tblUser user)
        {
            var obj = new Response<tblUser>();
            var result = await _Validate.ValidateUser(user, tblUser.TypeValidateUser.Save);
            if (result.status)
            {
               await _Service.Update(user);
                obj.Data = result.user;
            }
            else
            {
                obj.Status = false;
            }
            return obj;
        }


      
        public Task<Response<tblUser>> GetByKey(tblUser user)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<tblUser>> ChangedKeyPassword(string number)
        {
            var userResult = await _Service.GetByMobileNumber(number);
            var data  = await _INotification.KeySendAsync(number);
            userResult.Data.KeyPassword = data.Data;
            var response = await _Service.UpdatePassword(userResult.Data);

            return response;
        }
    }
}


