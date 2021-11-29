webpackJsonp([3],{

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(328);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
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
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.fullname = localStorage.getItem('FullName');
        this.email = localStorage.getItem('Email');
        this.phonenumber = localStorage.getItem('PhoneNumber');
        this.branchcode = localStorage.getItem('BrachCode');
        this.branchname = localStorage.getItem('BranchName');
        this.PhotoUrl = localStorage.getItem('PhotoUrl') + '/profiles/';
        this.userimagename = this.PhotoUrl + localStorage.getItem('photo');
        this.userid = localStorage.getItem('UserID');
        this.defaultphoto = "img/avatar.png";
        if (this.userimagename == "" || this.userimagename == null) {
            this.userimagename = "../assets/imgs/avatar.png";
        }
        var res = this.fullname.split(" ");
        this.othername = res[0];
        this.surname = res[1];
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.saveuserinfo = function () {
        var _this = this;
        this.actions = "&actions=updateprofileinfo";
        this.data = "&userid=" + this.userid + "&othername=" + this.othername + "&surname=" + this.surname + "&phonenumber=" + this.phonenumber + "&email=" + this.email;
        this.api.postData(this.actions, this.data).then(function (res) {
            var repo = JSON.parse(res['_body']);
            console.log(repo + ' I have data!');
            if (repo.msg == 'true') {
                _this.items = Array(repo.data);
                _this.saveinlocal();
                console.log(_this.items);
            }
            else {
                _this.api.errorToast('Network is slow');
            }
        });
    };
    ProfilePage.prototype.saveinlocal = function () {
        this.fullname = this.othername + " " + this.surname;
        localStorage.setItem('Email', this.email);
        localStorage.setItem('FullName', this.fullname);
        localStorage.setItem('PhoneNumber', this.phonenumber);
    };
    ProfilePage.prototype.pagepop = function () {
        this.navCtrl.pop();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\profile\profile.html"*/'\n  \n  \n  <ion-content class= "profile">\n\n        <div style="margin-bottom: 4em">\n          <p style="margin-left: 1.5em; width: 50%">\n            <span style="font-size: 1.5em;border-right: solid 1px #73380d; font-weight: 100;padding-right: 5px; color: #73380d;">Profile</span>\n            <ion-icon name="close" style="font-size: 2em !important; color: #73380d; margin-right: 15px; float:right;" (tap)="pagepop()"></ion-icon>\n          </p>\n        </div>\n\n    <div class="profile-block">\n      <div class="profile-photo">\n        <img src="{{userimagename}}" id="img" (error)="img.src = defaultphoto" #img alt="profile">\n      </div>\n    </div>\n\n    <ion-row style="margin-top: 3em; border-bottom: solid 2px #d2d2d2;">\n        <ion-col col-2 style="text-align: center;">\n          <ion-icon name="ios-person-outline" style="font-size: 3em !important;color: #2b2b2b;" ></ion-icon>\n        </ion-col>\n        <ion-col col-10>\n            <ion-input type="text" placeholder="surname" [(ngModel)]="surname" value="{{surnamename}}"></ion-input>\n        </ion-col>\n    </ion-row>\n\n    <ion-row style="border-bottom: solid 2px #d2d2d2;">\n        <ion-col col-2 style="text-align: center;">\n        </ion-col>\n        <ion-col col-10>\n            <ion-input type="text" placeholder="othername" [(ngModel)]="othername" value="{{othername}}"></ion-input>\n        </ion-col>\n    </ion-row>\n    \n    <ion-row style="border-bottom: solid 2px #d2d2d2;">\n        <ion-col col-2 style="text-align: center;">\n          <ion-icon name="ios-mail-outline" style="font-size: 3em !important;color: #2b2b2b;" ></ion-icon>\n        </ion-col>\n        <ion-col col-10>\n            <ion-input type="email" placeholder="Email" [(ngModel)]="email" value="{{email}}"></ion-input>\n        </ion-col>\n    </ion-row>\n\n    <ion-row style="border-bottom: solid 2px #d2d2d2;">\n        <ion-col col-2 style="text-align: center;">\n          <ion-icon name="ios-call-outline" style="font-size: 3em !important;color: #2b2b2b;" ></ion-icon>\n        </ion-col>\n        <ion-col col-10>\n            <ion-input type="text" placeholder="Phone Number" [(ngModel)]="phonenumber" value="{{phonenumber}}"></ion-input>\n        </ion-col>\n    </ion-row>\n\n    <!-- <ion-row style="border-bottom: solid 2px #d2d2d2;">\n        <ion-col col-2 style="text-align: center;">\n          <ion-icon name="ios-mail-outline" style="font-size: 3em !important;color: #2b2b2b;" ></ion-icon>\n        </ion-col>\n        <ion-col col-10>\n            <ion-input type="text" placeholder="Email" [(ngModel)]="location" value="{{location}}"></ion-input>\n        </ion-col>\n    </ion-row> -->\n\n    \n\n\n\n\n    \n  </ion-content>\n\n\n  <ion-footer>\n      <ion-grid style="padding: 0;">\n        <ion-row>\n          <ion-col col-9>\n            <div *ngIf="page_from == drugs">\n              <p style="margin: 0; margin-left: 1em; font-weight: 300;">{{pharm_drugname}}</p>\n              <p style="margin: 0; margin-top: 0.4em;margin-left: 1.5em; font-size: 0.7em;font-weight: 100;">{{pharm_drugdescription}}.</p>\n            </div>\n          </ion-col>\n          <ion-col col-3 style="padding: 0;" (tap)="saveuserinfo()" >\n            <div style="float: right; width: 100%;">\n              <button ion-button full style="margin: 0;height: 5em; background-color: #73380d; width: 100%;">\n                <span style="margin-right: 1em;">Done</span>\n                <ion-icon name="md-checkbox-outline" style="font-size: 2em !important;color: #fff;"></ion-icon></button>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-footer>\n    '/*ion-inline-end:"C:\Users\Sela#\Desktop\Ionic Projects\akt\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_api_request_api_request__["a" /* ApiRequestProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=3.js.map