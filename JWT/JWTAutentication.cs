using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using GoTaskServicePlus.Interfaces.Security;
using GoTaskServicePlus.Model.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Utility.General;




namespace JWT
{
    public class JWTAutentication : IJWTAutentication
    {
        IConfiguration IConfig;
        public JWTAutentication(IConfiguration _Config) { IConfig = _Config; }

        public string GetJws(List<Claim> Calims, DateTime DateExpires)
        {
            //AutenticationModel d = new AutenticationModel();


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(IConfig.GetSection("keyJws:secret").Value));
            var KeyCredential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var SecurityToken = new JwtSecurityToken(
                claims: Calims,
                expires: DateExpires,
                signingCredentials: KeyCredential
                );
            string token = new JwtSecurityTokenHandler().WriteToken(SecurityToken);
            var t = GetJwsClaim(token);
            return token;
        }

        public List<Claim> GetJwsClaim(string token)
        {
            var handler = new JwtSecurityTokenHandler();

            try
            {
                var tokenS = handler.ReadToken(token) as JwtSecurityToken;

                if (tokenS == null)
                {
                    return null;
                }
                return tokenS.Claims.ToList();
            }
            catch (Exception ex)
            {

                throw;
            }


            return null;
        }

        public (string bearer, List<Claim> claim) ValidateExpireJwt(string token, DateTime dateExpires)
        {
            var listClaim = new List<Claim>();
            if (token != null && token != "")
            {
                listClaim = GetJwsClaim(token.Replace("Bearer", "").Replace(" ", ""));

                if (listClaim != null)
                {
                    var DateExpires = listClaim.FirstOrDefault(s => s.Type == ClaimTypes.Expiration.ToString());
                    var date = Config.GetDateTimeToday();
                    if (Config.GetParseDate(DateExpires.Value) > date)
                    {
                        var result = GetJws(listClaim, dateExpires);
                        return (result, listClaim);
                    }
                    return (null, null);
                }
            }

            return (null, null);

        }

    }
}