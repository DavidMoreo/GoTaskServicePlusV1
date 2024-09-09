using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.CarCustomers;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.CarCustomerServices
{
    public class CartCustomerService : ICartCustomer
    {

        private ISqlModelCarCutomer<tblBuyerCustomer> _CartCustomer;


        public CartCustomerService(ISqlModelCarCutomer<tblBuyerCustomer> _CarCustomer)
        {
            this._CartCustomer = _CarCustomer;

        }



        public Task<Response<tblBuyerCustomer>> AddCustomer(ConceptFilter concept, tblBuyerCustomer data)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<tblBuyerCustomer>> DeleteCustomer(ConceptFilter concept, Guid id)
        {
            return await _CartCustomer.Delete(concept, id);
        }

        public async Task<Response<List<tblBuyerCustomer>>> GetAllByUserCustomer(ConceptFilter concept, string statusMovement,int page)
        {
            return await _CartCustomer.GetAllByUserCarCustomer(concept, statusMovement);
        }

        public async Task<Response<tblBuyerCustomer>> SaveCustomer(ConceptFilter concept, tblBuyerCustomer data)
        {
           return await _CartCustomer.Save(data);
        }
    }
}
