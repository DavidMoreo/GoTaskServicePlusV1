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
exports.CountStatusBuys = exports.MovementConceptType = exports.MovementType = exports.ConceptUser = exports.tblBuyerCustomer = exports.tblBuyerCustomerConcept = void 0;
var tblProduct_1 = require("./tblProduct");
var tblBuyerCustomerConcept = /** @class */ (function () {
    function tblBuyerCustomerConcept() {
    }
    return tblBuyerCustomerConcept;
}());
exports.tblBuyerCustomerConcept = tblBuyerCustomerConcept;
var tblBuyerCustomer = /** @class */ (function (_super) {
    __extends(tblBuyerCustomer, _super);
    function tblBuyerCustomer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return tblBuyerCustomer;
}(tblProduct_1.Concept));
exports.tblBuyerCustomer = tblBuyerCustomer;
var ConceptUser = /** @class */ (function () {
    function ConceptUser() {
    }
    return ConceptUser;
}());
exports.ConceptUser = ConceptUser;
var MovementType = /** @class */ (function () {
    function MovementType() {
        this.purchaseGenerated = "PurchaseGenerated";
        this.purchaseCancelled = "PurchaseCancelled";
        this.purchaseCancelledByCustomer = "PurchaseCancelledByCustomer";
        this.purchaseCancelledByVendor = "PurchaseCancelledByVendor";
        this.purchaseCancelledByAdmin = "PurchaseCancelledByAdmin";
        this.purchaseInProcess = "PurchaseInProcess";
        this.purchaseInDelivery = "PurchaseInDelivery";
        this.purchaseCompleted = "PurchaseCompleted";
        this.cartActive = "CartActive";
        this.cartSaveTemp = "CartSaveTemp";
        this.favoriteActive = "FavoriteActive";
    }
    return MovementType;
}());
exports.MovementType = MovementType;
var MovementConceptType = /** @class */ (function () {
    function MovementConceptType() {
        this.purchase = "Purchase";
        this.carOfPurchase = "CarOfPurchase";
        this.favorite = "Favorite";
    }
    return MovementConceptType;
}());
exports.MovementConceptType = MovementConceptType;
var CountStatusBuys = /** @class */ (function () {
    function CountStatusBuys() {
    }
    return CountStatusBuys;
}());
exports.CountStatusBuys = CountStatusBuys;
//# sourceMappingURL=tblBuyerCustomer.js.map