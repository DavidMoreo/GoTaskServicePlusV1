import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";

import { Inject } from '@angular/core';
import { interval } from 'rxjs';
import { Title } from '@angular/platform-browser';


import { FormsModule } from "@angular/forms";
import { ConfigService } from "../../../../../Services/Common/ConfigService";
import { UtilitiService } from "../../../../../Services/Common/UtilitisService";
import { LanguageSpeech, SpeechLanguageModel } from "../../../../../Models/SubApp/SpeechToSpeech/SpeechToSpeech";




@Component({
  standalone: true,
  selector: "app-itemchat-item-chat",
  templateUrl: './app.itemchat-item-chat.component.html',
  styleUrls: ['app.itemchat-item-chat.css']

})
export class ItemChatComponent implements OnInit, AfterViewInit {

  _configservice: ConfigService; 
  _utiliti: UtilitiService;
  _itemLanguage: LanguageSpeech;

  @Input() EventSpeech: (parametro: string) => void;


  @Input() itemLanguage!: LanguageSpeech;

  constructor(configservice: ConfigService,  _utiliti: UtilitiService) {
    this._configservice = configservice;  
    this._utiliti = _utiliti;
  }



  ngAfterViewInit(): void {


  }

  ngOnInit(): void { 

    
    console.log("Log", this.itemLanguage.id);
    console.log("Log2", this.itemLanguage);
  }

  speech(text: string): void {

    this.EventSpeech(text);
  }


}
