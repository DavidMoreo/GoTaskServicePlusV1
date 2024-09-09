
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


namespace GoTaskServicePlus.Entities.Company
{
    public class UtilBuyCustomer : tblBuyerCustomer
    {
        public tblBuyerCustomer BuyCustomer { get; set; }
        public UtilBuyCustomer( ConceptFilter concept,tblBuyerCustomerConcept buy, tblProduct product)
        {
            BuyCustomer = new tblBuyerCustomer()
            {
                Id = GetIdEmpty(concept.IdUser),
                IdCompany = product.IdCompany,
                IdProject = product.IdProject,
                SalePrice = Null<decimal>.GetNull(product.ActualPrice),
                PurchasePrice = Null<decimal>.GetNull(product.ActualPrice),  
                UserId = concept.IdUser,
                Code = product.Code,
                Name = product.Name,
                PurchareId  =  product.Id,
                ConceptCompany = product.ConceptCompany,
                ConceptPrevious = product.ConceptProject,
                ConceptProject = product.ConceptPrevious,
                CreationDate = Config.GetDateTodayString(),                
                EditDate = Config.GetDateTodayString(),
                StatusMovementItem = StatusMovement.PurchaseGenerated,
                MovementConceptTypeItem = MovementConceptType.Purchase,
                Quantity = buy.Quantity,
                Ico = product.FirsImg.url,  
                InUse = false,  
                Disable = false,  
            };
        }
        public UtilBuyCustomer(tblBuyerCustomer data)
        {           
            BuyCustomer = data;
            BuyCustomer.MovementConceptTypeItem = MovementConceptType.Purchase;
            BuyCustomer.StatusMovementItem = StatusMovement.PurchaseGenerated;
            BuyCustomer.EditDate = Config.GetDateTodayString();
            BuyCustomer.CreationDate = (BuyCustomer.CreationDate ==""? Config.GetDateTodayString(): BuyCustomer.CreationDate);
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
