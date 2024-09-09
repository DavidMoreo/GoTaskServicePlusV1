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
exports.Permission = exports.AddressData = exports.tblRol = exports.TypeValidateUser = exports.TypeStatusRegister = exports.tblUser = void 0;
var tblProduct_1 = require("../../Structure/tblProduct");
var tblUser = /** @class */ (function (_super) {
    __extends(tblUser, _super);
    function tblUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rolUser = new Array;
        _this.rolUserActive = new tblRol;
        _this.password = "";
        _this.keyPassword = "";
        _this.imgUrl = "";
        _this.email = "";
        _this.mobileNumber = "";
        _this.statusRegister = TypeStatusRegister.Defaul;
        _this.listShoppingCart = new Array;
        _this.listFavorites = new Array;
        _this.addressList = new Array;
        _this.listMyLikes = new Array;
        return _this;
    }
    return tblUser;
}(tblProduct_1.Concept));
exports.tblUser = tblUser;
var TypeStatusRegister;
(function (TypeStatusRegister) {
    TypeStatusRegister[TypeStatusRegister["CodigoEnvido"] = 0] = "CodigoEnvido";
    TypeStatusRegister[TypeStatusRegister["PendienteValidar"] = 1] = "PendienteValidar";
    TypeStatusRegister[TypeStatusRegister["CorreoValidao"] = 2] = "CorreoValidao";
    TypeStatusRegister[TypeStatusRegister["Defaul"] = 3] = "Defaul";
})(TypeStatusRegister || (exports.TypeStatusRegister = TypeStatusRegister = {}));
var TypeValidateUser;
(function (TypeValidateUser) {
    TypeValidateUser[TypeValidateUser["Get"] = 0] = "Get";
    TypeValidateUser[TypeValidateUser["Save"] = 1] = "Save";
    TypeValidateUser[TypeValidateUser["Delete"] = 2] = "Delete";
})(TypeValidateUser || (exports.TypeValidateUser = TypeValidateUser = {}));
var tblRol = /** @class */ (function (_super) {
    __extends(tblRol, _super);
    function tblRol() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permissionByRoll = new Permission;
        _this.isPublic = true;
        _this.isCustomer = false;
        _this.isAdmin = false;
        _this.isVendor = false;
        _this.isMaker = false;
        return _this;
    }
    return tblRol;
}(tblProduct_1.Concept));
exports.tblRol = tblRol;
var AddressData = /** @class */ (function () {
    function AddressData() {
    }
    return AddressData;
}());
exports.AddressData = AddressData;
var Permission = /** @class */ (function () {
    function Permission() {
    }
    return Permission;
}());
exports.Permission = Permission;
//# sourceMappingURL=RegisterModel.js.map