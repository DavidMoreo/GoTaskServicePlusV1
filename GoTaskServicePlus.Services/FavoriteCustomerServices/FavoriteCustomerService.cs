using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.CarCustomers;
using GoTaskServicePlus.Interfaces.FavoriteCustomers;
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
    public class FavoriteCustomerService : IFavoriteCustomer
    {

        private ISqlModelFavoriteCutomer<tblBuyerCustomer> _FavoriteCustomer;


        public FavoriteCustomerService(ISqlModelFavoriteCutomer<tblBuyerCustomer> _FavoriteCustomer)
        {
            this._FavoriteCustomer = _FavoriteCustomer;
        }

        public Task<Response<tblBuyerCustomer>> AddFavoriteCustomer(ConceptFilter concept, tblBuyerCustomer data)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<tblBuyerCustomer>> DeleteFavoriteCustomer(ConceptFilter concept, Guid id)
        {
            return await _FavoriteCustomer.Delete(concept, id);
        }

        public async Task<Response<List<tblBuyerCustomer>>> GetAllByUserFavoriteCustomer(ConceptFilter concept, string statusMovement,int page)
        {
            return await _FavoriteCustomer.GetAllByUserFavoriteCustomer(concept, statusMovement);
        }

        public async Task<Response<tblBuyerCustomer>> SaveFavoriteCustomer(ConceptFilter concept, tblBuyerCustomer data)
        {
           return await _FavoriteCustomer.Save(data);
        }
    }
}
