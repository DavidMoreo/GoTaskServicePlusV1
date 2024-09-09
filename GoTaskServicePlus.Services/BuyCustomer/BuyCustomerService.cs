using GoTaskServicePlus.Entities.Company;
using GoTaskServicePlus.Interfaces.BD.SqlServer;
using GoTaskServicePlus.Interfaces.BuyCustomer;
using GoTaskServicePlus.Interfaces.CarCustomers;
using GoTaskServicePlus.Interfaces.Products;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using static GoTaskServicePlus.Model.Structure.tblPurchaseTracking;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GoTaskServicePlus.Services.BuyCustomer
{
    public class BuyCustomerService : IBuyCustomer
    {

        private ISqlModelBuyCutomer<tblBuyerCustomer> _BuyerCustomer;
        private IProductService _ProductService;
        private ICartCustomer _ICartCustomer;

        public BuyCustomerService(ISqlModelBuyCutomer<tblBuyerCustomer> _BuyerCustomer, IProductService _ProductService, ICartCustomer _ICartCustomer)
        {
            this._BuyerCustomer = _BuyerCustomer;
            this._ProductService = _ProductService;
            this._ICartCustomer = _ICartCustomer;
        }

        public Task<Response<tblBuyerCustomer>> CancelBuy(ConceptFilter config, string movementTypeItem, Guid id)
        {
            return _BuyerCustomer.UpdateBuyMovementTypeItem(config, movementTypeItem, id);
        }

        public Task<Response<tblBuyerCustomer>> CancelAdminBuy(ConceptFilter config, string movementTypeItem, Guid id)
        {
            return _BuyerCustomer.UpdateAdminBuyMovementTypeItem(config, movementTypeItem, id);
        }

        public Task<Response<tblBuyerCustomer>> Delete(ConceptFilter config, Guid id)
        {
            return _BuyerCustomer.Delete(config, id);
        }

        public Task<Response<tblBuyerCustomer>> Get(ConceptFilter config, Guid id)
        {
            return _BuyerCustomer.Get(config, id);
        }

        public Task<Response<List<tblBuyerCustomer>>> GetAllByCompany(ConceptFilter config, int page)
        {
            throw new NotImplementedException();
        }

        public Task<Response<List<tblBuyerCustomer>>> GetAllByCustomer(ConceptFilter concept, int page)
        {
            return _BuyerCustomer.GetAllByCustomer(concept);
        }

        public Task<Response<List<tblBuyerCustomer>>> GetAllByProject(ConceptFilter config, int page, string filter)
        {
            throw new NotImplementedException();
        }

        public Task<Response<List<tblBuyerCustomer>>> GetAllStatus(ConceptFilter config, string movementTypeItem, int page)
        {
            return _BuyerCustomer.GetAllByStatus(config, movementTypeItem);
        }

        public Task<Response<CountBuyerCustomer>> GetCountByStatusAdmin(ConceptFilter config)
        {
            return _BuyerCustomer.GetCountByStatusAdmin(config);
        }

        public async Task<Response<List<tblBuyerCustomer>>> Save(ConceptFilter config)
        {
            var purchase = new Response<List<tblBuyerCustomer>>();
            var purchaseTemp = new Response<List<tblBuyerCustomer>>();
            purchaseTemp.Data = new List<tblBuyerCustomer>();
            var listProduct = new List<tblProduct>();
            purchaseTemp.Msg = new List<MsgResponse>();

            var idPurchase = Config.NewGuid;

            purchase = await _ICartCustomer.GetAllByUserCustomer(config, StatusMovement.CartActive, 0);


            foreach (var product in purchase.Data)
            {
                var idCartDelete = product.Id;
                product.Id = Config.NewGuid;
                product.PurchareId = idPurchase;


                var buyTemp = new UtilBuyCustomer(product);
                var dataBuy = await _BuyerCustomer.Save(buyTemp.BuyCustomer);
                if (dataBuy.Status)
                {
           
                    purchaseTemp.Data.Add(product);
                    _ICartCustomer.DeleteCustomer(config, idCartDelete);
                }
                else
                {
                    purchaseTemp.Msg.Add( new MsgResponse { Msg = $"Este producto no se pudo gurdar en la compra {product.Name}" });
                }
            }

             return purchaseTemp;   
        }

        public Task<Response<tblBuyerCustomer>> Update(tblBuyerCustomer data)
        {
            throw new NotImplementedException();
        }
    }
}
