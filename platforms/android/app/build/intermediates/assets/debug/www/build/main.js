webpackJsonp([13],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
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
// import { HttpClient } from '@angular/common/http';




/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var CartProvider = /** @class */ (function () {
    function CartProvider(http, apiReq, storage) {
        this.http = http;
        this.apiReq = apiReq;
        this.storage = storage;
        this.currency = "₵";
        this.item_exists = false;
        this.descending = false;
        console.log('Hello CartProvider Provider');
        this.url = localStorage.getItem('PhotoUrl') + '/products/';
        this.productcode = localStorage.getItem('Productcode');
        this.productcode = localStorage.getItem('productname');
        this.clustername = localStorage.getItem('BranchCode');
        this.total_db = 0;
    }
    CartProvider.prototype.count_me = function () {
        var count = localStorage.getItem('CartCount');
        if (count) {
            this.cartcount = count;
        }
        else {
            this.cartcount = 0;
        }
        return this.cartcount;
    };
    CartProvider.prototype.loadData = function () {
        var _this = this;
        this.items = [];
        this.actions = "&actions=productfetch";
        this.data = "&prclustercode=" + this.clustername;
        this.apiReq.postData(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            console.log(repo + ' I have data!');
            if (repo.msg == 'true') {
                _this.items = repo.data;
            }
            else {
                _this.apiReq.errorToast('Network is slow');
            }
        });
    };
    CartProvider.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    CartProvider.prototype.addToCart = function (itemcode, itemname, itemprice) {
        var _this = this;
        // Store pin in database
        this.storage.get('currentcart').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.cartcount = Number(_this.cartcount) + 1;
                localStorage.setItem('CartCount', JSON.stringify(_this.cartcount));
                _this.cartinfo = { itemcode: itemcode, itemname: itemname, itemprice: itemprice, itemquantity: 1 };
                var cartinfostring = JSON.stringify(_this.cartinfo);
                var newcartinfo = gottenitems + "," + cartinfostring;
                _this.storage.set('currentcart', newcartinfo);
                _this.apiReq.successToast('Product Added to Cart');
                console.log('Your cart items are ', newcartinfo);
            }
            else {
                _this.cartcount = Number(_this.cartcount) + 1;
                localStorage.setItem('CartCount', JSON.stringify(_this.cartcount));
                _this.cartinfo = { itemcode: itemcode, itemname: itemname, itemprice: itemprice, itemquantity: 1 };
                _this.cartinfo = JSON.stringify(_this.cartinfo);
                _this.storage.set('currentcart', _this.cartinfo);
                _this.apiReq.successToast('Product Added to Cart');
                console.log('Your cart item is stored');
            }
        });
        this.carttotal(itemprice);
        this.cartItemsNum();
    };
    CartProvider.prototype.carttotal = function (price) {
        var _this = this;
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
    CartProvider.prototype.cartItemsNum = function () {
        var _this = this;
        // Store pin in database
        this.storage.get('cartItemsNum').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.totalItems_db = Number(gottenitems) + 1;
                _this.storage.set('cartItemsNum', _this.totalItems_db);
                console.log('Total Items in cart Not New', _this.totalItems_db);
            }
            else {
                _this.totalItems_db = 1;
                _this.storage.set('cartItemsNum', _this.totalItems_db);
                console.log('Total Items in cart Old', _this.totalItems_db);
            }
        });
    };
    CartProvider.prototype.GetcartItemsNum = function () {
        var _this = this;
        // Store pin in database
        this.storage.get('cartItemsNum').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.totalItems_db = Number(gottenitems);
            }
        });
    };
    CartProvider.prototype.checkout = function (action, data) {
        var _this = this;
        this.apiReq.postData(action, data).then(function (res) {
            _this.items = JSON.parse(res['_body']).response;
            console.log(_this.items);
            if (_this.items == 'true') {
                _this.storage.remove('currentcart');
                _this.storage.remove('pricetotal');
                localStorage.removeItem('BeneficiaryName');
                localStorage.removeItem('WalletBalace');
                localStorage.removeItem('WalletCode');
                localStorage.removeItem('BeneficiaryID');
                localStorage.removeItem('BeneficiaryQRCODE');
            }
            else {
                _this.apiReq.errorToast('Processing Error!');
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    CartProvider.prototype.SetMapStatus = function (type) {
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
    CartProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], CartProvider);
    return CartProvider;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cart/cart.module": [
		299,
		11
	],
	"../pages/categories/categories.module": [
		300,
		10
	],
	"../pages/foods/foods.module": [
		302,
		9
	],
	"../pages/history/history.module": [
		301,
		8
	],
	"../pages/home/home.module": [
		303,
		12
	],
	"../pages/items/items.module": [
		306,
		7
	],
	"../pages/maploc/maploc.module": [
		304,
		0
	],
	"../pages/menu/menu.module": [
		307,
		6
	],
	"../pages/notification/notification.module": [
		305,
		5
	],
	"../pages/productdetails/productdetails.module": [
		308,
		4
	],
	"../pages/profile/profile.module": [
		309,
		3
	],
	"../pages/search/search.module": [
		311,
		2
	],
	"../pages/thankyou/thankyou.module": [
		310,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
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
 * Generated class for the Popover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Popover = /** @class */ (function () {
    function Popover(navCtrl, navParams, viewCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
    }
    Popover.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Popover');
    };
    Popover.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    Popover.prototype.toLoginPage = function () {
        localStorage.clear();
        this.storage.clear();
        this.navCtrl.push('HomePage');
        this.close();
    };
    Popover.prototype.toNotificationPage = function () {
        this.navCtrl.push('NotificationPage');
        this.close();
    };
    Popover.prototype.toProfilePage = function () {
        this.navCtrl.push('ProfilePage');
        this.close();
    };
    Popover.prototype.toHistoryPage = function () {
        this.navCtrl.push('HistoryPage');
        this.close();
    };
    Popover = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popover',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\popover\popover.html"*/'\n<ion-list no-lines padding>\n  <button ion-item (click)="toHistoryPage()"> <ion-icon name="ios-cart-outline" style="color: #17152e;"></ion-icon> &nbsp; History</button>\n  <button ion-item (click)="toNotificationPage()"> <ion-icon name="ios-notifications-outline" style="color: #17152e;"></ion-icon> &nbsp; Notification</button>\n  <button ion-item (click)="toProfilePage()"> <ion-icon name="ios-contact-outline" style="color: #17152e;"></ion-icon> &nbsp; Profile</button>\n  <button ion-item (click)="openchatpage()"> <ion-icon name="ios-information-circle-outline" style="color: #17152e;"></ion-icon> &nbsp; Help</button>\n  <button ion-item (click)="openchatpage()"> <ion-icon name="ios-chatbubbles-outline" style="color: #17152e;"></ion-icon> &nbsp; Contact Us</button>\n  <button ion-item (click)="toLoginPage()"> <ion-icon name="log-out" style="color: #17152e;"></ion-icon> &nbsp; Logout</button>\n</ion-list>\n'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\popover\popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], Popover);
    return Popover;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OauthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the OauthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var OauthProvider = /** @class */ (function () {
    function OauthProvider(http) {
        this.http = http;
        console.log('Hello OauthProvider Provider');
    }
    OauthProvider.prototype.oauthUser = function () {
        var token = localStorage.getItem('Token');
        return new Promise(function (resolve) {
            setTimeout(function () {
                if (token) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, 1000);
        });
    };
    OauthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], OauthProvider);
    return OauthProvider;
}());

//# sourceMappingURL=oauth.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popoverprovider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_popover_popover__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the Popover provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var Popoverprovider = /** @class */ (function () {
    function Popoverprovider(http, popoverCtrl) {
        this.http = http;
        this.popoverCtrl = popoverCtrl;
        console.log('Hello Popover Provider');
    }
    Popoverprovider.prototype.navPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_popover_popover__["a" /* Popover */], {}, { cssClass: 'navigation-popover' });
        popover.present({
            ev: myEvent
        });
    };
    Popoverprovider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* PopoverController */]])
    ], Popoverprovider);
    return Popoverprovider;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ModalContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cart_cart__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
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
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, navParams, api, cart, storage) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.api = api;
        this.cart = cart;
        this.storage = storage;
        this.isLoggedIn = false;
    }
    HomePage.prototype.loginUser = function () {
        var _this = this;
        this.api.pageLoading('Loggin in...');
        this.actions = "&actions=loginuser";
        this.data = "&usname=" + this.uname + "&pwd=" + this.pwd;
        this.api.initAccess(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            if (repo.data == 'true') {
                console.log('Am Here! ', repo);
                localStorage.setItem('BranchCode', repo.branchcode);
                localStorage.setItem('PhotoUrl', repo.photourl);
                localStorage.setItem('BranchName', repo.branchname);
                localStorage.setItem('Email', repo.email);
                localStorage.setItem('FullName', repo.fullname);
                localStorage.setItem('Token', repo.key);
                localStorage.setItem('PhoneNumber', repo.phonenumber);
                localStorage.setItem('UserID', repo.userid);
                localStorage.setItem('photo', repo.photo);
                localStorage.setItem('username', repo.username);
                _this.storage.set('Token', repo.key);
                _this.toMenuPage();
                _this.api.dismissLoading();
            }
        });
    };
    HomePage.prototype.openModal = function () {
        var modal = this.modalCtrl.create(ModalContentPage);
        modal.present();
    };
    HomePage.prototype.toMenuPage = function () {
        this.navCtrl.push('SearchPage');
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\home\home.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content >\n\n\n    <ion-grid>\n        <ion-row>\n  \n          <ion-col col-12 style="text-align: center;margin-top: 20%;">\n              <img src="img/people_cart.png"  alt="">\n          </ion-col>\n          \n          <ion-col col-12 style="text-align: center;">\n              <ion-item>\n                  <ion-label color="primary"><ion-icon name="ios-person-outline" style="font-size: 2.2rem;"></ion-icon></ion-label>\n                  <ion-input placeholder="Username" [(ngModel)]="uname" name="uname"></ion-input>\n                </ion-item>\n          </ion-col>\n  \n          <ion-col col-12 style="text-align: center;">\n              <ion-item>\n                  <ion-label color="primary"><ion-icon name="ios-lock-outline" style="font-size: 2.2rem;"></ion-icon></ion-label>\n                  <ion-input placeholder="Password" type="password" [(ngModel)]="pwd" name="pwd" (keyup.enter)="loginUser()"></ion-input>\n                </ion-item>\n          </ion-col>\n  \n          <ion-col col-4 >\n              \n          </ion-col>\n\n          <ion-col col-4 style="text-align: center;">\n              <button ion-button Outline (tap)="loginUser()">\n                  Login\n                </button>\n          </ion-col>\n\n          <ion-col col-4>\n          </ion-col>\n        </ion-row>\n  \n    </ion-grid>\n  \n  \n  </ion-content>\n  \n  \n  <ion-footer>\n      <ion-grid style="padding: 0;">\n        <ion-row>\n          <ion-col col-8>\n            <!-- <button style="margin: 0;height: 5em;width: 100%; background: transparent;" (tap)="openModal()">\n              <p style="float: left;color: #86470d;font-size: 1.3em;float: left;">Sign Up! &nbsp; <ion-icon name="ios-finger-print-outline" style="font-size: 1.5em !important;" ></ion-icon> </p>  \n            </button>   -->\n          </ion-col>\n          <ion-col col-4 style="padding: 0;" >\n              <button style="margin: 0;height: 5em;width: 100%; background: transparent;" (tap)="openModal()">\n                  <p style="float: left;color: #976702;font-size: 1.3em;float: left;">Sign Up! &nbsp; \n                    <!-- <ion-icon name="ios-finger-print-outline" style="font-size: 1.5em !important;" ></ion-icon> </p>   -->\n                </button>  \n            <!-- <div style="float: right; width: 100%;">\n              <button ion-button full style="margin: 0;height: 5em; background-color: #fff; width: 100%;">\n                <ion-icon name="md-checkmark-circle-outline" style="color: rgb(169, 180, 187);font-size: 2.5em !important;" ></ion-icon>\n              </button>\n            </div> -->\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-footer>\n    '/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_cart_cart__["a" /* CartProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

var ModalContentPage = /** @class */ (function () {
    function ModalContentPage(platform, params, viewCtrl, navCtrl, alertCtrl, api) {
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.api = api;
    }
    ModalContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ModalContentPage.prototype.saveuser = function () {
        var _this = this;
        this.api.pageLoading('Signing up...');
        this.actions = "&actions=saveuser";
        this.data = "&usname=" + this.usname + "&pwd=" + this.pwd + "&phonenumber=" + this.phonenumber;
        if (this.pwd == this.pwdconfirm) {
            this.api.initAccess(this.actions, this.data).then(function (res) {
                var repo = JSON.parse(res['_body']);
                console.log(repo + ' I have data!');
                if (repo.data == 'true') {
                    _this.api.dismissLoading();
                    _this.dismiss();
                    _this.api.errorToast('Sign Up was successful');
                }
                else {
                    _this.api.dismissLoading();
                    _this.api.errorToast('Network is slow');
                }
            });
        }
        else {
            this.api.dismissLoading();
            this.showAlert("Your passwords are not the same");
        }
    };
    ModalContentPage.prototype.toMenuPage = function () {
        this.navCtrl.push('MenuPage');
    };
    ModalContentPage.prototype.showAlert = function (messsage) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var alert = _this.alertCtrl.create({
                title: "Sorry",
                subTitle: messsage,
                buttons: [
                    { text: 'OK',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                            resolve(false);
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    ModalContentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n  \n  <style media=\"screen\">\n  .button-outline-md {\n    border-width: 1px;\n    border-style: solid;\n    border-color: #86470d;\n    color: #86470d;\n    background-color: transparent;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n  \n  .item-md {\n    padding-left: 16px;\n    padding-right: 0;\n    position: relative;\n    font-size: 1.6rem;\n    font-weight: normal;\n    text-transform: none;\n    color: #000;\n    background-color: #f7f7f5;\n  }\n  </style>\n  \n  <ion-content style=\"background-color: #f7f7f5;\">\n    <div style=\"text-align: right;margin-right: 1.5rem;\">\n      <p (tap)=\"dismiss()\"><ion-icon name=\"close\" style=\"font-size: 1.7em !important; color: #86470d;\"></ion-icon></p>\n    </div>\n    <h1 style=\"margin-top: 0rem; margin-left: 2rem; font-size: 2.2rem;\"> &nbsp; <span style=\"font-size: 3rem;font-weight: 200;\">SIGN UP</span></h1>\n  \n    <div style=\"text-align: center; padding-left: 4rem; padding-right: 3rem;\">\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input type=\"text\" value=\"\"  [(ngModel)]=\"usname\" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Phone Number</ion-label>\n        <ion-input type=\"number\" value=\"\"  [(ngModel)]=\"phonenumber\" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input type=\"password\" value=\"\"  [(ngModel)]=\"pwd\" ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Confirm Password</ion-label>\n        <ion-input type=\"password\" value=\"\"  [(ngModel)]=\"pwdconfirm\" ></ion-input>\n      </ion-item>\n     <button ion-button round outline style=\"margin-top: 7rem;\"  (tap)=\"saveuser();\" >Submit</button>\n    </div>\n  \n  </ion-content>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */]])
    ], ModalContentPage);
    return ModalContentPage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(230);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_location_accuracy_ngx__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_api_request_api_request__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_oauth_oauth__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_popover__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_popover_popover__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_cart_cart__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_popover_popover__["a" /* Popover */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["b" /* ModalContentPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cart/cart.module#CartPageModule', name: 'CartPage', segment: 'cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/categories/categories.module#CategoriesPageModule', name: 'CategoriesPage', segment: 'categories', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/history/history.module#HistoryPageModule', name: 'HistoryPage', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/foods/foods.module#FoodsPageModule', name: 'FoodsPage', segment: 'foods', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maploc/maploc.module#MaplocPageModule', name: 'MaplocPage', segment: 'maploc', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/items/items.module#ItemsPageModule', name: 'ItemsPage', segment: 'items', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/productdetails/productdetails.module#ProductdetailsPageModule', name: 'ProductdetailsPage', segment: 'productdetails', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/thankyou/thankyou.module#ThankyouPageModule', name: 'ThankyouPage', segment: 'thankyou', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_popover_popover__["a" /* Popover */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["b" /* ModalContentPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_location_accuracy_ngx__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_15__providers_popover__["a" /* Popoverprovider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_api_request_api_request__["a" /* ApiRequestProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_oauth_oauth__["a" /* OauthProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_17__providers_cart_cart__["a" /* CartProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_oauth_oauth__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_api_request_api_request__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, oauth, api, app, alertCtrl) {
        this.oauth = oauth;
        this.api = api;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.rootPage = 'HomePage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.oauth.oauthUser().then(function (isLoggedIn) {
            if (isLoggedIn) {
                _this.nav.setRoot('MenuPage');
                // this.nav.setRoot('CategoriesPage');
            }
            else {
                _this.rootPage = 'HomePage';
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */])
    ], MyApp.prototype, "viewCtrl", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__providers_oauth_oauth__["a" /* OauthProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_api_request_api_request__["a" /* ApiRequestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiRequestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_retry__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retryWhen__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retryWhen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_retryWhen__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ApiRequestProvider = /** @class */ (function () {
    function ApiRequestProvider(http, toastCtr, loadingCtrl, storage) {
        this.http = http;
        this.toastCtr = toastCtr;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.initApi = "apikey=rL%N8f_4RYT+9m5tMKMv";
        // server:string = "http://localhost/atk.api/index.php";
        // server:string = "http://18.188.37.168/atk.api/index.php";
        this.server = "http://tuyoinc.com/atk.api/index.php";
        console.log('Hello ApiProvider Provider');
        var url_photo = "http://localhost/atk.api/media/uploads";
        localStorage.setItem('PhotoUrl', url_photo);
        var localstorage_apikey = localStorage.getItem('Token');
        if (localstorage_apikey == "" || localstorage_apikey == null) {
            localstorage_apikey = "33938ba5341192c19f417e7ab7731b1de7e3d67485b7563eb5dc83c2162347182a2357991c1294f6c99d932be8b290b92bc44cc87fddb7e6c71430f1b1278495";
            console.log("key gotten again static");
        }
        else {
            console.log("Not null", localstorage_apikey);
        }
        this.apiKey = "apikey=" + localstorage_apikey;
    }
    ApiRequestProvider.prototype.initAccess = function (action, data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.http.post(_this.server, _this.initApi + action + data, { headers: headers }).retryWhen(function (error) { return error.delay(500); }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
                _this.syserrorToast(err).then(function (err) {
                    if (err) {
                        _this.initAccess(action, data);
                    }
                });
            });
        });
    };
    ApiRequestProvider.prototype.getData = function (action) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.server + _this.apiKey + action).retryWhen(function (error) { return error.delay(500); }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                _this.syserrorToast(err).then(function (err) {
                    if (err) {
                        _this.getData(action);
                    }
                });
            });
        });
    };
    ApiRequestProvider.prototype.postData = function (action, data) {
        var _this = this;
        var all = this.apiKey + action + data;
        console.log("Not null", all);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(function (resolve) {
            _this.http.post(_this.server, all, { headers: headers }).retryWhen(function (error) { return error.delay(1000); }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                _this.syserrorToast(err).then(function (err) {
                    if (err) {
                        _this.postData(action, data);
                    }
                });
            });
        });
    };
    ApiRequestProvider.prototype.syserrorToast = function (message, position) {
        var _this = this;
        if (position === void 0) { position = 'top'; }
        return new Promise(function (resolve, reject) {
            var toast = _this.toastCtr.create({
                message: message,
                position: position,
                duration: 4000,
                cssClass: 'connecterror'
            });
            toast.present();
        });
    };
    ApiRequestProvider.prototype.successToast = function (message, position) {
        if (position === void 0) { position = 'bottom'; }
        var toast = this.toastCtr.create({
            message: message,
            position: position,
            duration: 4000,
            cssClass: 'successtoast'
        });
        toast.present();
    };
    ApiRequestProvider.prototype.errorToast = function (message, position) {
        if (position === void 0) { position = 'top'; }
        var toast = this.toastCtr.create({
            message: message,
            position: position,
            duration: 4000,
            cssClass: 'errortoast'
        });
        toast.present();
    };
    ApiRequestProvider.prototype.infoToast = function (message, position) {
        if (position === void 0) { position = 'top'; }
        var toast = this.toastCtr.create({
            message: message,
            position: position,
            showCloseButton: true,
            closeButtonText: 'Ok',
            cssClass: 'infotoast'
        });
        toast.present();
    };
    ApiRequestProvider.prototype.pageLoading = function (msg) {
        this.loader = this.loadingCtrl.create({
            content: msg
        });
        this.loader.present();
    };
    ApiRequestProvider.prototype.dismissLoading = function () {
        this.loader.dismiss();
    };
    ApiRequestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ApiRequestProvider);
    return ApiRequestProvider;
}());

//# sourceMappingURL=api-request.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.js.map