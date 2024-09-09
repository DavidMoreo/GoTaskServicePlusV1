import { Concept, ConceptProduct, NameConcept } from "../../Structure/tblProduct";




export class tblUser extends Concept {
  rolUser: Array<tblRol> = new Array<tblRol>;
  rolUserActive: tblRol = new tblRol;
  password: string="";
  keyPassword: string="";
  imgUrl: string="";
  email: string="";
  mobileNumber: string="";
  statusRegister: TypeStatusRegister = TypeStatusRegister.Defaul;
  listShoppingCart: Array<ConceptProduct> = new Array<ConceptProduct>;
  listFavorites: Array<ConceptProduct> = new Array<ConceptProduct>;
  addressList: Array<AddressData> = new Array<AddressData>;
  listMyLikes: Array<NameConcept> = new Array<NameConcept>;
}

export enum TypeStatusRegister {
  CodigoEnvido,
  PendienteValidar,
  CorreoValidao,
 Defaul
}

export enum TypeValidateUser {
  Get,
  Save,
  Delete
}




export class tblRol extends Concept  {   
  permissionByRoll: Permission = new Permission;
  isPublic: boolean = true;
  isCustomer: boolean = false;
  isAdmin: boolean = false;
  isVendor: boolean = false;
  isMaker: boolean = false;

}




export class AddressData  {

  City: string;
  Region: string;
  OrderQuantity: string;
  Country: NameConcept;
  AddressItems:string;

}

export class Permission {
  public read: boolean;
  public write: boolean;
  public delete: boolean; 
  public save: boolean; 
  public share: boolean;
  public page: string;

}

