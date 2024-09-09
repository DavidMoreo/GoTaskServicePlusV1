import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ChatBotByNameConfigService, ChatBotIntentConfigService } from "../../../Services/Chat/ChatBotConfigService";
import { IAByNameProduct, IntentChat } from "../../../Models/Chat/ChatModel";
import { SelectInputComponent } from "../../Common/CustomControl/ImputSelect/app.common-input-select";
import { NameConcept } from "../../../Models/Structure/tblProduct";
import { InputTextComponent } from "../../Common/CustomControl/ImputText/app.common-input-text";
import { BtnOnOffComponent } from "../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off";




@Component({
  standalone: true,
  selector: 'app-chat-by-name-config',
  templateUrl: 'app.chat-by-name-config.component.html',
  styleUrls: ['app.chat-by-name-config.css'],
  imports: [FormsModule, CommonModule, MenuGridComponent, GridComponent, SelectInputComponent, InputTextComponent, BtnOnOffComponent]

})


export class ChatConfigByNameComponent implements OnInit {

  _http: ConceptService;
  _configservice: ConfigService;
  _rowSeletion: string;
 
  _chatBotByNameConfigService: ChatBotByNameConfigService;
  
  data: IAByNameProduct = new IAByNameProduct();

  constructor(configservice: ConfigService, http: ConceptService, ChatBotService: ChatBotByNameConfigService) {

    this._configservice = configservice;
    this._http = http;
    this._chatBotByNameConfigService = ChatBotService;
  }

  ngOnInit(): void {   
      this.GetAllIntent();    
  }


  //Load
  GetAllIntent() {    
    this._chatBotByNameConfigService.GetAllIntent(0);
  }

  Delete(id: string) {
    this._chatBotByNameConfigService.DeleteIntentById(id);
  }
  
  Edit(id: string) {
    this._chatBotByNameConfigService.GetIntentByid(id).subscribe(
      (e) => {       
        this.data = e.data;     
      }      
    );
  }



  SaveAndUpdate() {
    this.ValidateConcept();

    if (this.data.id == "00000000-0000-0000-0000-000000000000") {
      var response = this._chatBotByNameConfigService.SaveIntent(this.data);
      return response;
    }
    else {
      var response = this._chatBotByNameConfigService.UpdateIntent(this.data);
      return response;
    }
  }

 

  //Changed

  ChangedQuestion(value: string) {

    this.data.question = value;
  }

  ChangedNameProduct(value: string) {
    this.data.question = value;
  }


  ChangedChatAfirmative(staus: boolean) {

  }




  Selection(id: string) {
    this._rowSeletion = id;
  }
  
  languageTraslate(value: string) {
    return value;
  }




  ValidateConcept() {

  }



}
