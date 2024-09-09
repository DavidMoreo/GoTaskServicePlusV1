using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.CarCustomers
{
    public interface ICartCustomer
    {

        public Task<Response<tblBuyerCustomer>> AddCustomer(ConceptFilter concept, tblBuyerCustomer data);
        public Task<Response<tblBuyerCustomer>> SaveCustomer(ConceptFilter concept, tblBuyerCustomer data);   // Se desactiva    
        public Task<Response<tblBuyerCustomer>> DeleteCustomer(ConceptFilter concept, Guid id);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByUserCustomer(ConceptFilter concept, string statusMovement,int page);
    }
}
