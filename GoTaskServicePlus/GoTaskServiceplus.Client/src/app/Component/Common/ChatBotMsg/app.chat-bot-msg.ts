import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingComponent } from "../../Common/Loading/app.common-loading";
import { AlertComponent } from "../../Common/Alert/app.common-alert";
import { Title } from "@angular/platform-browser";
import { SearchProductService } from "../../../Services/Product/Search/SeaarchProductService";
import { tblProduct } from "../../../Models/Structure/tblProduct";
import { ItemProductView } from "../../Product/ProductItem/app.product-item-product";
import { FavoriteService } from "../../../Services/Customer/FavoriteService";
import { ProductItemService } from "../../../Services/Product/ProductItem";
import { ChatBotService } from "../../../Services/Chat/ChatBotService";
import { ChatBot, ChatBotContext, MsgChat } from "../../../Models/Chat/MsgChat";
import { ConfigService } from "../../../Services/Common/ConfigService";
import { SpeechRecognition } from "../../../Services/SubApp/SpeechToSpeech/SpeechRecognitionService";
import { PermissionComponent } from "../../Permission/app.permission";
import { PermissionService } from "../../../Services/Segurity/Login/PermissionService";
import { UtilitiService } from "../../../Services/Common/UtilitisService";



@Component({
  standalone: true,
  selector: 'app-chat-bot-msg',
  templateUrl: './app.chat-bot-msg.component.html',
  styleUrls: ['app.chat-bot-msg.css'],
  imports: [LoadingComponent, FormsModule, PermissionComponent]
})


export class ChatBotMsg implements OnInit, AfterViewInit {


  type: string = "all";
  page: number = 0;
  _titleService: Title;
  _param: ActivatedRoute;
  _search: FavoriteService;
  _SpeechRecognition: SpeechRecognition
  intervalId: any;
  statusSpeech: boolean;
  currentIndex: number;
  _chatBotService: ChatBotService;
  _configService: ConfigService;
  question: ChatBotContext = new ChatBotContext();
  _textrecognition: string;
  _cdRef: ChangeDetectorRef;
  _Permission: PermissionService;
  _Util: UtilitiService;


  @ViewChild('textArea') textArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(private route: Router, titleService: Title, param: ActivatedRoute, search: FavoriteService, chatBotService: ChatBotService, configService: ConfigService, SpeechRecognition: SpeechRecognition, cdRef: ChangeDetectorRef, Permission: PermissionService, Util: UtilitiService) {
    this._param = param;
    this._titleService = titleService;
    this._search = search;
    this._chatBotService = chatBotService;
    this._configService = configService;
    this._SpeechRecognition = SpeechRecognition;
    this._cdRef = cdRef;
    this._Permission = Permission;
    this._Util = Util;
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this._titleService.setTitle('Mis Productos');
    var msg = new MsgChat();
    var msgTemp = "Hola, ¿cómo estás? ¡Qué alegría que estés aquí! Estoy aquí para ayudarte.\n Recuerda compartirnos en tus redes sociales.\n ¡Muchas gracias!";
    msg.msg = msgTemp;  // msg.msg = this.GetSplitResponse(msgTemp)[0];
    msg.id = "0";
    msg.isBot = true;
    this.initVoiceInput();
    this._chatBotService.AddChatList(msg);
  
  }

  async loadData() {

  }

  searchProduct(routeValue: string) {
    this.route.navigate([routeValue]);
  }

  QuestionMsg() {

    if (this._chatBotService.chatListStatus) {
      this._chatBotService.chatListStatus = false;
      var msg = new MsgChat();


      var questionCustomer = new MsgChat();

      questionCustomer.msg = this.question.question;
      questionCustomer.isBot = false;
      questionCustomer.id = (this._chatBotService.GetChatList().length + 1) + "";
      this._chatBotService.AddChatList(questionCustomer);

      var result = this._chatBotService.ChatMsg(this.question);

      result.subscribe((response) => {

        var msg = new MsgChat();
        if (response != null) {
          response.data.forEach((item: any) => {

            msg.msg = item.response;
            msg.id = item.id;
            msg.isBot = true;

            this._chatBotService.AddChatList(msg);
            this._chatBotService.chatListStatus = true;
          })

        }


        this.scrollToBottom("scrollContainer");
        this.question = new ChatBotContext();
        this.onFocus();

      });


    }
  }

  onFocus() {
    setTimeout(() => {
      this.textArea.nativeElement.focus();
    
    }, 800)
   
  }



  GetSplitResponse(response: string) {
    return response.split(" ");
  }

  SelctProduct(productSelect: string) {
    var name = "";

    productSelect.split(" ").forEach((e) => {
      if (e != "") name += e + (e != "" ? "-" : "");
    })

    this.Route("select-product/" + productSelect)
  }


  //Recognition

  startRecording() {
    this.question = new ChatBotContext;
    this.statusSpeech = true;
    this._SpeechRecognition.start();
    this._cdRef.detectChanges();

  }

  stoptRecording() {

    this.statusSpeech = false;
    this._SpeechRecognition.stop();
    /*   this._cdRef.detectChanges();*/
  }



  initVoiceInput() {
    // Subscriptio.n for initializing and this will call when user stopped speaking.
    this._SpeechRecognition.init("es-ES").subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
    });

    // Subscription to detect user input from voice to text.
    this._SpeechRecognition.speechInput().subscribe((input) => {
      // Set voice text output to
      //this.searchForm.controls.searchText.setValue(input);
      console.log("this.question.question", this.question.question);
      if (this.statusSpeech) this.question.question = input;
      else if (this.question.question != "" && this.question.question != undefined)
      this.QuestionMsg();
      
      this._cdRef.detectChanges();

    });
  }

  Route(routeValue: string) {

    this.route.navigate([routeValue]);
  }



  async scrollToBottom(Byid: string, scroll: number = 0) {
    // Espera 1000 milisegundos (1 segundo)
    await new Promise(resolve => setTimeout(resolve, 600));
    const container = document.getElementById(Byid);
    if (container) {
      container.scrollTo({
        top: (scroll == 0 ? (container.scrollHeight + container.scrollHeight) : scroll),
        behavior: 'smooth'
      });
    }

  }


  CancelPrediction() {
    this._chatBotService.chatListStatus = true;
  }




}
