import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PermissionComponent } from "../../Permission/app.permission";
import { ConceptService } from "../../../Services/Product/Concept/ConceptService";
import { ConfigService } from "../../../Services/Common/ConfigService";

import { IntentChat, TypeIntent, tblChatBotMsg } from "../../../Models/Chat/ChatModel";

import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";

import { ChatIntentComponent } from "../IntentChat/app.chat-intent-config";
import { SelectInputComponent } from "../../Common/CustomControl/ImputSelect/app.common-input-select";
import { BtnOnOffComponent } from "../../Common/CustomControl/BtnOnOff/app.custom-control-btn-on-off";
import { ChatConfigAssistantComponent } from "../AIAssistant/app.chat-assistant-config";
import { ChatConfigByNameComponent } from "../SearchProductsByName/app.chat-by-name-config";




@Component({
  standalone: true,
  selector: 'app-chat-config',
  templateUrl: 'app.chat-config.component.html',
  styleUrls: ['app.chat-config.css'],
  imports: [FormsModule, CommonModule, PermissionComponent, ChatIntentComponent, SelectInputComponent, BtnOnOffComponent, ChatConfigAssistantComponent, ChatConfigByNameComponent]

})


export class ChatComponent implements OnInit {

  _http: ConceptService;
  _configservice: ConfigService;
  _rowSeletion: string;
  _Permission: PermissionService;
  private _cdRef: ChangeDetectorRef;

  typeIntent: TypeIntent = new TypeIntent();
  _tab: string = "...";

  statusPermission: boolean = false;

  constructor(Permission: PermissionService) {
    this._Permission = Permission;
  }

  ngOnInit(): void {
    this._tab = this.intentionOfTheQquestion();
    this.statusPermission = this._Permission.ValidationLogin("chat-config");    
    if (this.statusPermission) {     
      this.loadData();
    }
  }

  //Load
  async loadData() {
    
  }
  
  pageTab(mode: string) {
    
    this._tab = mode;
  }

  languageTraslate(value: string) {
    return value;
  }





  //TAb
  intentionOfTheQquestion() {
    return TypeIntent.intentionOfTheQquestion();   
  }

  aIAssistant() {
    return TypeIntent.aIAssistant();
  }

  searchProductsByName() {
    return TypeIntent.searchProductsByName();
  }



}
