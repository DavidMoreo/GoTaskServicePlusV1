using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.FavoriteCustomer.Util
{
    public interface IUtilFavoriteCustomerService
    {
        public  Task<tblBuyerCustomer> ConvertProductToBuy(tblBuyerCustomerConcept purcharse);
    }
}
