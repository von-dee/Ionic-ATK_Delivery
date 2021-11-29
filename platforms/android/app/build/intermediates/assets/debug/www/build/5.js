webpackJsonp([5],{

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(324);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationPageModule = /** @class */ (function () {
    function NotificationPageModule() {
    }
    NotificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */]),
            ],
        })
    ], NotificationPageModule);
    return NotificationPageModule;
}());

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
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
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationPage = /** @class */ (function () {
    function NotificationPage(navCtrl, navParams, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.clustercode = localStorage.getItem('BranchCode');
        this.userid = localStorage.getItem('UserID');
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
    };
    NotificationPage.prototype.ionViewDidEnter = function () {
        this.loadData();
    };
    NotificationPage.prototype.loadData = function () {
        var _this = this;
        this.actions = "&actions=fetchnotification";
        this.data = "&userid=" + this.userid;
        this.api.postData(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            console.log(repo + ' I have data!');
            if (repo.msg == 'true') {
                _this.items = Array(repo.data);
                console.log(_this.items);
            }
            else {
                _this.api.errorToast('Network is slow');
            }
        });
    };
    NotificationPage.prototype.notificationUpdate = function () {
        var _this = this;
        this.actions = "&actions=updatenotification";
        this.data = "&notclustercode=" + this.clustercode + "&receiverid=" + this.userid;
        this.api.postData(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            console.log(repo + ' -> I have data!');
            if (repo.msg == "success") {
                _this.loadData();
            }
            else {
                _this.api.errorToast('Network is slow');
            }
        });
    };
    NotificationPage.prototype.pagepop = function () {
        this.navCtrl.pop();
    };
    NotificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\notification\notification.html"*/'  \n  \n  <ion-content>\n\n      <div class="">\n          <ion-icon name="close" style="font-size: 1.5em !important; color: #73380d; margin-right: 15px;  margin-top: 15px; float:right;" (tap)="pagepop()"></ion-icon>\n        </div>\n    \n        <div class="">\n          <p style="margin-left: 1.5em;">\n            <span style="font-size: 1.5em;border-right: solid 1px #73380d; font-weight: 100;padding-right: 5px; color: #73380d;">Notification</span>\n          </p>\n        </div>\n\n    <div class="notibubble" [ngClass]="{new: item.notstatus==\'1\', read: item.notstatus==\'2\'}" *ngFor="let item of items" >\n      <div class="top"><ion-icon name="md-notifications"></ion-icon> <span>Stock Update</span></div>\n      <div class="buttom"><span text-wrap>{{item.notdescription}}</span></div>\n      <div class="foot"><button ion-button (tap)="notificationUpdate()">Accept</button></div>\n    </div>\n  \n    <!-- <div class="notibubble read">\n        <div class="top"><ion-icon name="md-notifications"></ion-icon> <span>Stock Update</span></div>\n        <div class="buttom"><span text-wrap>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Natus ex temporibus dignissimos molestiae. Ipsum sunt odit harum eligendi? Repellat!</span></div>\n        <div class="foot"><button ion-button>Accept</button></div>\n      </div> -->\n    <div class="spacer"></div>\n  </ion-content>\n  '/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\notification\notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ })

});
//# sourceMappingURL=5.js.map