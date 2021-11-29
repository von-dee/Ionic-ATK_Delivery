webpackJsonp([2],{

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageModule", function() { return SearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchPageModule = /** @class */ (function () {
    function SearchPageModule() {
    }
    SearchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */]),
            ],
        })
    ], SearchPageModule);
    return SearchPageModule;
}());

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
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
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.selected_location = "East Legon";
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage.prototype.openrestaurants = function (userslocation) {
        this.navCtrl.push('MenuPage', {
            userslocation: userslocation
        });
    };
    SearchPage.prototype.presentToast = function (data, status) {
        var message;
        if (status == "1") {
            message = 'You selected ' + data;
        }
        else {
            message = "No " + data + " records yet";
        }
        this.selected_category = data;
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    SearchPage.prototype.selectlocation = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Your Location');
        alert.addInput({
            type: 'radio',
            label: 'East Legon',
            value: 'East Legon',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'UG Legon',
            value: 'UG Legon'
        });
        alert.addInput({
            type: 'radio',
            label: 'KNUST',
            value: 'KNUST'
        });
        alert.addInput({
            type: 'radio',
            label: 'Tarkwa',
            value: 'Tarkwa'
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.testRadioOpen = false;
                _this.testRadioResult = data;
                _this.selected_location = data;
                localStorage.setItem('userslocation', data);
                console.log('This is the info ', data);
                _this.openrestaurants(data);
            }
        });
        alert.present();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\search\search.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content >\n\n\n    \n  <ion-grid>\n      <ion-row>\n        <ion-col col-12>\n          <div style="margin-left: 1.5em; margin-top: 0em;">\n            <img src="assets/imgs/testi1.png" style="float:right;" alt="">\n          </div>\n        </ion-col>\n  \n        <ion-col col-12>\n          <div style="margin-left: 1.5em; margin-top: 0em;">\n            <p class="introquestion">\n              <p style="font-size: 2em;margin: 0;font-weight: 100;"> Hello! </p> \n              <p style="margin-top: 1em;   margin: 0; font-size: 1.5em;font-weight: 100;">What do you want? </p>  <p>\n          </div>\n        </ion-col>\n        \n      </ion-row>\n  \n      <ion-row style="margin-top: 2.5em;">\n        <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="presentToast(\'Snacks\',\'0\')">\n          <img class="category_img" src="img/snacks_grey.png" alt=""> <br> \n          <span class="category_label" >Snacks</span>\n        </ion-col>\n        <ion-col col-4 style="text-align: center;margin-top: 10%;" (tap)="presentToast(\'Restaurants\',\'1\')">\n          <img class="category_img" src="img/restaurants.png" alt=""> <br>\n          <span class="category_label" >Restaurant</span>\n        </ion-col>\n        <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="presentToast(\'Shops\',\'0\')">\n          <img class="category_img" src="img/shops_grey.png" alt=""> <br>\n          <span class="category_label" >Shops</span>\n        </ion-col>\n      </ion-row>\n  \n  \n      <ion-row  style="margin-top: 0em;">\n        <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="presentToast(\'Pharmacy\',\'0\')">\n          <img class="category_img" src="img/pharmacy_grey.png" alt=""> <br>\n          <span class="category_label" >Pharmacy</span>\n        </ion-col>\n        <ion-col col-4 style="text-align: center;margin-top: 10%;" (tap)="presentToast(\'Courier\',\'0\')">\n          <img class="category_img" src="img/courier_grey.png" alt=""> <br>\n          <span class="category_label" >Courier</span>\n        </ion-col>\n        <ion-col col-4 style="text-align: center;margin-top: 0%;" (tap)="presentToast(\'Gifts\',\'0\')">\n          <img class="category_img" src="img/gift_grey.png" alt=""> <br>\n          <span class="category_label" >Gifts</span>\n        </ion-col>\n      </ion-row>\n  \n    </ion-grid>\n  \n\n    <ion-grid>\n      \n      <div>\n        <button style="margin-top: 4.5em; height: 5em;width: 100%; background: transparent;" >\n          <p style="float: left;font-size: 1.1em;float: right !important; margin-left: 20%; padding-bottom: 0.6em;"> \n\n            <span style="font-size: 1em; margin-right: 1em;">in </span> \n            <span style="font-size: 1.6em;border-bottom: 1px #c05400 solid; color: #976702;" (tap)="selectlocation()">\n              {{selected_location}}\n            </span> \n            <ion-icon name="ios-arrow-down-outline" style="font-size: 1.5em !important;" ></ion-icon> \n          \n          </p>  \n            \n        </button>  \n      </div>\n\n\n    </ion-grid>\n  \n   \n  </ion-content>'/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\search\search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ })

});
//# sourceMappingURL=2.js.map