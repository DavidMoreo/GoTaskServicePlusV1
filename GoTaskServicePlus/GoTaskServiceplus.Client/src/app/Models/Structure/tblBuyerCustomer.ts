import { ConceptProject } from "../Admin/Admin";
import { Concept, tblConcepValue, tblProduct } from "./tblProduct";



export class tblBuyerCustomerConcept {
  public quantity: number;
  public product: tblProduct;
}



export class tblBuyerCustomer extends Concept {
  public userId: string;
  public purchareId: string;
  public idProduct: string;
  public quantity: number;
  public salePrice: number;
  public purchasePrice: number;
  public statusMovementItem: string;
  public movementConceptTypeItem: string;
  public ico: string;
  public numberPurchase: string;  
  public user: ConceptUser;
  public project: ConceptProject;
}


export class ConceptUser {
  name: string;
  mobileNumber: string;
}

export class MovementType {
  public purchaseGenerated: string = "PurchaseGenerated";
  public purchaseCancelled: string = "PurchaseCancelled";
  public purchaseCancelledByCustomer: string = "PurchaseCancelledByCustomer";
  public purchaseCancelledByVendor: string = "PurchaseCancelledByVendor";
  public purchaseCancelledByAdmin: string = "PurchaseCancelledByAdmin";
  public purchaseInProcess: string = "PurchaseInProcess";
  public purchaseInDelivery: string = "PurchaseInDelivery";
  public purchaseCompleted: string = "PurchaseCompleted";

  public cartActive: string = "CartActive";
  public cartSaveTemp: string = "CartSaveTemp";
  public favoriteActive: string = "FavoriteActive";
}


export class MovementConceptType {

  public purchase: string = "Purchase";
  public carOfPurchase: string = "CarOfPurchase";
  public favorite: string = "Favorite";
}




export class CountStatusBuys {
  quantityCancelByVendor: number;
  quantityCancelByAdmin: number;
  quantityCancelByCustomer: number;
  quantityGenerate: number;
  quantityProcess: number;
  quantityDelivery: number;
  quantityCompleted: number;
}

