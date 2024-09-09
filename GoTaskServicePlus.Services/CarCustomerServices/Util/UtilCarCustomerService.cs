using GoTaskServicePlus.Interfaces.CarCustomer.Util;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Services.CarCustomerServi.Util
{
    public class UtilCarCustomerService : IUtilCarCustomerService
    {

        public async Task<tblBuyerCustomer> ConvertProductToBuy(tblBuyerCustomerConcept purcharse)
        {
            var purcharseTemp = new tblBuyerCustomer();
            purcharseTemp.Id = purcharse.Product.Id;
            purcharseTemp.IdCompany = purcharse.Product.IdCompany;
            purcharseTemp.IdProject = purcharse.Product.Id;
            purcharseTemp.Name = purcharse.Product.Name;

            return purcharseTemp;
        }

    }
}
