export class Concept {
  id: string = "00000000-0000-0000-0000-000000000000";
  idProject: string = "00000000-0000-0000-0000-000000000000";
  idCompany: string = "00000000-0000-0000-0000-000000000000";
  conceptCompany: NameConcept = new NameConcept;
  conceptProject: NameConcept = new NameConcept; 
  conceptPrevious: NameConcept = new NameConcept;
  urlReferProduct: NameConcept = new NameConcept; 
  name: string = "";
  code: string = "";
  creationDate: string = "1999-01-01";
  editDate: string = "1999-01-01";
  inUse: boolean = false;
  disable: boolean = false;

  getCreationDate(): Date {
    return new Date(this.creationDate);
  }

  getEditDate(): Date {
    return new Date(this.editDate);
  }
}



export class tblProduct extends Concept {
  idTypeOfProduct: string;
  referNumber: string = "";
  deliveryMode: NameConcept;
  status: NameConcept;
  availableDay: NameConcept;
  quantity: number = 0;
  interestedBuyers: number = 0;
  negativeRating: number = 0;
  positiveRating: number = 0;
  countRating: number = 0;
  actualPrice: number = 0;
  priceString: string = "$0";
  adress: tblConcepValue = new tblConcepValue;
  isPublic: boolean = false;
  isProduct: boolean = true;
  imgList: Array<ImgItem> = new Array<ImgItem>;
  firsImg: ImgItem = new ImgItem();
  typeCurrency: tblConcepValue = new tblConcepValue();
  prices: Array<tblPrices> = new Array<tblPrices>;
  pricesInternal: number;
  historyOfPrice: Array<tblPrices> = new Array<tblPrices>;
  characteristics: Array<tblCharacteristics> = new Array<tblCharacteristics>();
  typeOfProduct: tblConcepValue = new tblConcepValue();
  filterISearch: Array<string> = new Array<string>();
  distance: number=0;
  typeProductName: string ="";
  getIsAvailable(): boolean {
    return  (this.quantity > 0);
  }
  getIsPublic(): boolean {

   
    return (this.status.name.toLowerCase() == "public");
  }
}




export class ImgItem extends Concept {
  url: string = "";
  nameVisible: string = "";
  typeImgDb: number = 0;
  referUse: Array<string>;
  GetStringToTypeImgDb(mode: string): string {
    return mode;
  }
}



export enum TypeImgDbMode {
  Defaul,
  Drive,
  Storage,
  File
}


export class tblConcepValue extends Concept  {
  concept: NameConcept = new NameConcept();
  value: string="";
  type: string = "";
  isPublic: boolean ;
}

export class TypeConcepValue {
  static DeliveryModeConcept(): string { return "DeliveryModeConcept"; }
 // static AdressConcept(): string { return "AdressConcept"; }
  static ConceptStoreTracking(): string { return "ConceptStoreTracking"; }
  static CoutryConcept(): string { return "CoutryConcept"; }
  static CityConcept(): string { return "CityConcept"; }
  static StatusProductConcept(): string { return "StatusProductConcept"; }
  static AvailableDayConcept(): string { return "AvailableDayConcept"; }
  static AdressConcept(): string { return "AdressConcept"; }
  static TypeProduct(): string { return "TypeProduct"; }
  static CalendarHour(): string { return "CalendarHour"; }
  static GetListConcept(): Array<NameConcept> {
    let list = new Array<NameConcept>();
    let item =new NameConcept();
   
    //list.push({ value: this.DeliveryModeConcept(), name: "Modo de entrega",permission:"public" });
    //list.push({ value: this.CityConcept(), name: "Ciudad", permission:"public" });
    //list.push({ value: this.CoutryConcept(), name: "País", permission:"public" });
    //list.push({ value: this.StatusProductConcept(), name: "Estatus de producto", permission: "public" });
    //list.push({ value: this.AvailableDayConcept(), name: "Disponibilidad de producto", permission: "public" });
    //list.push({ value: this.AdressConcept(), name: "Dirección", permission: "public" });
    return list;
  }
}


export class NameConcept {
  name: string ="";
  value: string="";
  id: string = "00000000-0000-0000-0000-000000000000"; 
}

export class ConceptProduct {
  name: string = "";
  quantity: number = 0;
  id: string = "00000000-0000-0000-0000-000000000000";
 
}




//export class tblConceptData extends Concept { 
//  typeConceptValue: string = '';
//  typeValue: string = '';
//  isPublic: boolean = false;
//  value: number = 0;
//  description: number = 0;
//  conceptType: TypeConcept = TypeConcept.ModeType;
//}
enum TypeConcept {
  ModeType,
  ModeValue
}

export class tblPrices extends Concept {
  price: number = 0;
  typeAction: string = "";
  isPublic: boolean = false;
}



export class tblCharacteristics extends Concept {
 
  description: string = '';
  
}


export class ConceptCategory{

  name: string;
  url: string;
  id: string;
  idCompany: string;

}
