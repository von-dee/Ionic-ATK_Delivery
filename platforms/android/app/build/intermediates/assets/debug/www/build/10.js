webpackJsonp([10],{

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriesPageModule", function() { return CategoriesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__categories__ = __webpack_require__(313);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CategoriesPageModule = /** @class */ (function () {
    function CategoriesPageModule() {
    }
    CategoriesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__categories__["a" /* CategoriesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__categories__["a" /* CategoriesPage */]),
            ],
        })
    ], CategoriesPageModule);
    return CategoriesPageModule;
}());

//# sourceMappingURL=categories.module.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
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
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CategoriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoriesPage');
    };
    CategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-categories',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\categories\categories.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content>\n\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <div style="margin-left: 1.5em; margin-top: 0em;">\n          <img src="assets/imgs/testi1.png" style="float:right;" alt="">\n        </div>\n      </ion-col>\n\n      <ion-col col-12>\n        <div style="margin-left: 1.5em; margin-top: 0em;">\n          <p class="introquestion">\n            <p style="font-size: 2.8em;margin: 0;"> Hello! </p> \n            <p style="margin-top: 1em; font-weight: 100;  margin: 0; font-size: 1.5em;">What do you want? </p>  <p>\n        </div>\n      </ion-col>\n      \n    </ion-row>\n\n    <ion-row style="margin-top: 1em;">\n      <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="selectlocation()">\n        <img class="category_img" src="img/snacks_grey.png" alt="">\n        <span>Snacks</span>\n      </ion-col>\n      <ion-col col-4 style="text-align: center;margin-top: 10%;" (tap)="selectlocation()">\n        <img class="category_img" src="img/restaurants.png" alt="">\n        <span>Restaurant</span>\n      </ion-col>\n      <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="selectlocation()">\n        <img class="category_img" src="img/shops_grey.png" alt="">\n        <span>Shops</span>\n      </ion-col>\n    </ion-row>\n\n\n    <ion-row  style="margin-top: 0em;">\n      <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="selectlocation()">\n        <img class="category_img" src="img/pharmacy_grey.png" alt="">\n        <span>Pharmacy</span>\n      </ion-col>\n      <ion-col col-4 style="text-align: center;margin-top: 10%;" (tap)="selectlocation()">\n        <img class="category_img" src="img/courier_grey.png" alt="">\n        <span>Courier</span>\n      </ion-col>\n      <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="selectlocation()">\n        <img class="category_img" src="img/gift_grey.png" alt=""><br>\n        <span>Gifts</span>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n</ion-content>\n\n\n\n  <ion-footer>\n    <ion-grid style="padding: 0;">\n      <ion-row>\n          <ion-col col-6>\n          </ion-col>\n          <ion-col col-6>\n            <button style="margin: 0;height: 5em;width: 100%; background: transparent;" (tap)="selectlocation()">\n              <p style="float: left;color: #86470d;font-size: 1.1em; float: right;margin-right: 4em;">Help &nbsp; <ion-icon name="ios-information-circle-outline" style="font-size: 1.5em !important;" ></ion-icon> </p>  \n            </button>  \n          </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-footer>\n  '/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\categories\categories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], CategoriesPage);
    return CategoriesPage;
}());

//# sourceMappingURL=categories.js.map

/***/ })

});
//# sourceMappingURL=10.js.map