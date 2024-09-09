using GoTaskServiceplus.Client.Model.Comon;
using GoTaskServiceplus.Client.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoTaskServicePlus.Model.Structure
{

    //Para crear una compra
    public class tblBuyerCustomerConcept
    {
        public int Quantity { get; set; }
        public tblProduct Product { get; set; }
    }


    public class tblBuyerCustomer : Info
    {
        public Guid UserId { get; set; }
        public Guid IdProduct { get; set; }
        public Guid PurchareId { get; set; }
        public int Quantity { get; set; }
        public decimal SalePrice { get; set; }
        public decimal PurchasePrice { get; set; }
        public string StatusMovementItem { get; set; }
        public string MovementConceptTypeItem{ get; set; }
        public string Ico { get; set; }
        public string NumberPurchase { get; set; }
        public virtual ConceptUser User { get; set; }
        public virtual ConceptProject Project { get; set; }

    }

    public  class StatusMovement
    {
        public static string PurchaseGenerated { get { return "PurchaseGenerated"; } }        
        public static string PurchaseCancelled { get { return "PurchaseCancelled"; }  }        
        public static string PurchaseCancelledByCustomer { get { return "PurchaseCancelledByCustomer"; }  }        
        public static string PurchaseCancelledByVendor { get { return "PurchaseCancelledByVendor"; }  }        
        public static string PurchaseCancelledByAdmin { get { return "PurchaseCancelledByAdmin"; }  }        
        public static string PurchaseInProcess { get { return "PurchaseInProcess"; } }        
        public static string PurchaseInDelivery { get { return "PurchaseInDelivery"; } }        
        public static string PurchaseCompleted { get { return "PurchaseCompleted"; } }
        public static string CartActive { get { return "CartActive"; } }
        public static string CartSaveTemp { get { return "CartActive"; } }
        public static string FavoriteActive { get { return "FavoriteActive"; } }
    }


    public class MovementConceptType
    {
        public static string Purchase { get { return "Purchase"; } }      
        public static string CarOfPurchase { get { return "CarOfPurchase"; } }      
        public static string Favorite { get { return "Favorite"; } }    
    }


    public class CountBuyerCustomer 
    {
       
        public int QuantityCancelByVendor { get; set; }
        public int QuantityCancelByAdmin { get; set; }
        public int QuantityCancelByCustomer { get; set; }
        public int QuantityGenerate { get; set; }
        public int QuantityProcess { get; set; }
        public int QuantityDelivery { get; set; }
        public int QuantityCompleted { get; set; }
       

    }

}
