import { Concept, NameConcept, tblConcepValue } from "../Structure/tblProduct";

export class tblCompany extends Concept {
  description: string="";
  nit: string = "";
  TypeCompanyMode: string = "";
}


export class tblProject extends Concept {
  description: string = ""; 
  gpsGoogle: string = ""; 
  mobileNumber: string = "";
  phoneNumber: string = "";
  isWhatsApp: boolean = false;
  addressItemId: string = "";
  typeCompanyMode: string = "";
  storeOpeningTime: string = "";
  storeClosingTime: string = "";
}

export class ConceptProject {
  name: string;
  mobilNumber: string;
  gps: string;
  conceptCity: NameConcept;
}
