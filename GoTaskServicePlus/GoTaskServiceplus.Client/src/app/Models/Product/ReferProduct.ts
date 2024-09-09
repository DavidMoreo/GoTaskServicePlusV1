import {  Concept, tblPrices } from "../Structure/tblProduct";


export class tblReferProduct extends Concept { 
  refer: string = "";
  quantity: number = 0;
  price: number = 0;
  prices: Array<tblPrices> = new Array<tblPrices>;
}

export  class  TypePrice {  
  isQuantity = "IsQuantity";
  isACost = "IsACostInMoney";
  isADiscount = "isADiscounInMoney";
  isADiscountInPorcentage = "isADiscountInPorcentage";
  isProfitInMoney = "IsProfitInMoney";
  isProfitInPorcentage = "IsProfitInPorcentage";
}
