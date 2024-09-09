import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { Title } from "@angular/platform-browser";

import { ChatBotService } from "../../../Services/Chat/ChatBotService";
import { ConfigService } from "../../../Services/Common/ConfigService";



@Component({
  standalone: true,
  selector: 'app-btn-chat',
  templateUrl: './app.btn-bot.component.html',
  styleUrls: ['app.btn-bot.css'],
  imports: [ LoadingComponent, FormsModule]
})


export class BtnBotMsg implements OnInit {
  _chatBotService: ChatBotService;
  _configService: ConfigService;
  _titleService: Title;

  mode: boolean = true; 

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(private route: Router, chatBotService: ChatBotService, configService: ConfigService) {
 
    this._chatBotService = chatBotService;
    this._configService = configService;
  }
  ngOnInit(): void {
    if (this._titleService != undefined) this._titleService.setTitle('Mis Productos');
  }


  Route(routeValue: string) {
 
    this.route.navigate([routeValue]);
  }


  detectarNavegador() {

    if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && 'caches' in window) {
     /* console.log('El navegador es compatible con PWA');*/
    } else {
      /*console.log('El navegador no es compatible con PWA');*/
      this.mode = false;
    }

  }



}
