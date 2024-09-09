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
exports.ConceptCategory = exports.tblCharacteristics = exports.tblPrices = exports.ConceptProduct = exports.NameConcept = exports.TypeConcepValue = exports.tblConcepValue = exports.TypeImgDbMode = exports.ImgItem = exports.tblProduct = exports.Concept = void 0;
var Concept = /** @class */ (function () {
    function Concept() {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.idProject = "00000000-0000-0000-0000-000000000000";
        this.idCompany = "00000000-0000-0000-0000-000000000000";
        this.conceptCompany = new NameConcept;
        this.conceptProject = new NameConcept;
        this.conceptPrevious = new NameConcept;
        this.urlReferProduct = new NameConcept;
        this.name = "";
        this.code = "";
        this.creationDate = "1999-01-01";
        this.editDate = "1999-01-01";
        this.inUse = false;
        this.disable = false;
    }
    Concept.prototype.getCreationDate = function () {
        return new Date(this.creationDate);
    };
    Concept.prototype.getEditDate = function () {
        return new Date(this.editDate);
    };
    return Concept;
}());
exports.Concept = Concept;
var tblProduct = /** @class */ (function (_super) {
    __extends(tblProduct, _super);
    function tblProduct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.referNumber = "";
        _this.quantity = 0;
        _this.interestedBuyers = 0;
        _this.negativeRating = 0;
        _this.positiveRating = 0;
        _this.countRating = 0;
        _this.actualPrice = 0;
        _this.priceString = "$0";
        _this.adress = new tblConcepValue;
        _this.isPublic = false;
        _this.isProduct = true;
        _this.imgList = new Array;
        _this.firsImg = new ImgItem();
        _this.typeCurrency = new tblConcepValue();
        _this.prices = new Array;
        _this.historyOfPrice = new Array;
        _this.characteristics = new Array();
        _this.typeOfProduct = new tblConcepValue();
        _this.filterISearch = new Array();
        _this.distance = 0;
        _this.typeProductName = "";
        return _this;
    }
    tblProduct.prototype.getIsAvailable = function () {
        return (this.quantity > 0);
    };
    tblProduct.prototype.getIsPublic = function () {
        return (this.status.name.toLowerCase() == "public");
    };
    return tblProduct;
}(Concept));
exports.tblProduct = tblProduct;
var ImgItem = /** @class */ (function (_super) {
    __extends(ImgItem, _super);
    function ImgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = "";
        _this.nameVisible = "";
        _this.typeImgDb = 0;
        return _this;
    }
    ImgItem.prototype.GetStringToTypeImgDb = function (mode) {
        return mode;
    };
    return ImgItem;
}(Concept));
exports.ImgItem = ImgItem;
var TypeImgDbMode;
(function (TypeImgDbMode) {
    TypeImgDbMode[TypeImgDbMode["Defaul"] = 0] = "Defaul";
    TypeImgDbMode[TypeImgDbMode["Drive"] = 1] = "Drive";
    TypeImgDbMode[TypeImgDbMode["Storage"] = 2] = "Storage";
    TypeImgDbMode[TypeImgDbMode["File"] = 3] = "File";
})(TypeImgDbMode || (exports.TypeImgDbMode = TypeImgDbMode = {}));
var tblConcepValue = /** @class */ (function (_super) {
    __extends(tblConcepValue, _super);
    function tblConcepValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.concept = new NameConcept();
        _this.value = "";
        _this.type = "";
        return _this;
    }
    return tblConcepValue;
}(Concept));
exports.tblConcepValue = tblConcepValue;
var TypeConcepValue = /** @class */ (function () {
    function TypeConcepValue() {
    }
    TypeConcepValue.DeliveryModeConcept = function () { return "DeliveryModeConcept"; };
    // static AdressConcept(): string { return "AdressConcept"; }
    TypeConcepValue.ConceptStoreTracking = function () { return "ConceptStoreTracking"; };
    TypeConcepValue.CoutryConcept = function () { return "CoutryConcept"; };
    TypeConcepValue.CityConcept = function () { return "CityConcept"; };
    TypeConcepValue.StatusProductConcept = function () { return "StatusProductConcept"; };
    TypeConcepValue.AvailableDayConcept = function () { return "AvailableDayConcept"; };
    TypeConcepValue.AdressConcept = function () { return "AdressConcept"; };
    TypeConcepValue.TypeProduct = function () { return "TypeProduct"; };
    TypeConcepValue.CalendarHour = function () { return "CalendarHour"; };
    TypeConcepValue.GetListConcept = function () {
        var list = new Array();
        var item = new NameConcept();
        //list.push({ value: this.DeliveryModeConcept(), name: "Modo de entrega",permission:"public" });
        //list.push({ value: this.CityConcept(), name: "Ciudad", permission:"public" });
        //list.push({ value: this.CoutryConcept(), name: "País", permission:"public" });
        //list.push({ value: this.StatusProductConcept(), name: "Estatus de producto", permission: "public" });
        //list.push({ value: this.AvailableDayConcept(), name: "Disponibilidad de producto", permission: "public" });
        //list.push({ value: this.AdressConcept(), name: "Dirección", permission: "public" });
        return list;
    };
    return TypeConcepValue;
}());
exports.TypeConcepValue = TypeConcepValue;
var NameConcept = /** @class */ (function () {
    function NameConcept() {
        this.name = "";
        this.value = "";
        this.id = "00000000-0000-0000-0000-000000000000";
    }
    return NameConcept;
}());
exports.NameConcept = NameConcept;
var ConceptProduct = /** @class */ (function () {
    function ConceptProduct() {
        this.name = "";
        this.quantity = 0;
        this.id = "00000000-0000-0000-0000-000000000000";
    }
    return ConceptProduct;
}());
exports.ConceptProduct = ConceptProduct;
//export class tblConceptData extends Concept { 
//  typeConceptValue: string = '';
//  typeValue: string = '';
//  isPublic: boolean = false;
//  value: number = 0;
//  description: number = 0;
//  conceptType: TypeConcept = TypeConcept.ModeType;
//}
var TypeConcept;
(function (TypeConcept) {
    TypeConcept[TypeConcept["ModeType"] = 0] = "ModeType";
    TypeConcept[TypeConcept["ModeValue"] = 1] = "ModeValue";
})(TypeConcept || (TypeConcept = {}));
var tblPrices = /** @class */ (function (_super) {
    __extends(tblPrices, _super);
    function tblPrices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.price = 0;
        _this.typeAction = "";
        _this.isPublic = false;
        return _this;
    }
    return tblPrices;
}(Concept));
exports.tblPrices = tblPrices;
var tblCharacteristics = /** @class */ (function (_super) {
    __extends(tblCharacteristics, _super);
    function tblCharacteristics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = '';
        return _this;
    }
    return tblCharacteristics;
}(Concept));
exports.tblCharacteristics = tblCharacteristics;
var ConceptCategory = /** @class */ (function () {
    function ConceptCategory() {
    }
    return ConceptCategory;
}());
exports.ConceptCategory = ConceptCategory;
//# sourceMappingURL=tblProduct.js.map