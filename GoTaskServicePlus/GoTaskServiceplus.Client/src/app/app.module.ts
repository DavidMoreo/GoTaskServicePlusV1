import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/Home/app.home-home';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Services/Common/HttpInterceptorService';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './Component/Common/Navegation/app.common-menu';
import { ToolsComponent } from './Component/Tools/app.tools';
import { TextToSpeechComponent } from './Component/Tools/TextToSpeech/app.texttospeech-text-to-speech';
import { DownloadVideosComponent } from './Component/Tools/DowloadYoutobe/app.subapp-download-videos';
import { ControInfo } from './Component/Common/ScrollInfo/app.common-scroll-info.component';
import { AddUpdateProduct } from './Component/Product/AddAndUpdateProduct/app.product-add-update-product';
import { SpeechToSpeechComponent } from './Component/Tools/SpeechToSpeech/app.speechtospeech-speech-to-speech';
import { SelectProduct } from './Component/Product/SelectProduct/app.product-select-product';
import { ListProduct } from './Component/Product/ListProduct/app.product-list-product';
import { ListProductSearch } from './Component/Product/ListProductSearch/app.product-list-produc-search';
import { ConceptProductControl } from './Component/Product/Concept/app.product-concept';
import { ConceptProductCustomer } from './Component/Vendor/ConceptVendor/app.product-concept_c';
import { LoginComponent } from './Component/Segurity/Login/app.segurity-login.component';
import { GuardActivate } from './Guard/GuardActivate';
import { Register } from './Component/Segurity/Register/app.segurity-register';
import { RegisterUser } from './Component/Segurity/RegisterUser/app.segurity-register-user';
import { MenuComponent } from './Component/Menu/app.home-menu';
import { CreateProject } from './Component/Admin/Project/app.admin-project';
import { CreateCompany } from './Component/Admin/Company/app.admin-company';
import { AdminteUser } from './Component/Admin/User/app.admin-user';
import { NotLoginComponent } from './Component/Common/NotLogin/app.not-login';
import { ListFavorite } from './Component/Customer/ListFavorite/app.product-list-favorite-search';
import { ProjectMenuComponent } from './Component/Admin/ProjectMenu/app.project-menu';
import { ChatBotMsg } from './Component/Common/ChatBotMsg/app.chat-bot-msg';
import { ChatComponent } from './Component/Chat/ConfigChat/app.chat-config';
import { ListCartComponet } from './Component/Customer/ListCart/app.customer-list-cart';
import { ListBuyComponet } from './Component/Customer/ListBuy/app.customer-list-buy';
import { AdminListBuyComponet } from './Component/Admin/ListBuy/app.admin-list-buy';
import { ListSearchComponent } from './Component/Admin/ListSearch/app.admin-list-search';
import { AdminRolUserComponent } from './Component/Admin/RolUser/app.admin-rol-user';
import { AlertComponent } from './Component/Common/Alert/app.common-alert';
import { VendorProductService } from './Services/Vendor/VendorUpdateProduct';
import { ShareComponent } from './Component/Common/ShareProduct/app.common-share';
import { AlertBuyProductService } from './Services/Customer/AlertBuyProductService';
import { AlertBuyProductComponent } from './Component/Common/AlertBuyProduct/app.alert-buy-product';
import { CalendarComponent } from './Component/Common/Calendar/app.common-calendar';
import { CityFilterComponent } from './Component/Common/CityFilter/app.common-city-filter';
import { ImputSearch } from './Component/Common/CustomControl/ImputSearch/app.common-input-search';
import { PopupMsgComponent } from './Component/Common/PopupMsg/app.common-popup-msg';
import { ChangedPasswordUser } from './Component/Segurity/ChangedPassword/app.segurity-changed-password-user';
import { IotComponent } from './Component/Tools/Student/app.Iot';
import { UpdateProject } from './Component/Vendor/ProjectVendor/app.admin-project-vendor';
import { ConceptStoreTrackingControl } from './Component/Admin/ConceptStoreTracking/app.admin-store-trackingt';
import { MapStoreComponent } from './Component/MapStore/app.map-store';
import { VendorUpdateProduct } from './Component/Vendor/VendorActiveProduct/app.product-vendor-update-product';
import { AdminListBuyVendorComponet } from './Component/Vendor/ListBuyVendor/app.admin-list-buy-vendor';
import { ReferProduct } from './Component/Product/ReferProduct/app.product-refer-product';




/*, canActivate: [() => inject(GuardActivate).canActivate()]  }*/






//let appRouter: Routes = [
//  { path: '', component: HomeComponent },
//  { path: 'register', loadComponent: () => import('./Component/Segurity/Register/app.segurity-register').then(m => m.Register) },
//  { path: 'register-user', loadComponent: () => import('./Component/Segurity/RegisterUser/app.segurity-register-user').then(m => m.RegisterUser) },
//  { path: 'changed-password-user', loadComponent: () => import('./Component/Segurity/ChangedPassword/app.segurity-changed-password-user').then(m => m.ChangedPasswordUser) },

//  { path: 'home', component: HomeComponent },
//  { path: 'tools', loadComponent: () => import('./Component/Tools/app.tools').then(m => m.ToolsComponent) },
//  { path: 'learn-iot', loadComponent: () => import('./Component/Tools/Student/app.Iot').then(m => m.IotComponent) },
//  { path: 'text-to-speech', loadComponent: () => import('./Component/Tools/TextToSpeech/app.texttospeech-text-to-speech').then(m => m.TextToSpeechComponent) },
//  { path: 'youtube-download', loadComponent: () => import('./Component/Tools/DowloadYoutobe/app.subapp-download-videos').then(m => m.DownloadVideosComponent) },
//  { path: 'add-product', loadComponent: () => import('./Component/Product/AddAndUpdateProduct/app.product-add-update-product').then(m => m.AddUpdateProduct) },
//  { path: 'update-product', component: AddUpdateProduct },
//  { path: 'chat-speech', loadComponent: () => import('./Component/Tools/SpeechToSpeech/app.speechtospeech-speech-to-speech').then(m => m.SpeechToSpeechComponent) },
//  { path: 'select-product/:type', loadComponent: () => import('./Component/Product/SelectProduct/app.product-select-product').then(m => m.SelectProduct) },
//  { path: 'select-product/:type/:id', loadComponent: () => import('./Component/Product/SelectProduct/app.product-select-product').then(m => m.SelectProduct) },
//  { path: 'select-product/:type/:name/:id', loadComponent: () => import('./Component/Product/SelectProduct/app.product-select-product').then(m => m.SelectProduct) },
//  { path: 'select-product', loadComponent: () => import('./Component/Product/SelectProduct/app.product-select-product').then(m => m.SelectProduct) },

//  { path: 'select-product-search/:filter', loadComponent: () => import('./Component/Product/ListProductSearch/app.product-list-produc-search').then(m => m.ListProductSearch) },
//  { path: 'conceptual-product', loadComponent: () => import('./Component/Product/Concept/app.product-concept').then(m => m.ConceptProductControl) },
//  { path: 'customer-concept', loadComponent: () => import('./Component/Vendor/ConceptVendor/app.product-concept_c').then(m => m.ConceptProductCustomer) },
//  { path: 'update-project-vendor', loadComponent: () => import('./Component/Vendor/ProjectVendor/app.admin-project-vendor').then(m => m.UpdateProject) },
//  { path: 'product-cart', loadComponent: () => import('./Component/Customer/ListCart/app.customer-list-cart').then(m => m.ListCartComponet) },
//  { path: 'product-buy', loadComponent: () => import('./Component/Customer/ListBuy/app.customer-list-buy').then(m => m.ListBuyComponet) },
//  { path: 'home-menu', loadComponent: () => import('./Component/Menu/app.home-menu').then(m => m.MenuComponent) },
//  { path: 'admin-project', loadComponent: () => import('./Component/Admin/Project/app.admin-project').then(m => m.CreateProject) },
//  { path: 'store-tracking', loadComponent: () => import('./Component/Admin/ConceptStoreTracking/app.admin-store-trackingt').then(m => m.ConceptStoreTrackingControl) },
//  { path: 'admin-rol-user', loadComponent: () => import('./Component/Admin/RolUser/app.admin-rol-user').then(m => m.AdminRolUserComponent) },
//  { path: 'project-menu', loadComponent: () => import('./Component/Admin/ProjectMenu/app.project-menu').then(m => m.ProjectMenuComponent) },
//  { path: 'admin-user', loadComponent: () => import('./Component/Admin/User/app.admin-user').then(m => m.AdminteUser) },
//  { path: 'user-favorite', loadComponent: () => import('./Component/Customer/ListFavorite/app.product-list-favorite-search').then(m => m.ListFavorite) },
//  { path: 'chat-bot', loadComponent: () => import('./Component/Common/ChatBotMsg/app.chat-bot-msg').then(m => m.ChatBotMsg) },
//  { path: 'chat-config', loadComponent: () => import('./Component/Chat/ConfigChat/app.chat-config').then(m => m.ChatComponent) },
//  { path: 'admin-buy', loadComponent: () => import('./Component/Admin/ListBuy/app.admin-list-buy').then(m => m.AdminListBuyComponet) },
//  { path: 'admin-list-search', loadComponent: () => import('./Component/Admin/ListSearch/app.admin-list-search').then(m => m.ListSearchComponent) },
//  { path: 'admin-company', loadComponent: () => import('./Component/Admin/Company/app.admin-company').then(m => m.CreateCompany) },

//  { path: 'map-store', loadComponent: () => import('./Component/MapStore/app.map-store').then(m => m.MapStoreComponent) },


//  { path: 'app-vendor-active-product', loadComponent: () => import('./Component/Vendor/VendorActiveProduct/app.product-vendor-update-product').then(m => m.VendorUpdateProduct) },
//  { path: 'list-buy-vendor', loadComponent: () => import('./Component/Vendor/ListBuyVendor/app.admin-list-buy-vendor').then(m => m.AdminListBuyVendorComponet) },


//  { path: 'refer-product', component: ReferProduct },

//  { path: 'login', loadComponent: () => import('./Component/Segurity/Login/app.segurity-login.component').then(m => m.LoginComponent) },
//  { path: '**', component: HomeComponent }
//];



let appRouter = [
  { path: '', component: HomeComponent },
  { path: 'register', component: Register },
  { path: 'register-user', component: RegisterUser },
  { path: 'changed-password-user', component: ChangedPasswordUser },
  { path: 'home', component: HomeComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'learn-iot', component: IotComponent },
  { path: 'text-to-speech', component: TextToSpeechComponent },
  { path: 'youtube-download', component: DownloadVideosComponent },
  { path: 'add-product', component: AddUpdateProduct },
  { path: 'update-product', component: AddUpdateProduct },
  { path: 'chat-speech', component: SpeechToSpeechComponent },
  { path: 'select-product/:type', component: SelectProduct },
  { path: 'select-product/:type/:id', component: SelectProduct },
  { path: 'select-product/:type/:name/:id', component: SelectProduct },
  { path: 'select-product', component: SelectProduct },
  { path: 'select-product-search/:filter', component: ListProductSearch },
  { path: 'conceptual-product', component: ConceptProductControl },
  { path: 'customer-concept', component: ConceptProductCustomer },
  { path: 'update-project-vendor', component: UpdateProject },
  { path: 'product-cart', component: ListCartComponet },
  { path: 'product-buy', component: ListBuyComponet },
  { path: 'home-menu', component: MenuComponent },
  { path: 'admin-project', component: CreateProject },
  { path: 'store-tracking', component: ConceptStoreTrackingControl },
  { path: 'admin-rol-user', component: AdminRolUserComponent },
  { path: 'project-menu', component: ProjectMenuComponent },
  { path: 'admin-user', component: AdminteUser },
  { path: 'user-favorite', component: ListFavorite },
  { path: 'chat-bot', component: ChatBotMsg },
  { path: 'chat-config', component: ChatComponent },
  { path: 'admin-buy', component: AdminListBuyComponet },
  { path: 'admin-list-search', component: ListSearchComponent },
  { path: 'admin-company', component: CreateCompany },
  { path: 'map-store', component: MapStoreComponent },
  { path: 'app-vendor-active-product', component: VendorUpdateProduct },
  { path: 'list-buy-vendor', component: AdminListBuyVendorComponet },
  { path: 'login', component: LoginComponent },
  { path: 'app-chat-bot-msg', component: ChatBotMsg  },



  
  { path: 'refer-product', component: ReferProduct },
  { path: '**', component: HomeComponent }
];






@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AlertComponent,
    ShareComponent,
    CalendarComponent,
    CityFilterComponent
    
    
    

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,    
    RouterModule.forRoot(appRouter)
    
 
   

 
  
  ],  
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
    

  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
