using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Security
{
    public interface IJWTAutentication 
    {
        public string GetJws(List<Claim> Calims, DateTime date);
        public List<Claim> GetJwsClaim(string token);
        public (string bearer, List<Claim> claim) ValidateExpireJwt(string token,DateTime date  );
    }
}
