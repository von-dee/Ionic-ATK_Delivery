webpackJsonp([11],{

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPageModule", function() { return CartPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CartPageModule = /** @class */ (function () {
    function CartPageModule() {
    }
    CartPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cart__["a" /* CartPage */]),
            ],
        })
    ], CartPageModule);
    return CartPageModule;
}());

//# sourceMappingURL=cart.module.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_request_api_request__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cart_cart__ = __webpack_require__(106);
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
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CartPage = /** @class */ (function () {
    function CartPage(navCtrl, navParams, storage, alertCtrl, api, cart, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.cart = cart;
        this.geolocation = geolocation;
        this.total_db = 0;
        this.userid = localStorage.getItem('UserID');
        this.fullname = localStorage.getItem('FullName');
        this.branchcode = localStorage.getItem('BranchCode');
        this.clustername = localStorage.getItem('BranchName');
        this.walletcode = localStorage.getItem('WalletCode');
        this.wallet_balance = localStorage.getItem('WalletBalance');
        this.beneficiaryname = localStorage.getItem('BeneficiaryName');
        this.beneficiarycode = localStorage.getItem('BeneficiaryID');
        this.benefiqrcode = localStorage.getItem('BeneficiaryQRCODE');
        this.orderPlaced_showmap = false;
        this.location = "Achimota ABC";
    }
    CartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartPage');
        this.getTotalPrice();
        this.loadcart();
        this.GetcartItemsNum();
        this.initMap();
        this.mapStatus();
    };
    CartPage.prototype.loadcart = function () {
        var _this = this;
        this.storage.get('currentcart').then(function (gottenitems) {
            _this.gottenitem = "[" + gottenitems + "]";
            _this.cartinfo = JSON.parse(_this.gottenitem);
            if (_this.cartinfo == '' || _this.cartinfo == '[]' || _this.cartinfo == null || _this.cartinfo == 'false') {
                _this.cartinfo = [];
            }
            console.log('Your cartitems are ', _this.cartinfo);
        });
    };
    CartPage.prototype.mapStatus = function () {
        var _this = this;
        this.storage.get('mapstatus').then(function (gottenitems) {
            if (gottenitems != null) {
                if (gottenitems == "pending") {
                    _this.orderPlaced_showmap = true;
                }
                else {
                    _this.orderPlaced_showmap = false;
                }
            }
        });
    };
    CartPage.prototype.initMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.locationlat = position.coords.latitude;
            _this.locationlong = position.coords.longitude;
            //  console.log("Your long and lat ",this.locationlat);
        }, function (err) {
            console.log(err);
        });
    };
    CartPage.prototype.Subtract_from_total = function (price) {
        var _this = this;
        // Store pin in database
        this.storage.get('pricetotal').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.total_db = Number(gottenitems) - Number(price);
                _this.storage.set('pricetotal', _this.total_db);
                console.log('Subtracting from total', _this.total_db);
            }
            else {
                _this.total_db = 0;
                console.log('Subtracting. Nothing dey total ', _this.total_db);
            }
        });
        this.total_db = this.total_db - price;
    };
    CartPage.prototype.getTotalPrice = function () {
        var _this = this;
        // Store pin in database
        this.storage.get('pricetotal').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.total_db = Number(gottenitems);
                console.log('Get Total Price Old', _this.total_db);
            }
            else {
                _this.total_db = 0;
                console.log('Get total price New ', _this.total_db);
            }
        });
    };
    CartPage.prototype.removeitem = function (item) {
        var _this = this;
        this.storage.get('currentcart').then(function (gottenitems) {
            _this.gottenitem = "[" + gottenitems + "]";
            _this.cartinfo = JSON.parse(_this.gottenitem);
            //this.cartinfo = this.cartinfo.filter(item => item.itemname !== itemname);
            var index = _this.cartinfo.findIndex(function (x) { return x.itemname == item.itemname; });
            console.log("Item Position", index);
            _this.cartinfo.splice(index, 1);
            if (_this.cartinfo === undefined || _this.cartinfo.length == 0) {
                console.log("Array is empty");
                _this.storage.remove('currentcart');
            }
            else {
                var cartinfo_var = JSON.stringify(_this.cartinfo);
                cartinfo_var = cartinfo_var.replace('[', '');
                cartinfo_var = cartinfo_var.replace(']', '');
                _this.storage.set('currentcart', cartinfo_var);
            }
            var pricetot = Number(item.itemprice) * Number(item.itemquantity);
            _this.Subtract_from_total(pricetot);
            console.log("Item Removed");
        });
        this.Subtract_from_total(item.itemprice);
        this.ReduceCartItemsNum();
    };
    CartPage.prototype.pagepop = function () {
        this.navCtrl.pop();
    };
    CartPage.prototype.ReduceCartItemsNum = function () {
        this.count_now = localStorage.getItem('CartCount');
        console.log('Cart total ', this.count_now);
        if (this.count_now === undefined || this.count_now == null || this.count_now == "") {
            console.log('Cart total Nill');
        }
        else {
            this.count_now = Number(this.count_now) - 1;
            localStorage.setItem('CartCount', this.count_now);
            console.log('Cart total Deduction done');
        }
    };
    CartPage.prototype.refreshPage = function () {
        console.log('Page is refreshed ');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        //this.viewCtrl.getContent();
    };
    CartPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm purchase',
            message: 'Do you want to buy?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buy',
                    handler: function () {
                        console.log('Confired transaction. Buy clicked');
                        _this.SetMapStatus("pending");
                        _this.checkout();
                    }
                }
            ]
        });
        alert.present();
    };
    CartPage.prototype.checkout = function () {
        var _this = this;
        this.action = "&actions=savetransaction";
        this.data = '&transusercode=' + this.userid + '&transqrcode=' + this.benefiqrcode + '&walletcode=' + this.walletcode + '&producttotalcost=' + this.total_db + '&productlist=' + this.gottenitem + '&location=' + this.location + '&locationlat=' + this.locationlat + '&locationlong=' + this.locationlong + '&username=' + this.fullname;
        this.api.postData(this.action, this.data).then(function (res) {
            _this.items = JSON.parse(res['_body']).response;
            var transcode_ = JSON.parse(res['_body']).data;
            console.log(_this.items);
            if (_this.items == 'true') {
                localStorage.setItem('Transaction_Code', transcode_);
            }
            else {
                _this.api.errorToast('Processing Error!');
            }
        }).catch(function (err) {
            console.log(err);
        });
        this.toMapPage();
    };
    CartPage.prototype.toMapPage = function () {
        this.navCtrl.push('MaplocPage');
    };
    CartPage.prototype.SetMapStatus = function (type) {
        // Store pin in database
        if (type == "pending") {
            this.storage.set('mapstatus', "pending");
            console.log("Set map status to pending");
        }
        else {
            this.storage.set('mapstatus', "none");
            console.log("Set map status to none");
        }
    };
    CartPage.prototype.showAlert = function (message_title, message_detail) {
        var alert = this.alertCtrl.create({
            title: message_title,
            subTitle: message_detail,
            buttons: ['OK']
        });
        alert.present();
    };
    CartPage.prototype.GetcartItemsNum = function () {
        var _this = this;
        // Store pin in database
        this.storage.get('cartItemsNum').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.totalItems_db = Number(gottenitems);
            }
            else {
                _this.totalItems_db = 0;
            }
        });
    };
    CartPage.prototype.update_quantity = function (operation_type, productname, productprice) {
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
    CartPage.prototype.quantityedit = function (type, productname, productprice) {
        if (type == "add") {
            this.update_quantity("add", productname, productprice);
        }
        else {
            if (this.item_quantity_num != 1) {
                this.update_quantity("substract", productname, productprice);
            }
        }
    };
    CartPage.prototype.edittotal = function (type, price) {
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
    CartPage.prototype.cart_number_edit = function (type) {
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
    CartPage.prototype.clear_Cart = function () {
        this.storage.remove('currentcart');
        this.storage.remove('pricetotal');
        localStorage.removeItem('CartCount');
        this.cartinfo = [];
        this.total_db = 0;
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\cart\cart.html"*/'<!--\n  Generated template for the Cart page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n\n<ion-content>\n\n    <div class="">\n        <ion-icon name="close" style="font-size: 1.5em !important; color: #73380d; margin-right: 15px;  margin-top: 15px; float:right;" (tap)="pagepop()"></ion-icon>\n      </div>\n  \n      <div class="">\n        <p style="margin-left: 1.5em;">\n          <span style="font-size: 1.5em;border-right: solid 1px #73380d; font-weight: 100;padding-right: 5px; color: #73380d;">Cart</span>\n          <span style="font-size: 0.8em;font-weight: 100;color: #c3c3c3;margin-left: 5em;">Total <span style="font-size: 1.8em; color: #000;margin-left: 4px;">GHS {{total_db}}</span></span>\n        </p>\n      </div>\n  \n  \n      <div class="">\n        <ion-grid>\n          <ion-row style="border: 1px solid #f7f7f7;">\n            <p style="margin-left: 1em;"> Cart Item List</p>\n          </ion-row>\n\n          <ion-row style="border-bottom: 1px solid #f7f7f7;" *ngFor="let item of cartinfo">\n              <ion-col col-4>\n                <p class="tbitem">{{ item.itemname }}</p>\n              </ion-col>\n              <ion-col col-3>\n                <p class="tbitem">{{ item.itemprice }}</p>\n              </ion-col>\n              <ion-col col-5 style="text-align: center;">\n                  <ion-row style="border-bottom: 1px solid #f7f7f7;" >\n                    <div style="width: 100%;">\n                        <button ion-button style="background: transparent;box-shadow: none;float: right;" (tap)="removeitem(item)">\n                            <ion-icon name="ios-trash-outline" style="font-size: 2em !important;font-size: 2em !important;color: rgb(37, 42, 49);"></ion-icon>\n                        </button>\n                    </div>\n                  </ion-row>\n\n                  <ion-row style="border: 1px solid #e2e2e2; border-radius: 5px; height: 3em;" >\n                    <ion-col col-4>\n                        <button style="background: transparent;box-shadow: none;margin-top: 0;" (tap)="quantityedit(\'add\',item.itemname,item.itemprice)">\n                            <ion-icon name="md-add" style="font-size: 1em !important;font-size: 2em !important;color: rgb(37, 42, 49);"></ion-icon>\n                        </button>\n                    </ion-col>\n                    <ion-col col-4 style="text-align: center; padding-top: 0.3em;">\n                        <p style="margin: 0em;margin-top: 0.2em; font-size: 1.5em;color: #6f6f6f;">{{ item.itemquantity }}</p>\n                    </ion-col>\n                    <ion-col col-4 style="text-align: center; padding-top: 0.3em;">\n                        <button ion-button style="background: transparent;box-shadow: none;margin-top: 0;" (tap)="quantityedit(\'subtract\',item.itemname,item.itemprice)">\n                            <ion-icon name="md-remove" style="font-size: 1em !important;font-size: 2em !important;color: rgb(37, 42, 49);"></ion-icon>\n                        </button>\n                    </ion-col>\n                  </ion-row>\n              </ion-col>\n            </ion-row>\n\n        </ion-grid>\n      </div>  \n</ion-content>\n\n\n<ion-footer>\n    <ion-grid style="padding: 0;">\n      <ion-row *ngIf="orderPlaced_showmap == true">\n        <ion-col col-9>\n\n        </ion-col>\n        <ion-col col-3 style="padding: 0;" >\n          <button  (tap)="toMapPage()"  ion-button full style="margin: 0;height: 3.5em;  background-color: #73380d;">Map <ion-icon name="md-map" style="font-size: 2em !important;color: #fff; margin-left: 12px;"></ion-icon></button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row *ngIf="orderPlaced_showmap == false">\n        <ion-col col-8>\n        </ion-col>\n        <ion-col col-4 style="padding: 0;" >\n          <button  (tap)="presentConfirm()"  ion-button full style="margin: 0;height: 3.5em;  background-color: #73380d;">Check Out <ion-icon name="ios-cart" style="font-size: 2em !important;color: #fff; margin-left: 12px;"></ion-icon></button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-footer>'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\cart\cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_api_request_api_request__["a" /* ApiRequestProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_cart_cart__["a" /* CartProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ })

});
//# sourceMappingURL=11.js.map