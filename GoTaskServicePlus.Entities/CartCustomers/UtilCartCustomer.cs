
using CloudinaryDotNet.Actions;
using GoTaskServicePlus.Entities.UtilNameConcepts;
using GoTaskServicePlus.Model.Comon;
using GoTaskServicePlus.Model.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility.General;
using GoTaskServiceplus.Client.Model.Comon;


namespace GoTaskServicePlus.Entities.CartCustomer
{
    public class UtilCartCustomer : tblBuyerCustomer
    {
        public tblBuyerCustomer BuyCustomer { get; set; }
        public UtilCartCustomer( ConceptFilter concept,tblBuyerCustomerConcept buy)
        {
            BuyCustomer = new tblBuyerCustomer()
            {
                Id = Id== Config.GuidEmpty? Config.NewGuid:Id,
                IdCompany = buy.Product.IdCompany,
                IdProject = buy.Product.IdProject,
                IdProduct = buy.Product.Id,
                SalePrice = Null<decimal>.GetNull(buy.Product.ActualPrice),
                PurchasePrice = Null<decimal>.GetNull(buy.Product.ActualPrice),  
                UserId = concept.IdUser,
                Code = buy.Product.Code,
                Name = buy.Product.Name,
                PurchareId  = Config.GuidEmpty,
                ConceptCompany = buy.Product.ConceptCompany,
                ConceptPrevious = buy.Product.ConceptProject,
                ConceptProject = buy.Product.ConceptPrevious,
                CreationDate = Config.GetDateTodayString(),                
                EditDate = EditDate ==""? Config.GetDateTodayString(): EditDate,
                StatusMovementItem = StatusMovement.CartActive,
                MovementConceptTypeItem = MovementConceptType.CarOfPurchase,
                Quantity = buy.Quantity,
                Ico = buy.Product.FirsImg.url,  
                InUse = false,  
                Disable = false,  
            };
        }

    

        internal Guid GetId(Guid? _id)
        {
            if (_id != null)
            {
                this.Id = _id.Value;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

        internal Guid GetId(Guid _id)
        {
            if (_id != Config.GuidEmpty)
            {
                this.Id = _id;
            }
            else
            {
                throw new NotImplementedException();
            }
            return this.Id;
        }

        internal Guid GetIdEmpty(Guid _id)
        {
            if (_id != Config.GuidEmpty)
            {
                this.Id = _id;
            }
            else
            {
                return Config.NewGuid ;
            }
            return this.Id;
        }



    }
}
