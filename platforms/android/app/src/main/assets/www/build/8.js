webpackJsonp([8],{

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryPageModule", function() { return HistoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(314);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HistoryPageModule = /** @class */ (function () {
    function HistoryPageModule() {
    }
    HistoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */]),
            ],
        })
    ], HistoryPageModule);
    return HistoryPageModule;
}());

//# sourceMappingURL=history.module.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__ = __webpack_require__(43);
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
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistoryPage = /** @class */ (function () {
    function HistoryPage(navCtrl, navParams, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.currency = "₵";
        this.usercode = localStorage.getItem('UserID');
        this.clustercode = localStorage.getItem('BranchCode');
    }
    HistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PurchaseHistoryPage');
    };
    HistoryPage.prototype.ionViewWillEnter = function () {
        this.loadData();
    };
    HistoryPage.prototype.loadData = function () {
        var _this = this;
        this.actions = "&actions=purchasehistoryuser";
        this.data = "&clustercode=" + this.clustercode + '&transusercode=' + this.usercode;
        this.api.postData(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            console.log(repo + ' I have data!');
            if (repo.msg == 'true') {
                _this.items = repo.data;
            }
            else if (repo.msg == 'no-data-in-transaction-table') {
                _this.items = 0;
            }
            else {
                _this.api.errorToast('Network is slow');
            }
        });
    };
    HistoryPage.prototype.pagepop = function () {
        this.navCtrl.pop();
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\history\history.html"*/'  \n  \n  <ion-content>\n\n  <div class="">\n    <ion-icon name="close" style="font-size: 1.5em !important; color: #73380d; margin-right: 15px;  margin-top: 15px; float:right;" (tap)="pagepop()"></ion-icon>\n  </div>\n    \n  <div class="">\n    <p style="margin-left: 1.5em;">\n      <span style="font-size: 1.5em;border-right: solid 1px #73380d; font-weight: 100;padding-right: 5px; color: #73380d;">History</span>\n    </p>\n  </div>\n\n  <div *ngIf="items==0" class="nodata">No Record<span>(s)</span> Found</div>\n  <div class="titlebar">All Transations</div>\n  <ion-list *ngIf="items">\n    <ion-item *ngFor="let item of items">\n        <h2>{{item.transusername}}</h2>\n        <p>{{item.transdeliveryguy}} - {{currency+item.transtotal}}</p>\n        <ion-note item-end class="note note-ios">\n          <span id="date">{{item.date}}</span>\n          <span id="transcode">{{item.transcode}}</span>\n        </ion-note>\n    </ion-item>\n  </ion-list>\n  </ion-content>\n  '/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\history\history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ })

});
//# sourceMappingURL=8.js.map