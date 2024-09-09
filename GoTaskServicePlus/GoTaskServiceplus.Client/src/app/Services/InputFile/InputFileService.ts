import { Injectable } from "@angular/core";
import { HttpClientService } from "../Common/HttpService";

import { formatDate } from "@angular/common";
import { Observable } from "rxjs/internal/Observable";
import { ImgItem, NameConcept } from "../../Models/Structure/tblProduct";
import { ProductItemService } from "../Product/ProductItem";

@Injectable({
  providedIn: 'root'
})



export class InputImgService {

 public visible: boolean;
 public storageActive: number=0;
 public filesMax: number;


  public nameFile: string;
  public TypeImgDbImg: number=0;


  public isSaveName: boolean;
  public isSaveUrl: boolean;
  public isSave: boolean;
  public isLoding: boolean;
  public isFirsImg: boolean;
  
  public listImg: Array<ImgItem> = new Array<ImgItem>();


  private _productItemService: ProductItemService

  constructor(private http: HttpClientService, productItemService: ProductItemService) {

    this._productItemService = productItemService;
  }

  public Setvisible(mode:boolean) {
    this.visible = mode;
   

  }


  public UploadFile(file: File, name: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("NameFilePC", name);
    formData.append("Url", name);
  
    var rerult = this.http.postHttpAny("UploadFileWebp", formData).subscribe((e) => {

      this.isLoding = false;

      var img = new ImgItem();
      img = e.data;
      img.conceptCompany = new NameConcept();
      img.conceptPrevious = new NameConcept();
      img.conceptProject = new NameConcept();
      console.log("Donloader", img);
      if (this.listImg.length <= 0) {
        this._productItemService._product.firsImg = img;
        this._productItemService._product.firsImg.conceptCompany = new NameConcept();
        this._productItemService._product.firsImg.conceptProject = new NameConcept();
        this._productItemService._product.firsImg.conceptPrevious = new NameConcept();
        this._productItemService._product.firsImg.referUse = new Array<string>;       
      } 
      this.listImg.push(img);

    });
    
  }





  
}

