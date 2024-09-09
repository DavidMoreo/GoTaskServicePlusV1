using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Interfaces.BuyCustomer
{
    public interface IBuyCustomer
    {
        public Task<Response<List<tblBuyerCustomer>>> GetAllByProject(ConceptFilter config, int page, string filter);
        public Task<Response<List<tblBuyerCustomer>>> GetAllStatus(ConceptFilter config, string movementTypeItem, int page);
        public Task<Response<CountBuyerCustomer>> GetCountByStatusAdmin(ConceptFilter config);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByCustomer(ConceptFilter concept,int page);
        public Task<Response<List<tblBuyerCustomer>>> GetAllByCompany(ConceptFilter config, int page);
        public Task<Response<tblBuyerCustomer>> Get(ConceptFilter config, Guid id);
        public Task<Response<tblBuyerCustomer>> Delete(ConceptFilter config, Guid id);
        public Task<Response<tblBuyerCustomer>> CancelAdminBuy(ConceptFilter config,string movementTypeItem, Guid id);
        public Task<Response<tblBuyerCustomer>> CancelBuy(ConceptFilter config,string movementTypeItem, Guid id);
        public Task<Response<tblBuyerCustomer>> Update(tblBuyerCustomer data);
        public Task<Response<List<tblBuyerCustomer>>> Save(ConceptFilter config);
    }
}
