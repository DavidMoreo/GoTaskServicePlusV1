"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
//export function getBaseUrl() {
//  return document.getElementsByTagName('base')[0].href;
//}
//const providers = [
//  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
//];
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map