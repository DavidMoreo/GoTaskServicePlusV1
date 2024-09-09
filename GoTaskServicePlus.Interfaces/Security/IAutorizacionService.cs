using GoTaskServicePlus.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Security
{
    public interface IAutorizacionService
    {
        public AutorizationUser Autorization(string token, string ip);
    }
}
