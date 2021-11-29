webpackJsonp([4],{

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductdetailsPageModule", function() { return ProductdetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__productdetails__ = __webpack_require__(327);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProductdetailsPageModule = /** @class */ (function () {
    function ProductdetailsPageModule() {
    }
    ProductdetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__productdetails__["a" /* ProductdetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__productdetails__["a" /* ProductdetailsPage */]),
            ],
        })
    ], ProductdetailsPageModule);
    return ProductdetailsPageModule;
}());

//# sourceMappingURL=productdetails.module.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductdetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProductdetailsPage = /** @class */ (function () {
    function ProductdetailsPage(navCtrl, navParams, storage, apiReq) {
        // this.url=localStorage.getItem('PhotoUrl')+'/products/';
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.apiReq = apiReq;
        this.currency = "₵";
        this.item_exists = false;
        // this.url="http://localhost/atk.api/media/uploads/products/"; 
        this.url = "http://tuyoinc.com/atk.api/media/uploads/products/";
        this.productcode = this.navParams.get('productcode');
        this.productname = this.navParams.get('productname');
        this.productprice = this.navParams.get('productprice');
        this.productimg = this.navParams.get('productimg');
        this.productphoto = this.navParams.get('productphoto');
        this.beneficiarycode = localStorage.getItem('BeneficiaryID');
        var count = localStorage.getItem('CartCount');
        if (count) {
            this.cartcount = count;
        }
        else {
            this.cartcount = 0;
        }
        this.item_quantity_num = 1;
    }
    ProductdetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductdetailsPage');
    };
    ProductdetailsPage.prototype.ionViewDidEnter = function () {
        this.cartcount = localStorage.getItem('CartCount');
        this.loadcart();
    };
    ProductdetailsPage.prototype.opencart = function () {
        this.navCtrl.push('CartPage');
    };
    ProductdetailsPage.prototype.quantityedit = function (type, productname, productprice) {
        if (this.item_exists == true) {
            this.quantityedit_new(type, productname, productprice);
        }
        else {
            if (type == "add") {
                this.item_quantity_num = this.item_quantity_num + 1;
            }
            else {
                if (this.item_quantity_num != 1) {
                    this.item_quantity_num = this.item_quantity_num - 1;
                }
            }
        }
    };
    ProductdetailsPage.prototype.quantityedit_new = function (type, productname, productprice) {
        if (type == "add") {
            this.update_quantity("add", productname, productprice);
        }
        else {
            if (this.item_quantity_num != 1) {
                this.update_quantity("substract", productname, productprice);
            }
        }
    };
    ProductdetailsPage.prototype.update_quantity = function (operation_type, productname, productprice) {
        if (operation_type == "add") {
            var index_of_product = this.cartinfo.findIndex(function (item) { return item.itemname === productname; });
            var current_quantity = this.cartinfo[index_of_product]['itemquantity'];
            this.item_quantity_num = Number(current_quantity) + 1;
            this.cartinfo[index_of_product]['itemquantity'] = this.item_quantity_num;
            var cartinfostring = JSON.stringify(this.cartinfo);
            cartinfostring = cartinfostring.replace('[', '');
            cartinfostring = cartinfostring.replace(']', '');
            this.storage.set('currentcart', cartinfostring);
            this.edittotal("add", productprice);
            console.log('Your addition', this.item_quantity_num);
        }
        else {
            var index_of_product = this.cartinfo.findIndex(function (item) { return item.itemname === productname; });
            var current_quantity_sub = this.cartinfo[index_of_product]['itemquantity'];
            this.item_quantity_num = Number(current_quantity_sub) - 1;
            this.cartinfo[index_of_product]['itemquantity'] = this.item_quantity_num;
            var cartinfostring_sub = JSON.stringify(this.cartinfo);
            cartinfostring_sub = cartinfostring_sub.replace('[', '');
            cartinfostring_sub = cartinfostring_sub.replace(']', '');
            this.storage.set('currentcart', cartinfostring_sub);
            this.edittotal("subtract", productprice);
            console.log('Your subtraction', this.item_quantity_num);
        }
    };
    ProductdetailsPage.prototype.edittotal = function (type, price) {
        var _this = this;
        // Store total price in database
        this.storage.get('pricetotal').then(function (gottenitems) {
            if (gottenitems != null) {
                if (type == "add") {
                    _this.total_db = Number(gottenitems) + Number(price);
                    _this.storage.set('pricetotal', _this.total_db);
                    _this.cart_number_edit("add");
                    console.log('Total add', _this.total_db);
                }
                else {
                    _this.total_db = Number(gottenitems) - Number(price);
                    _this.storage.set('pricetotal', _this.total_db);
                    _this.cart_number_edit("minus");
                    console.log('Total subtract', _this.total_db);
                }
            }
        });
    };
    ProductdetailsPage.prototype.cart_number_edit = function (type) {
        if (type == "add") {
            var count = localStorage.getItem('CartCount');
            var count_now = Number(count) + 1;
            localStorage.setItem('CartCount', JSON.stringify(count_now));
        }
        else {
            var count_minus = localStorage.getItem('CartCount');
            var count_now_minus = Number(count_minus) - 1;
            localStorage.setItem('CartCount', JSON.stringify(count_now_minus));
        }
    };
    ProductdetailsPage.prototype.loadcart = function () {
        var _this = this;
        this.storage.get('currentcart').then(function (gottenitems) {
            _this.gottenitem = "[" + gottenitems + "]";
            _this.cartinfo = JSON.parse(_this.gottenitem);
            if (_this.cartinfo == '' || _this.cartinfo == '[]' || _this.cartinfo == null || _this.cartinfo == 'false') {
                _this.cartinfo = [];
            }
            console.log('Your cartitems are ', _this.cartinfo);
            _this.check_quantity(_this.productname);
        });
    };
    ProductdetailsPage.prototype.check_quantity = function (productname) {
        if (this.cartinfo.length != 0) {
            var index_of_product = this.cartinfo.findIndex(function (item) { return item.itemname === productname; });
            if (index_of_product >= 0) {
                this.item_quantity_num = this.cartinfo[index_of_product]['itemquantity'];
                console.log('Exists True ');
                this.item_exists = true;
            }
            else {
                this.item_quantity_num = 1;
                console.log('Does not exist ');
                this.item_exists = false;
            }
            console.log('Got into the check quantity section', this.item_quantity_num);
        }
        else {
            this.item_exists = false;
        }
    };
    ProductdetailsPage.prototype.addToCart = function (itemcode, itemname, itemprice) {
        var _this = this;
        // Store pin in database
        this.storage.get('currentcart').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.cartcount = Number(_this.cartcount) + 1;
                localStorage.setItem('CartCount', JSON.stringify(_this.cartcount));
                _this.cartinfo = { itemcode: itemcode, itemname: itemname, itemprice: itemprice, itemquantity: _this.item_quantity_num };
                var cartinfostring = JSON.stringify(_this.cartinfo);
                var newcartinfo = gottenitems + "," + cartinfostring;
                _this.storage.set('currentcart', newcartinfo);
                _this.apiReq.successToast('Product Added to Cart');
                console.log('Your cart items are ', newcartinfo);
            }
            else {
                _this.cartcount = Number(_this.cartcount) + 1;
                localStorage.setItem('CartCount', JSON.stringify(_this.cartcount));
                _this.cartinfo = { itemcode: itemcode, itemname: itemname, itemprice: itemprice, itemquantity: _this.item_quantity_num };
                _this.cartinfo = JSON.stringify(_this.cartinfo);
                _this.storage.set('currentcart', _this.cartinfo);
                _this.apiReq.successToast('Product Added to Cart');
                console.log('Your cart item is stored');
            }
        });
        var Current_itemtotalcost = Number(itemprice) * Number(this.item_quantity_num);
        this.carttotal(Current_itemtotalcost);
        this.item_exists = true;
    };
    ProductdetailsPage.prototype.carttotal = function (price) {
        var _this = this;
        console.log("Calc total ", price);
        // Store pin in database
        this.storage.get('pricetotal').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.total_db = Number(gottenitems) + Number(price);
                _this.storage.set('pricetotal', _this.total_db);
                console.log('Total not new', _this.total_db);
            }
            else {
                _this.total_db = Number(price);
                _this.storage.set('pricetotal', _this.total_db);
                console.log('Total ', _this.total_db);
            }
        });
    };
    ProductdetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-productdetails',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\productdetails\productdetails.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>{{productname}}</ion-title>\n    <ion-buttons class="cart" (tap)="opencart()" end>\n      <!-- <div class="badge" *ngIf="cartcount" style="color: white;">{{cartcount}}</div> -->\n      <button ion-button icon-only >\n        <span style="margin-right: 0.3em">{{cartcount}}</span>\n        <ion-icon name="ios-cart"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="productimg">\n    <img src="{{url+productphoto}}">\n    <!-- <img src="img/barbecue.jpg">  -->\n  </div>\n  <!-- *ngIf="beneficiarycode" -->\n  <div class="addtocart" *ngIf="item_exists == false">\n    <button ion-button color="dark" (tap)="addToCart(productcode,productname,productprice)">\n      <ion-icon id="plus" name="md-add"></ion-icon><ion-icon name="md-cart"></ion-icon>\n    </button>\n  </div>\n\n  <ion-card no padding>\n      <ion-grid style="padding: 0;">\n          <ion-row>\n            <ion-col col-7>\n                <span>\n                  <b>Food :</b> {{productname}}</span>\n                <div>\n                <span>\n                  <b>Price : </b><span>&#8373;</span> {{productprice}}\n                </span>\n              </div>\n            </ion-col>\n            <ion-col col-5 style="padding: 0;" >\n              <div >\n                <button ion-button class="quantitybtn" (tap)="quantityedit(\'add\',productname,productprice)">\n                  <ion-icon name="md-add" style="font-size: 1.5em !important;color: rgb(37, 42, 49);"></ion-icon>\n                </button>\n                <span style="font-size: 1.5em;color: #72380e;">{{item_quantity_num}} </span>\n                <button ion-button class="quantitybtn" (tap)="quantityedit(\'substract\',productname,productprice)">\n                    <ion-icon name="md-remove" style="font-size: 1.5em !important;color: rgb(37, 42, 49);"></ion-icon>\n                </button>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n    \n  </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\productdetails\productdetails.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */]])
    ], ProductdetailsPage);
    return ProductdetailsPage;
}());

//# sourceMappingURL=productdetails.js.map

/***/ })

});
//# sourceMappingURL=4.js.map