import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { InputImgService } from "../../../Services/InputFile/InputFileService";
import { ResponseHttp } from "../../../Models/Common/Response";

import { catchError } from 'rxjs/operators';
import { LoadingComponent } from "../Loading/app.common-loading";
import { FormsModule } from "@angular/forms";
import { ImgItem, TypeImgDbMode } from "../../../Models/Structure/tblProduct";




@Component({
  standalone: true,
  selector: "app-common-input-file",
  templateUrl: './app.common-input-file.component.html',
  styleUrls: ['./app.common-input-file.css'],
  imports: [CommonModule, FormsModule]
})
export class SelectFileComponent implements OnInit, DoCheck {
  _configservice: ConfigService;

  isNew: boolean;
  isExist: boolean;





  @Input({ required: false }) nameFile!: string;
  @Input({ required: false }) typeFile!: string;
  @Input({ required: false }) maxCountFile!: Number;
  @Input({ required: false }) maxSizeFile!: Number;
  @Input({ required: false }) EndFile!: Function;
  private _cdRef: ChangeDetectorRef;
  public _file: InputImgService;
  public fileName: string;
  public filesMax: number = 3;
  public countFiles: number = 0;

  public urlStorageFile: string = "";
  public urlDriveFile: string = "";

  public listImg: Array<ImgItem> = new Array<ImgItem>();
  constructor(configservice: ConfigService, _InputImgService: InputImgService) {
    this._configservice = configservice;
    this._file = _InputImgService;


  }
  ngDoCheck(): void {
    this.ChangedName();

  }
  ngOnInit(): void {
    
  }

  public setView() {
    this._file.Setvisible(false);
    this._cdRef.detectChanges();
  }



 



  public TabMode(mode: number) {
    this._file.storageActive = mode;
    if (mode == TypeImgDbMode.Drive) this._file.TypeImgDbImg = TypeImgDbMode.Drive;
    if (mode == TypeImgDbMode.Storage) this._file.TypeImgDbImg = TypeImgDbMode.Storage;
    if (mode == TypeImgDbMode.File) this._file.TypeImgDbImg = TypeImgDbMode.File;

  }



  onFileSelected(event: any) {


    this.countFiles = Number.parseInt(event.target.files.length);
    var count = this._file.listImg.length;
    var fileCount = (this.filesMax - count);

    var list = Array();
    list = event.target.files;  
    if (fileCount > 0) {
    
      for (var i = 0; i < this.countFiles; i++) {
           if (fileCount > i) {
      
          const file = event.target.files[i];         
          var result = this._file.UploadFile(file, this.nameFile);
          this._file.isLoding = true;

        }
      }
    }
  }

  private handleHttpError(error: any) {
    console.error('Error en la solicitud:', error);
  }

  onChangedUrl(event: any, mode: string) {
    var url = event.target.value;
    if (url.length > 5 && url.toLowerCase().includes('https://')) {
      this._file.isSaveUrl = true;
      if (this._file.TypeImgDbImg == TypeImgDbMode.Drive) {
        this.urlDriveFile = url;
      }
      if (this._file.TypeImgDbImg == TypeImgDbMode.Storage) {
        this.urlStorageFile = url;
      }
      if (this._file.TypeImgDbImg == TypeImgDbMode.File) {
        this.urlDriveFile = "";
        this.urlStorageFile = "";
      }


    } else {
      this._file.isSaveUrl = false;
    }
    this.isSavedMode();
  }

  onChangedName(event: any, mode: string) {
    var value = event.target.value;
    this._file.nameFile = value;
    this.ChangedName();
    this.isSavedMode();
  }


  ChangedName() {
    if (this._file.nameFile != undefined &&  this._file.nameFile.length > 5) {
      this._file.isSaveName = true;
    } else {
      this._file.isSaveName = false;
    }
  }


  isSavedMode() {
    if (this._file.isSaveName && this._file.isSaveUrl) {
      this._file.isSave = true;
    } else {
      this._file.isSave = false;
    }
  }

  CancelUpload() {
    this._file.isLoding = false;
  }




}
