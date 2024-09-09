using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;

namespace GoTaskServicePlus.Services.Security
{
    public class AutorizacionService : IAutorizacionService
    {

        private IJWTAutentication _jwt;


        public AutorizacionService(IJWTAutentication _jwt)
        {
            this._jwt = _jwt;
        }



        public AutorizationUser Autorization(string token, string ip)
        {
            var autorizationUser = new AutorizationUser();          
            var dateExpires = Config.GetDateTimeToday().AddMinutes(Config.ExpiresTokenMinute);
            var autorization = _jwt.ValidateExpireJwt(token, dateExpires);

            if (autorization.bearer != null)
            {

                var ipAddress = ip;
                autorizationUser.IpCutomer = ipAddress?.ToString();

                var idProject = autorization.claim.FirstOrDefault(s => s.Type == "idProject");
                autorizationUser.IdProject = idProject != null ? Guid.Parse(idProject.Value) : Guid.Empty;

                var idCompany = autorization.claim.FirstOrDefault(s => s.Type == "idCompany");
                autorizationUser.IdCompany = idCompany != null ? Guid.Parse(idCompany.Value) : Guid.Empty;

                var campanyName = autorization.claim.FirstOrDefault(s => s.Type == "NameCompany");
                autorizationUser.NameCompany = campanyName != null ? campanyName.Value : string.Empty;

                var projectName = autorization.claim.FirstOrDefault(s => s.Type == "NameProject");
                autorizationUser.NameProject = projectName != null ? projectName.Value : string.Empty;
                autorizationUser.Bearer = autorization.bearer;
            }

            return autorizationUser;
        }
    }
}
