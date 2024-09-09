"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardActivate = void 0;
var core_1 = require("@angular/core");
(0, core_1.Injectable)({
    providedIn: 'root'
});
var GuardActivate = /** @class */ (function () {
    function GuardActivate(authService, router) {
        this.authService = authService;
        this.router = router;
        this._login = authService;
        this._router = router;
    }
    GuardActivate.prototype.canActivate = function () {
        //   if (false) {
        //     return true;
        //   } else {
        ///*     alert("ss");*/
        //   /*  this._router.navigate(['login']);*/
        //     return false;
        //   }
        this._router.navigate(['login']);
        return false;
    };
    return GuardActivate;
}());
exports.GuardActivate = GuardActivate;
//# sourceMappingURL=GuardActivate.js.map