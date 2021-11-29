webpackJsonp([9],{

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodsPageModule", function() { return FoodsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foods__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FoodsPageModule = /** @class */ (function () {
    function FoodsPageModule() {
    }
    FoodsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__foods__["a" /* FoodsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__foods__["a" /* FoodsPage */]),
            ],
        })
    ], FoodsPageModule);
    return FoodsPageModule;
}());

//# sourceMappingURL=foods.module.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FoodsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_popover__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_request_api_request__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cart_cart__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(35);
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
 * Generated class for the FoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FoodsPage = /** @class */ (function () {
    function FoodsPage(navCtrl, navParams, popoverCtrl, pop, apiReq, cart, storage) {
        // this.url=localStorage.getItem('PhotoUrl')+'/products/';
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.pop = pop;
        this.apiReq = apiReq;
        this.cart = cart;
        this.storage = storage;
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
        this.total_db = 0;
        this.items = "";
        this.restaurant_details = this.navParams.get('restaurant_details');
        console.log(this.restaurant_details);
        this.rest_id = this.restaurant_details.rest_id;
        this.rest_name = this.restaurant_details.rest_name;
        this.rest_description = this.restaurant_details.rest_description;
        this.rest_location = this.restaurant_details.rest_location;
        this.rest_phone = this.restaurant_details.rest_phone;
        this.rest_rate = this.restaurant_details.rest_rate;
        this.rest_coverimage = this.restaurant_details.rest_coverimage;
    }
    FoodsPage.prototype.ionViewWillEnter = function () {
        this.loadData();
        // this.loadAds();
    };
    FoodsPage.prototype.ionViewDidEnter = function () {
        console.log("Total Cart Items ", this.cartcount);
        this.cartcount_here();
        this.mapStatus();
    };
    FoodsPage.prototype.cartcount_here = function () {
        this.cartcount = this.cart.count_me();
    };
    FoodsPage.prototype.mapStatus = function () {
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
    FoodsPage.prototype.loadData = function () {
        var _this = this;
        this.items = [];
        this.actions = "&actions=productfetch";
        this.data = "&rest_id=" + this.rest_id;
        this.apiReq.postData(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            if (repo.msg == 'true') {
                _this.items = repo.data;
                console.log(_this.items + ' I have data!');
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
    FoodsPage.prototype.sort = function () {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
    };
    FoodsPage.prototype.goProductdetailsPage = function (id, name, price, photo) {
        this.navCtrl.push('ProductdetailsPage', {
            productcode: id,
            productname: name,
            productprice: price,
            productphoto: photo
        });
    };
    FoodsPage.prototype.opencart = function () {
        this.navCtrl.push('CartPage');
    };
    FoodsPage.prototype.opensearch = function () {
        this.navCtrl.push('SearchPage');
    };
    FoodsPage.prototype.openfoods = function () {
        this.navCtrl.push('FoodsPage');
    };
    FoodsPage.prototype.addToCart = function (prcode, productname, productprice) {
        this.cart.addToCart(prcode, productname, productprice);
        this.cartcount_here();
    };
    FoodsPage.prototype.carttotal = function (price) {
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
    FoodsPage.prototype.cartItemsNum = function () {
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
    FoodsPage.prototype.GetcartItemsNum = function () {
        var _this = this;
        // Store pin in database
        this.storage.get('cartItemsNum').then(function (gottenitems) {
            if (gottenitems != null) {
                _this.totalItems_db = Number(gottenitems);
            }
        });
    };
    FoodsPage.prototype.toCartPage = function () {
        this.navCtrl.push('CartPage');
    };
    FoodsPage.prototype.toNotificationPage = function () {
        this.navCtrl.push('NotificationPage');
    };
    FoodsPage.prototype.toMaplocPage = function () {
        this.navCtrl.push('MaplocPage');
    };
    FoodsPage.prototype.toProductDetailsPage = function (id, name, price, photo) {
        this.navCtrl.push('ProductdetailsPage', {
            productcode: id,
            productname: name,
            productprice: price,
            productphoto: photo
        });
    };
    FoodsPage.prototype.presentPopover = function (event) {
        this.pop.navPopover(event);
    };
    FoodsPage.prototype.popView = function () {
        this.navCtrl.pop();
    };
    FoodsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-foods',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\foods\foods.html"*/'<!--\n  Generated template for the MenuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content>\n\n\n\n\n    <div>\n      \n        <div id="container_top">\n            <div id="navi_top" style="top: 0;">\n              <img src="{{url+rest_coverimage}}">\n                <!-- <img src="img/barbecue.jpg" /> -->\n            </div>\n            <div id="infoi_top" style="top: 0px;">\n                <div class="round_div" style=" margin-top: 1em; top: 25px;" (tap)="popView()">\n                    <ion-icon  name="ios-arrow-round-back-outline" style="font-size: 1.8em !important; margin-top: 0.2em; color: #cdd7db;" ></ion-icon>\n                </div> \n                <ion-card style="position: absolute;top: 180px;left: 8%; width: 85%; height: 10em; margin: 0 auto; border-radius: 14px; margin-bottom: 1em !important;">\n                    <ion-row style="margin-top: 1em;">\n                        <ion-col col-2>\n                          <div class="round_div">\n                              <ion-icon  name="md-home" style="font-size: 1.8em !important; margin-top: 0.2em; color: #f0a180;" ></ion-icon>\n                          </div>\n                        </ion-col>\n                        <ion-col col-10 style="    padding-left: 1em;">\n                          <p>{{rest_name}}</p>\n                          <p>\n                            <span>{{rest_rate}}</span>\n                            <span>\n                                <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                                <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                                <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                                <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                                <ion-icon  name="ios-star-outline" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                            </span>\n                          </p>\n                          <p>\n                            {{rest_description}}\n                          </p>\n      \n                        </ion-col>\n\n                        <ion-col col-2>\n                        </ion-col>\n                        <ion-col col-10 style="padding: 0em; padding-left: 1em;">\n                          <p>\n                            <span style="color: #b0b0b0;">\n                              <ion-icon  name="md-call" style="font-size: 1.3em !important; "></ion-icon>\n                              <span style="font-size: 0.8em;">+233 {{rest_phone}}</span>\n                            </span>\n                            \n                            <span style="float: right; margin-right: 1.5em; color: #b0b0b0;">\n                              <ion-icon  name="md-map" style="font-size: 1.3em !important; "></ion-icon>\n                              <span style="font-size: 0.8em;">{{rest_location}}</span>\n                            </span>\n                          </p>\n                        </ion-col>\n                  </ion-row>\n                </ion-card>\n            </div>\n          </div>\n        \n    </div>\n      \n\n    <!-- <ion-row style="margin-top: 1em;">\n          <ion-col col-12>\n            <ion-searchbar [(ngModel)]="terms" style="width: 90%;  margin: 0 auto;"></ion-searchbar>\n          </ion-col>\n    </ion-row> -->\n    \n\n    <div style="margin-left: 1.5em; margin-top: 9em;">\n        <p class="searchresults" >Featured Items :</p>\n    </div>\n\n    <div>\n      <div class="loader" *ngIf="items?.length < 1"><img src="assets/imgs/loader.gif" alt="loader"></div>\n\n      <div>\n        <ion-row>\n            <ion-card *ngFor=" let item of items" class="fooditem" (tap)= "toProductDetailsPage(item.product_id,item.product_name,item.product_cost,item.product_image)">\n              <div style="height: 60%;">\n                <img src="{{url+item.product_image}}">\n                <!-- <img src="img/barbecue.jpg" /> -->\n              </div>\n              <div>\n                <ion-row >\n                  <ion-col col-2 class="bgwhite">\n                    <div class="">\n                        <ion-icon  name="md-cart" style="font-size: 1.7em !important; margin-top: 0.4em; margin-left: 0.7em; color: #19694a;" ></ion-icon>\n                    </div>\n                  </ion-col>\n                  <ion-col col-7 style="padding-left: 1em;" class="bgwhite">\n                    <p>{{item.product_name}}</p>\n                    <p>\n                      <span>4.0</span>\n                      <span>\n                          <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                          <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                          <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                          <ion-icon  name="ios-star" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                          <ion-icon  name="ios-star-outline" style="font-size: 1em !important;color: #ffa43a;" ></ion-icon>\n                      </span>\n                    </p>\n        \n                  </ion-col>\n                  <ion-col col-3 style="padding-top: 1em;" class="bgwhite">\n                    <span style="color:#19694a; font-size: 1.3em"><span>&#8373;</span>{{item.product_cost}} </span>  \n                  </ion-col>\n                </ion-row>\n              </div>\n              \n            </ion-card>\n        </ion-row>\n      </div>\n    </div>\n\n\n    <ion-fab right bottom>\n        <button ion-fab color="light" (tap)="toCartPage()">\n          <!-- <span style="z-index: 36;right: -30px;top: -10px;position: relative;">{{cartcount}}</span> -->\n          <ion-icon name="ios-cart-outline"></ion-icon>\n        </button>\n    </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\foods\foods.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_2__providers_popover__["a" /* Popoverprovider */], __WEBPACK_IMPORTED_MODULE_3__providers_api_request_api_request__["a" /* ApiRequestProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_cart_cart__["a" /* CartProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], FoodsPage);
    return FoodsPage;
}());

//# sourceMappingURL=foods.js.map

/***/ })

});
//# sourceMappingURL=9.js.map