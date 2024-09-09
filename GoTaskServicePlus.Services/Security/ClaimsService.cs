
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Interfaces;
using GoTaskServicePlus.Model.Security;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Security.Claims;
using Utility.General;


namespace GoTaskServicePlus.Services.Security
{
    public class ClaimsService : IClaims
    {
        public AutorizationUser GetAutorizationUser(List<Claim> claim)
        {
            var autorizationUser = new AutorizationUser();

            if (claim != null)
            {

                var idProject = claim.FirstOrDefault(s => s.Type == nameof(tblUser.IdProject));
                autorizationUser.IdProject = idProject != null ? Guid.Parse(idProject.Value) : Guid.Empty;

                var idCompany = claim.FirstOrDefault(s => s.Type == nameof(tblUser.IdCompany));
                autorizationUser.IdCompany = idCompany != null ? Guid.Parse(idCompany.Value) : Guid.Empty;

                var campanyName = claim.FirstOrDefault(s => s.Type == "NameCompany");
                autorizationUser.NameCompany = campanyName != null ? campanyName.Value : string.Empty;

                var projectName = claim.FirstOrDefault(s => s.Type == "NameProject");
                autorizationUser.NameProject = projectName != null ? projectName.Value : string.Empty;

                var idUser = claim.FirstOrDefault(s => s.Type == nameof(tblUser.Id));
                autorizationUser.IdUser = idUser != null ? Config.GuidParse(idUser.Value) : Config.GuidEmpty;

                var mobileNumber = claim.FirstOrDefault(s => s.Type == nameof(tblUser.MobileNumber));
                autorizationUser.MobileNumber = mobileNumber != null ? mobileNumber.Value : "";

                var nameUser = claim.FirstOrDefault(s => s.Type == nameof(tblUser.Name));
                autorizationUser.NameUser = mobileNumber != null ? mobileNumber.Value : "";

                var rol = claim.FirstOrDefault(s => s.Type == nameof(tblUser.RolUser));
                autorizationUser.Rol = Null<List<tblRol>>.Get(rol.Value);
            }
            return autorizationUser;
           
        }

        public (List<Claim> list, bool status, string error) GetClaimsUser(tblUser user, DateTime expires, bool refresh = false)
        {
            List<Claim> claimList = new List<Claim>();
            claimList.Add(new Claim(ClaimTypes.Email, user.Email));
            claimList.Add(new Claim(ClaimTypes.Actor, Guid.NewGuid().ToString()));
            claimList.Add(new Claim(ClaimTypes.Expiration, Config.GetDateToString(expires)));
            claimList.Add(new Claim(nameof(tblUser.IdCompany), user.IdCompany.ToString()));
            claimList.Add(new Claim(nameof(tblUser.IdProject), user.IdProject.ToString()));
            claimList.Add(new Claim("NameCompany", user.ConceptCompany.Name.ToString()));
            claimList.Add(new Claim("NameProject", user.ConceptProject.Name.ToString()));
            claimList.Add(new Claim(nameof(tblUser.Id), user.Id.ToString()));
            claimList.Add(new Claim(nameof(tblUser.MobileNumber), user.MobileNumber));
            claimList.Add(new Claim(nameof(tblUser.Name), user.Name));
            claimList.Add(new Claim(nameof(tblUser.RolUser), Null<List<tblRol>>.Set(user.RolUser)));
            
          
            claimList.Add(new Claim("Refresh", refresh.ToString()));
            return (claimList, true, "");
        }

      
    }
}
