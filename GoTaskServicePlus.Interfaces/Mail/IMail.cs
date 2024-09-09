using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.Mail
{
    public interface IMail
    {
        public  Task<Response<string>> SenrMail(MailContent mail);
    }
}
