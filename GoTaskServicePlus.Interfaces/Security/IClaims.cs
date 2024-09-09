using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GoTaskServiceplus.Client.Model.Security;
using GoTaskServicePlus.Model.Security;

namespace GoTaskServicePlus.Interfaces
{
    public interface IClaims
    {
        public (List<Claim> list, bool status, string error ) GetClaimsUser(tblUser user, DateTime expires, bool refresh);
        public AutorizationUser  GetAutorizationUser(List<Claim> list);
      
    }
}