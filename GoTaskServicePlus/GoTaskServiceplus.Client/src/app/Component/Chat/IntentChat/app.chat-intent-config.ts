import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GridComponent } from "../../Common/CustomControl/Grid/app.custom-control-grid";
import { MenuGridComponent } from "../../Common/MenuGrid/app.common-menu-grid";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { ChatBotIntentConfigService } from "../../../Services/Chat/ChatBotConfigService";
import { IntentChat } from "../../../Models/Chat/ChatModel";
import { SelectInputComponent } from "../../Common/CustomControl/ImputSelect/app.common-input-select";
import { NameConcept } from "../../../Models/Structure/tblProduct";
import { InputTextComponent } from "../../Common/CustomControl/ImputText/app.common-input-text";




@Component({
  standalone: true,
  selector: 'app-chat-intent-config',
  templateUrl: 'app.chat-intent-config.component.html',
  styleUrls: ['app.chat-intent-config.css'],
  imports: [FormsModule, CommonModule, MenuGridComponent, GridComponent, SelectInputComponent, InputTextComponent]

})


export class ChatIntentComponent implements OnInit {

  _http: ConceptService;
  _configservice: ConfigService;
  _rowSeletion: string;
 
  _chatBotIntentConfigService: ChatBotIntentConfigService;
  
  intent: IntentChat = new IntentChat();

  constructor(configservice: ConfigService, http: ConceptService, ChatBotService: ChatBotIntentConfigService) {

    this._configservice = configservice;
    this._http = http;
    this._chatBotIntentConfigService = ChatBotService;
  }

  ngOnInit(): void {   
      this.GetAllIntent();    
  }


  //Load
  GetAllIntent() {    
    this._chatBotIntentConfigService.GetAllIntent(0);    
  }

  Delete(id: string) {
    this._chatBotIntentConfigService.DeleteIntentById(id);
  }
  
  Edit(id: string) {
    this._chatBotIntentConfigService.GetIntentById(id).subscribe(
      (e) => {
        this.intent = e.data; console.log("this.intent", this.intent);   
      }      
    );
  }



  SaveAndUpdate() {
    this.ValidateConcept();

    if (this.intent.id == "00000000-0000-0000-0000-000000000000") {
      var response = this._chatBotIntentConfigService.SaveIntentBot(this.intent,true);
      return response;
    }
    else {
      var response = this._chatBotIntentConfigService.UpdateIntentBot(this.intent);
      return response;
    }
  }

 

  //Changed

  ChangedTypeIntent(value: string) {

    this.intent.intent = value;
  }

  ChangedMsgIntent(value: string) {
    this.intent.question = value;
  }


  LoadTypeIntent() {
    let list = Array();
    let data = new NameConcept();
    data.id = "Comment";
    data.name = "Comentario";
    data.value = "Comment";
    list.push(data);

    data = new NameConcept();
    data.id = "Product";
    data.name = "Producto";
    data.value = "Product";
    list.push(data);

    return list;
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
