import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PermissionComponent } from "../Permission/app.permission";
import { ConceptService } from "../../Services/Product/Concept/ConceptService";
import { ConfigService } from "../../Services/Common/ConfigService";
import { NameConcept, TypeConcepValue, tblConcepValue } from "../../Models/Structure/tblProduct";
import { ChatBotMsg } from "../Common/ChatBotMsg/app.chat-bot-msg";
import { ChatBotService } from "../../Services/Chat/ChatBotService";
import { tblChatBotMsg } from "../../Models/Chat/ChatModel";
import { ChatBotIntentConfigService } from "../../Services/Chat/ChatBotConfigService";
import { PermissionService } from "../../Services/Segurity/Login/PermissionService";
import { MenuGridComponent } from "../Common/MenuGrid/app.common-menu-grid";
import { GridComponent } from "../Common/CustomControl/Grid/app.custom-control-grid";
import { CommonService } from "../../Services/Common/CommonService";
import { MapComponent } from "../Common/Mapa/app.common-mapa";
import { AdminBuyProductService } from "../../Services/Admin/Customer/AdminBuyProductService";
import { ProjectService } from "../../Services/Admin/Project/ProjectService";




@Component({
  standalone: true,
  selector: 'app-map-store',
  templateUrl: 'app.map-store.component.html',
  styleUrls: ['app.map-store.css'],
  imports: [FormsModule, CommonModule, PermissionComponent, MenuGridComponent, GridComponent, MapComponent]

})


export class MapStoreComponent implements OnInit {

 


 
  _Permission: PermissionService
  listCoordinates: string[] = new Array();
  @Input() ListStoreLocation: L.LatLngExpression[] = new Array<L.LatLngExpression>;

  constructor(private _CommonService: CommonService, Permission: PermissionService,private _projectService: ProjectService) {  
    this._Permission = Permission;
  }

  ngOnInit(): void {
    var status = this._Permission.ValidationLogin("map-store");
    if (status) {

      this.loadData();
 
    }
  }

  async loadData() {
    this._projectService.adressList = new Array<tblConcepValue>();
    var result = this._projectService.GetAdminAllConceptByIdCompany("all", TypeConcepValue.AdressConcept(), 1,"A3DF91B1-67C1-4C45-B84A-EB0B0CBEE3FB" )
    result.subscribe(
      (e) => {

        e.data.forEach((data: any) => {         
          this.listCoordinates.push(data.value.replace("lat:", "").replace("lng:", ""))
        });

        this.listCoordinates.forEach((data: string) => {

          this.ListStoreLocation.push([Number.parseFloat(data.split(",")[0]), Number.parseFloat(data.split(",")[1]) ]);
         
        });


      }

    );
    
  }












  languageTraslate(value: string) {
    return value;
  }







}
