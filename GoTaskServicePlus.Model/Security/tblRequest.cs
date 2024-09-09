using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Security
{
    public class tblRequest
    {
        public int Code { get; set; }
        public string KeyLogin { get; set; }
        public string KeyRefresh { get; set; }
        public string Msg { get; set; }
        public string Date { get; set; }
        public string NameCompany { get; set; }
        public string NameProject { get; set; }
        public string NameUser { get; set; }
    }

    public class login
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class ChangePassword
    {
        public string Password { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
    }
}
