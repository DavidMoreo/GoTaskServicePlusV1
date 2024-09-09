"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_home_home_1 = require("./Component/Home/app.home-home");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_2 = require("@angular/common/http");
var HttpInterceptorService_1 = require("./Services/Common/HttpInterceptorService");
var common_1 = require("@angular/common");
var app_common_menu_1 = require("./Component/Common/Navegation/app.common-menu");
var app_tools_1 = require("./Component/Tools/app.tools");
var app_texttospeech_text_to_speech_1 = require("./Component/Tools/TextToSpeech/app.texttospeech-text-to-speech");
var app_subapp_download_videos_1 = require("./Component/Tools/DowloadYoutobe/app.subapp-download-videos");
var app_product_add_update_product_1 = require("./Component/Product/AddAndUpdateProduct/app.product-add-update-product");
var app_speechtospeech_speech_to_speech_1 = require("./Component/Tools/SpeechToSpeech/app.speechtospeech-speech-to-speech");
var app_product_select_product_1 = require("./Component/Product/SelectProduct/app.product-select-product");
var app_product_list_produc_search_1 = require("./Component/Product/ListProductSearch/app.product-list-produc-search");
var app_product_concept_1 = require("./Component/Product/Concept/app.product-concept");
var app_product_concept_c_1 = require("./Component/Vendor/ConceptVendor/app.product-concept_c");
var app_segurity_login_component_1 = require("./Component/Segurity/Login/app.segurity-login.component");
var app_segurity_register_1 = require("./Component/Segurity/Register/app.segurity-register");
var app_segurity_register_user_1 = require("./Component/Segurity/RegisterUser/app.segurity-register-user");
var app_home_menu_1 = require("./Component/Menu/app.home-menu");
var app_admin_project_1 = require("./Component/Admin/Project/app.admin-project");
var app_admin_company_1 = require("./Component/Admin/Company/app.admin-company");
var app_admin_user_1 = require("./Component/Admin/User/app.admin-user");
var app_product_list_favorite_search_1 = require("./Component/Customer/ListFavorite/app.product-list-favorite-search");
var app_project_menu_1 = require("./Component/Admin/ProjectMenu/app.project-menu");
var app_chat_bot_msg_1 = require("./Component/Common/ChatBotMsg/app.chat-bot-msg");
var app_chat_config_1 = require("./Component/Chat/ConfigChat/app.chat-config");
var app_customer_list_cart_1 = require("./Component/Customer/ListCart/app.customer-list-cart");
var app_customer_list_buy_1 = require("./Component/Customer/ListBuy/app.customer-list-buy");
var app_admin_list_buy_1 = require("./Component/Admin/ListBuy/app.admin-list-buy");
var app_admin_list_search_1 = require("./Component/Admin/ListSearch/app.admin-list-search");
var app_admin_rol_user_1 = require("./Component/Admin/RolUser/app.admin-rol-user");
var app_common_alert_1 = require("./Component/Common/Alert/app.common-alert");
var app_common_share_1 = require("./Component/Common/ShareProduct/app.common-share");
var app_common_calendar_1 = require("./Component/Common/Calendar/app.common-calendar");
var app_common_city_filter_1 = require("./Component/Common/CityFilter/app.common-city-filter");
var app_segurity_changed_password_user_1 = require("./Component/Segurity/ChangedPassword/app.segurity-changed-password-user");
var app_Iot_1 = require("./Component/Tools/Student/app.Iot");
var app_admin_project_vendor_1 = require("./Component/Vendor/ProjectVendor/app.admin-project-vendor");
var app_admin_store_trackingt_1 = require("./Component/Admin/ConceptStoreTracking/app.admin-store-trackingt");
var app_map_store_1 = require("./Component/MapStore/app.map-store");
var app_product_vendor_update_product_1 = require("./Component/Vendor/VendorActiveProduct/app.product-vendor-update-product");
var app_admin_list_buy_vendor_1 = require("./Component/Vendor/ListBuyVendor/app.admin-list-buy-vendor");
var app_product_refer_product_1 = require("./Component/Product/ReferProduct/app.product-refer-product");
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
var appRouter = [
    { path: '', component: app_home_home_1.HomeComponent },
    { path: 'register', component: app_segurity_register_1.Register },
    { path: 'register-user', component: app_segurity_register_user_1.RegisterUser },
    { path: 'changed-password-user', component: app_segurity_changed_password_user_1.ChangedPasswordUser },
    { path: 'home', component: app_home_home_1.HomeComponent },
    { path: 'tools', component: app_tools_1.ToolsComponent },
    { path: 'learn-iot', component: app_Iot_1.IotComponent },
    { path: 'text-to-speech', component: app_texttospeech_text_to_speech_1.TextToSpeechComponent },
    { path: 'youtube-download', component: app_subapp_download_videos_1.DownloadVideosComponent },
    { path: 'add-product', component: app_product_add_update_product_1.AddUpdateProduct },
    { path: 'update-product', component: app_product_add_update_product_1.AddUpdateProduct },
    { path: 'chat-speech', component: app_speechtospeech_speech_to_speech_1.SpeechToSpeechComponent },
    { path: 'select-product/:type', component: app_product_select_product_1.SelectProduct },
    { path: 'select-product/:type/:id', component: app_product_select_product_1.SelectProduct },
    { path: 'select-product/:type/:name/:id', component: app_product_select_product_1.SelectProduct },
    { path: 'select-product', component: app_product_select_product_1.SelectProduct },
    { path: 'select-product-search/:filter', component: app_product_list_produc_search_1.ListProductSearch },
    { path: 'conceptual-product', component: app_product_concept_1.ConceptProductControl },
    { path: 'customer-concept', component: app_product_concept_c_1.ConceptProductCustomer },
    { path: 'update-project-vendor', component: app_admin_project_vendor_1.UpdateProject },
    { path: 'product-cart', component: app_customer_list_cart_1.ListCartComponet },
    { path: 'product-buy', component: app_customer_list_buy_1.ListBuyComponet },
    { path: 'home-menu', component: app_home_menu_1.MenuComponent },
    { path: 'admin-project', component: app_admin_project_1.CreateProject },
    { path: 'store-tracking', component: app_admin_store_trackingt_1.ConceptStoreTrackingControl },
    { path: 'admin-rol-user', component: app_admin_rol_user_1.AdminRolUserComponent },
    { path: 'project-menu', component: app_project_menu_1.ProjectMenuComponent },
    { path: 'admin-user', component: app_admin_user_1.AdminteUser },
    { path: 'user-favorite', component: app_product_list_favorite_search_1.ListFavorite },
    { path: 'chat-bot', component: app_chat_bot_msg_1.ChatBotMsg },
    { path: 'chat-config', component: app_chat_config_1.ChatComponent },
    { path: 'admin-buy', component: app_admin_list_buy_1.AdminListBuyComponet },
    { path: 'admin-list-search', component: app_admin_list_search_1.ListSearchComponent },
    { path: 'admin-company', component: app_admin_company_1.CreateCompany },
    { path: 'map-store', component: app_map_store_1.MapStoreComponent },
    { path: 'app-vendor-active-product', component: app_product_vendor_update_product_1.VendorUpdateProduct },
    { path: 'list-buy-vendor', component: app_admin_list_buy_vendor_1.AdminListBuyVendorComponet },
    { path: 'login', component: app_segurity_login_component_1.LoginComponent },
    { path: 'app-chat-bot-msg', component: app_chat_bot_msg_1.ChatBotMsg },
    { path: 'refer-product', component: app_product_refer_product_1.ReferProduct },
    { path: '**', component: app_home_home_1.HomeComponent }
];
var AppModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                app_common_menu_1.NavMenuComponent,
                app_common_alert_1.AlertComponent,
                app_common_share_1.ShareComponent,
                app_common_calendar_1.CalendarComponent,
                app_common_city_filter_1.CityFilterComponent
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                http_1.HttpClientModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(appRouter)
            ],
            providers: [{
                    provide: http_2.HTTP_INTERCEPTORS,
                    multi: true,
                    useClass: HttpInterceptorService_1.AuthInterceptor
                }],
            bootstrap: [app_component_1.AppComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map