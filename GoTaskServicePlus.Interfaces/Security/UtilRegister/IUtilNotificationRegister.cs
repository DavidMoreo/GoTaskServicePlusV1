using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.BuyCustomer
{
    public interface IUtilNotificationRegister
    {
        public Task<string> SendNotificationCodeVerificatione(string number);
        public Task SendNotificationRegister(string number);
    
   
    }

}
