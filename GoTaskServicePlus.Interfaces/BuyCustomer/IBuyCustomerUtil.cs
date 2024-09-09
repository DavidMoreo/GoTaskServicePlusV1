using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.BuyCustomer
{
    public interface IBuyCustomerUtil
    {
        public Task<string> SendNotificationCodeVerificatione(string number);
        public Task SendNotificationInfoPurchase(ConceptFilter concept, tblBuyerCustomer buyList);
        public Task SendNotificationCustomerPurchaseAsync(ConceptFilter concept, List<tblBuyerCustomer> buyList);
        public Task SendNotificationBuyCancel(string text);
    }
}
