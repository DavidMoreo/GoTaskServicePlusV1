using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Services.KeyValidation;
using GoTaskServicePlus.Services.LoginService.Interfaces;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static GoTaskServiceplus.Client.Model.Security.tblUser;

namespace GoTaskServicePlus.Services.LoginService.Validation
{
    public class UserValidationUser : IUserValidationUser
    {
        private IKeyValidation _INotification;


        public UserValidationUser(IKeyValidation _INotification)
        {
            this._INotification = _INotification;
        }

        public Task<tblUser> ValidateLogin(tblUser user, string password)
        {
            var passwordDecrypt = _INotification.Decrypt(user.Password, password);


            if (user==null || passwordDecrypt != password)    
            {
                user = null; 
            }else if (user != null)
            {
                user.Password = "";
                user.KeyPassword = "";
            }
            return Task.FromResult(user);
        }

        public Task<(tblUser user, MsgResponse msgPublic, bool status)> ValidateUser(tblUser user, TypeValidateUser typeUser)
        {
            MsgResponse msg = new MsgResponse()
            {
                Id = Guid.NewGuid(),
            };
            bool status = true;

            if (user != null)
            {
                if (user.Id == Config.GuidEmpty) { user.Id = Guid.NewGuid(); }
                if (user.ConceptCompany == null) { status = false; msg.Msg = $"{nameof(user.ConceptCompany)} required"; }
                if (user.ConceptProject == null) { status = false; msg.Msg = $"{nameof(user.ConceptProject)} required"; }
                if (user.ConceptCompany.Id == Config.GuidEmpty) { status = false; msg.Msg = $"{nameof(user.ConceptCompany)} required"; }
                if (user.ConceptProject.Id == Config.GuidEmpty) { status = false; msg.Msg = $"{nameof(user.ConceptProject)} required"; }
                if (user.Name == string.Empty) { status = false; msg.Msg = $"{nameof(user.Name)} required"; }
                if (user.Email == null ) { status = false; msg.Msg = $"{nameof(user.Email)} required"; }
                if (user.Password == null ) { status = false; msg.Msg = $"{nameof(user.Password)} required"; }
                if (user.Code == string.Empty ) { user.Code = user.Name; }
                if (user.MobileNumber == string.Empty ) { user.MobileNumber = ""; }               
                if (user.KeyPassword == null ) { user.KeyPassword = ""; }
                if (user.RolUser == null || user.RolUser.Count<=0) { status = false; msg.Msg = $"{nameof(user.RolUser)} required"; }
                if (user.EditDate == string.Empty ) { user.EditDate = Config.GetDateTodayString(); }
                if (user.CreationDate == string.Empty ) { user.CreationDate = Config.GetDateTodayString(); }
                if (user.AddressList == null ) { user.AddressList = new List<GoTaskServiceplus.Client.Model.Comon.tblConcepValue>(); }

                if (TypeValidateUser.Save == typeUser)
                {
                    if (user.Password == string.Empty) { status = false; msg.Msg = $"{nameof(user.Password)} required"; }
                }
            }

            return Task.FromResult((user, msg, status));
        }

       
    }
}
