webpackJsonp([6],{

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(326);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { SearchPipe } from '../../pipes/search/search';
// import { SortPipe } from '../../pipes/sort/sort';
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_popover__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_api_request_api_request__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cart_cart__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(35);
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
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, popoverCtrl, pop, apiReq, cart, storage, diagnostic, _PLATFORM) {
        // this.url=localStorage.getItem('PhotoUrl')+'/products/';
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.pop = pop;
        this.apiReq = apiReq;
        this.cart = cart;
        this.storage = storage;
        this.diagnostic = diagnostic;
        this._PLATFORM = _PLATFORM;
        this.currency = "₵";
        this.descending = false;
        this.column = 'name';
        this.searchQuery = '';
        this.orderPlaced_showmap = false;
        // this.url="http://localhost/atk.api/media/uploads/products/"; 
        this.url = "http://tuyoinc.com/atk.api/media/uploads/products/";
        this.productcode = localStorage.getItem('Productcode');
        this.productcode = localStorage.getItem('productname');
        this.clustername = localStorage.getItem('BranchCode');
        this.username_ = localStorage.getItem('username');
        this.username_ = this.username_.charAt(0).toUpperCase() + this.username_.slice(1);
        ;
        this.total_db = 0;
        this.userslocation = this.navParams.get('userslocation');
        if (this.userslocation == "" || this.userslocation == null) {
            this.userslocation = localStorage.getItem('userslocation');
        }
        // this.productcode = this.navParams.get('productcode');
        console.log('This is the info on menu ', this.userslocation);
        this.checklocation();
        this.loadData();
    }
    MenuPage.prototype.checklocation = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (isEnabled) {
            if (!isEnabled && _this._PLATFORM.is('cordova')) {
                //handle confirmation window code here and then call switchToLocationSettings
                _this.diagnostic.switchToLocationSettings();
            }
            else {
            }
        });
    };
    MenuPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        this.loadData();
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    MenuPage.prototype.ionViewWillEnter = function () {
        // this.loadAds();
    };
    MenuPage.prototype.ionViewDidEnter = function () {
        console.log("Total Cart Items ", this.cartcount);
        this.cartcount_here();
        this.mapStatus();
    };
    MenuPage.prototype.cartcount_here = function () {
        this.cartcount = this.cart.count_me();
    };
    MenuPage.prototype.mapStatus = function () {
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
    MenuPage.prototype.loadData = function () {
        var _this = this;
        this.items = [];
        this.actions = "&actions=fetchrestaurants";
        this.data = "&userslocation=" + this.userslocation;
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
    // loadAds(){
    //   this.items =[];
    //   this.actions = "&actions=adsfetch";
    //   this.data = "";
    //   this.apiReq.postData(this.actions,this.data).then(res=>{
    //     let repo = JSON.parse(res['_body']);
    //     console.log(repo +' I have Ads!');
    //     if(repo.msg == 'true'){
    //       this.ads = repo.data;
    //     }else{
    //       this.apiReq.errorToast('Network is slow');
    //     }
    //   })
    // }
    MenuPage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    MenuPage.prototype.goProductdetailsPage = function (id, name, price, photo) {
        this.navCtrl.push('ProductdetailsPage', {
            productcode: id,
            productname: name,
            productprice: price,
            productphoto: photo
        });
    };
    MenuPage.prototype.opencart = function () {
        this.navCtrl.push('CartPage');
    };
    MenuPage.prototype.opensearch = function () {
        this.navCtrl.push('SearchPage');
    };
    MenuPage.prototype.openfoods = function (restaurant_details) {
        this.navCtrl.push('FoodsPage', {
            restaurant_details: restaurant_details
        });
    };
    MenuPage.prototype.addToCart = function (prcode, productname, productprice) {
        this.cart.addToCart(prcode, productname, productprice);
        this.cartcount_here();
    };
    MenuPage.prototype.carttotal = function (price) {
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
    MenuPage.prototype.cartItemsNum = function () {
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
    MenuPage.prototype.GetcartItemsNum = function () {
        var _this = this;
        // Store pin in database
        this.storage.get('cartItemsNum').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.totalItems_db = Number(gottenitems);
            }
        });
    };
    MenuPage.prototype.toCartPage = function () {
        this.navCtrl.push('CartPage');
    };
    MenuPage.prototype.goToSlide = function () {
        this.slides.slideTo(2, 500);
    };
    MenuPage.prototype.toNotificationPage = function () {
        this.navCtrl.push('NotificationPage');
    };
    MenuPage.prototype.toMaplocPage = function () {
        this.navCtrl.push('MaplocPage');
    };
    MenuPage.prototype.toProductDetailsPage = function (id, name, price, photo) {
        this.navCtrl.push('ProductdetailsPage', {
            productcode: id,
            productname: name,
            productprice: price,
            productphoto: photo
        });
        // this.navCtrl.push('ProductdetailsPage');
    };
    MenuPage.prototype.presentPopover = function (event) {
        this.pop.navPopover(event);
    };
    MenuPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Slides */])
    ], MenuPage.prototype, "slides", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\menu\menu.html"*/'<!--\n  Generated template for the MenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content>\n\n    <ion-row >\n        <ion-col col-6>\n          <button ion-button style="background: transparent; box-shadow: none;float: left" (tap)="opensearch()" >\n            <ion-icon  name="ios-arrow-round-back-outline" style="font-size: 2.4em !important;float: right;color: #73380d;  margin-top: 0.3em;" ></ion-icon>\n          </button>  \n        </ion-col>\n        <ion-col col-4>\n          <div class="" >\n              <button ion-button style="background: transparent; box-shadow: none;float: right" (tap)="toMaplocPage()" *ngIf="orderPlaced_showmap == true">\n                <ion-icon  name="md-map" style="font-size: 1.8em !important;float: right;color: #73380d;  margin-top: 0.3em;" ></ion-icon>\n              </button>  \n          </div>\n      </ion-col>\n        <ion-col col-2>\n            <img src="assets/imgs/testi1.png" style="height: 3.2em;" (tap)="presentPopover($event)"/>\n        </ion-col>\n    </ion-row>\n\n\n    <div style="margin-left: 1.5em; margin-top: 2em;">\n      \n        <p class="introquestion" >Hey {{username_}}</p>\n        <p class="introquestion" >Where do you want to <br> eat?</p>\n      \n    </div>\n      \n\n    <ion-row style="margin-top: 1em;">\n          <ion-col col-12>\n            <ion-searchbar [(ngModel)]="terms" style="width: 90%;  margin: 0 auto;"></ion-searchbar>\n          </ion-col>\n    </ion-row>\n    \n\n    <div style="margin-left: 1.5em; margin-top: 2em;">\n        <p class="searchresults" >Search Results for {{userslocation}} :</p>\n    </div>\n\n  \n    <div>\n      \n       <ion-refresher (ionRefresh)="doRefresh($event)">\n          <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n\n\n      <div class="loader" *ngIf="items?.length < 1" ><img src="assets/imgs/loader.gif" alt="loader"></div>\n\n      <div *ngIf="items?.length > 0">\n        <ion-row >\n            <!-- | search : terms | sort: {property: column, order: order} -->\n          <ion-card class="restaurant_card"  *ngFor=" let item of items ">\n            <div id="container" (tap)="openfoods(item)">\n              <div id="navi">\n                  <ion-row style="margin-top: 1em;">\n                      <ion-col col-2>\n                        <div class="round_div">\n                            <ion-icon  name="md-home" style="font-size: 1.8em !important; margin-top: 0.2em; color: #f0a180;" ></ion-icon>\n                        </div>\n                      </ion-col>\n                      <ion-col col-10 style="    padding-left: 1em;">\n                        <p>{{item.rest_name}}</p>\n                        <p>\n                          <span>{{item.rest_rate}}</span>\n                          <span>\n                              <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                              <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                              <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                              <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                              <ion-icon  name="ios-star-outline" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                          </span>\n                        </p>\n                        <p>\n                          {{item.rest_description}}\n                        </p>\n                      </ion-col>\n                      \n                </ion-row>\n              </div>\n              <div id="infoi" >\n                <div class="omap" style="margin-top: 3em;"  >\n                  <img src="{{url+item.rest_coverimage}}">\n                    <!-- <img src="img/barbecue.jpg" /> -->\n                </div>\n              </div>\n            </div>\n          </ion-card>\n          \n        </ion-row>\n      </div>\n    </div>\n\n\n\n\n    <!-- <ion-row style="height: 100%;">\n        <div class="loader" *ngIf="!items"><img src="img/pageloader.gif" alt="loader"></div>\n        <div>\n          <ion-grid no-padding>\n            <ion-row no-padding align-items-center>\n                <div class="product-block" *ngFor=" let item of items | search : terms | sort: {property: column, order: order}">\n                    <ion-col class="productbox">\n                      <ion-card no-padding >\n                        <img src="{{url+item.productphoto}}" alt="product" (tap)="goProductdetailsPage(item.prcode,item.productname, item.productunitprice,item.productphoto)">\n                        <ion-card-content>\n                            <ion-row no-padding align-items-center>\n                              <ion-col col-7 (tap)="goProductdetailsPage(item.prcode,item.productname, item.productunitprice,item.productphoto)">\n                                <span>{{item.productname}}</span>\n                                <div class="card-actions">\n                                  <div id="price">{{currency+item.productunitprice}}</div>\n                                </div>\n                              </ion-col>\n                              <ion-col col-5>\n                                <button (tap)="addToCart(item.prcode,item.productname,item.productprice)" style="background: transparent;box-shadow: none;">\n                                    <ion-icon style="color:#73380d" id="plus" name="md-add"></ion-icon><ion-icon name="md-cart" style="color:#73380d"></ion-icon>\n                                </button>\n                                <div id="price">{{currency+item.productunitprice}}</div>\n                              </ion-col>\n                            </ion-row>\n                        </ion-card-content>\n                      </ion-card>\n                    </ion-col>\n                  </div>\n              </ion-row>\n            </ion-grid>\n        </div>\n    </ion-row> -->\n\n\n    <ion-fab right bottom>\n        <button ion-fab color="light" (tap)="toCartPage()">\n          <!-- <span style="z-index: 36;right: -30px;top: -10px;position: relative;">{{cartcount}}</span> -->\n          <ion-icon name="ios-cart-outline"></ion-icon>\n        </button>\n    </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_2__providers_popover__["a" /* Popoverprovider */], __WEBPACK_IMPORTED_MODULE_4__providers_api_request_api_request__["a" /* ApiRequestProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_cart_cart__["a" /* CartProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=6.js.map