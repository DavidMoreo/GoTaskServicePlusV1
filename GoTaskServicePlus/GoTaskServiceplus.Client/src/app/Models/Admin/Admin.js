"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConceptProject = exports.tblProject = exports.tblCompany = void 0;
var tblProduct_1 = require("../Structure/tblProduct");
var tblCompany = /** @class */ (function (_super) {
    __extends(tblCompany, _super);
    function tblCompany() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "";
        _this.nit = "";
        _this.TypeCompanyMode = "";
        return _this;
    }
    return tblCompany;
}(tblProduct_1.Concept));
exports.tblCompany = tblCompany;
var tblProject = /** @class */ (function (_super) {
    __extends(tblProject, _super);
    function tblProject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "";
        _this.gpsGoogle = "";
        _this.mobileNumber = "";
        _this.phoneNumber = "";
        _this.isWhatsApp = false;
        _this.addressItemId = "";
        _this.typeCompanyMode = "";
        _this.storeOpeningTime = "";
        _this.storeClosingTime = "";
        return _this;
    }
    return tblProject;
}(tblProduct_1.Concept));
exports.tblProject = tblProject;
var ConceptProject = /** @class */ (function () {
    function ConceptProject() {
    }
    return ConceptProject;
}());
exports.ConceptProject = ConceptProject;
//# sourceMappingURL=Admin.js.map