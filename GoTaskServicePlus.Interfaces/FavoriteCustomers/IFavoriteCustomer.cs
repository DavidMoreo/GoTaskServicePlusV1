using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.FavoriteCustomers
{
    public interface IFavoriteCustomer
    {
        public Task<Response<tblBuyerCustomer>> AddFavoriteCustomer(ConceptFilter concept, tblBuyerCustomer data);
        public Task<Response<tblBuyerCustomer>> SaveFavoriteCustomer(ConceptFilter concept, tblBuyerCustomer data);   // Se desactiva    
        public Task<Response<tblBuyerCustomer>> DeleteFavoriteCustomer(ConceptFilter concept, Guid id);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByUserFavoriteCustomer(ConceptFilter concept, string statusMovement,int page);
    }
}
