using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.CarCustomer.Util
{
    public interface IUtilCarCustomerService 
    {
        public  Task<tblBuyerCustomer> ConvertProductToBuy(tblBuyerCustomerConcept purcharse);
    }
}
