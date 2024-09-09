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
exports.TypePrice = exports.tblReferProduct = void 0;
var tblProduct_1 = require("../Structure/tblProduct");
var tblReferProduct = /** @class */ (function (_super) {
    __extends(tblReferProduct, _super);
    function tblReferProduct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refer = "";
        _this.quantity = 0;
        _this.price = 0;
        _this.prices = new Array;
        return _this;
    }
    return tblReferProduct;
}(tblProduct_1.Concept));
exports.tblReferProduct = tblReferProduct;
var TypePrice = /** @class */ (function () {
    function TypePrice() {
        this.isQuantity = "IsQuantity";
        this.isACost = "IsACostInMoney";
        this.isADiscount = "isADiscounInMoney";
        this.isADiscountInPorcentage = "isADiscountInPorcentage";
        this.isProfitInMoney = "IsProfitInMoney";
        this.isProfitInPorcentage = "IsProfitInPorcentage";
    }
    return TypePrice;
}());
exports.TypePrice = TypePrice;
//# sourceMappingURL=ReferProduct.js.map