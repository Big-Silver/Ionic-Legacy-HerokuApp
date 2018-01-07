webpackJsonp([3],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_message__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_firebase_analytics__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_firebase__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatPage = (function () {
    function ChatPage(navCtrl, db, params, userProvider, modal, alert, firebaseAnalytics, fb) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.db = db;
        this.params = params;
        this.userProvider = userProvider;
        this.modal = modal;
        this.alert = alert;
        this.firebaseAnalytics = firebaseAnalytics;
        this.fb = fb;
        this.ref = [];
        this.newMessage = '';
        this.messages = [];
        this.title = '#General';
        this.user = {};
        this.name = '';
        this.isReadUserExist = [];
        this.type = '';
        this.directChannel = '';
        this.showUserList = false;
        this.username = '';
        this.users = [];
        this.filteredUsers = [];
        this.atNumbers = 0;
        this.colors = ['#005aff', '#86d59b', '#00c0ff', '#7200ff'];
        // this.fb.logEvent('event', 'first').then(res => {
        //   console.log(res);
        // });
        // this.fb.getToken().then(res => {
        // }).catch(err => {
        // });
        this.db.list("userList").subscribe(function (data) {
            data.map(function (d) {
                if (((d.email !== localStorage.getItem("email") && d.email !== '') || (d.phoneNumber !== localStorage.getItem("phone") && d.email === '')) && d.facility === localStorage.getItem("facility") && d.type === "facility") {
                    _this.users.push(d);
                }
            });
        });
        this.title = params.get("title") ? params.get("title") : "#General";
        this.type = params.get("type") ? params.get("type") : '';
        this.directChannel = params.get("sender") && params.get("receiver") ? params.get("sender") + "-" + params.get("receiver") : '';
        if (typeof localStorage.getItem("channel") !== "undefined" && typeof localStorage.getItem("type") !== "undefined" && localStorage.getItem("type") === 'family' && typeof params.get("title") === 'undefined') {
            this.title = localStorage.getItem("channel");
        }
        this.userProvider.getTrueVault();
    }
    ChatPage.prototype.ngOnDestroy = function () {
        this.messageDB.unsubscribe();
    };
    ChatPage.prototype.ionicViewDidLoad = function () {
    };
    ChatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.userProvider.isSeletedChannel.subscribe(function (flag) {
            _this.messageDB = _this.db.list('/messages').subscribe(function (data) {
                _this.messages = [];
                _this.name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
                data.map(function (d) {
                    if (d.channel === _this.title && d.facility === localStorage.getItem("facility") && d.channelType === '') {
                        if (typeof d.bot === 'undefined' || d.bot === '' || (d.bot === localStorage.getItem('email') && d.bot !== '') || (d.bot === localStorage.getItem('phone') && d.bot !== '')) {
                            d.displayTime = _this.getDisplayTime(d.time);
                            _this.messages.push(d);
                            var index_1 = 0;
                            _this.messages.map(function (m) {
                                if (typeof m.readUsers !== 'undefined') {
                                    var flag_1 = false;
                                    m.readUsers.map(function (u) {
                                        u.displayTime = _this.getDisplayTime(u.time);
                                        if (u.name !== '' && u.name !== _this.name) {
                                            flag_1 = true;
                                            _this.isReadUserExist[index_1] = true;
                                        }
                                    });
                                    if (!flag_1) {
                                        _this.isReadUserExist[index_1] = false;
                                    }
                                    index_1++;
                                }
                            });
                            var flag_2 = true;
                            d.readUsers.map(function (user) {
                                // if(user.name === '' && d.name !== localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")) {
                                if (user.name === '') {
                                    flag_2 = false;
                                }
                                else if (user.name === localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")) {
                                    flag_2 = true;
                                    return;
                                }
                            });
                            if (!flag_2) {
                                d.readUsers.push({ name: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"), time: new Date().getTime(), displayTime: '', photoUrl: localStorage.getItem("photo") });
                                _this.db.list('/messages').update(d.$key, d);
                            }
                        }
                    }
                    else if (d.facility === localStorage.getItem("facility") && d.channelType === 'direct' && d.directChannel.indexOf(_this.params.get("sender")) >= 0 && d.directChannel.indexOf(_this.params.get("receiver")) >= 0) {
                        d.displayTime = _this.getDisplayTime(d.time);
                        _this.messages.push(d);
                        var index_2 = 0;
                        _this.messages.map(function (m) {
                            if (typeof m.readUsers !== 'undefined') {
                                var flag_3 = false;
                                m.readUsers.map(function (u) {
                                    u.displayTime = _this.getDisplayTime(u.time);
                                    if (u.name !== '' && u.name !== _this.name) {
                                        flag_3 = true;
                                        _this.isReadUserExist[index_2] = true;
                                    }
                                });
                                if (!flag_3) {
                                    _this.isReadUserExist[index_2] = false;
                                }
                                index_2++;
                            }
                        });
                        var flag_4 = true;
                        d.readUsers.map(function (user) {
                            // if(user.name === '' && d.name !== localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")) {
                            if (user.name === '') {
                                flag_4 = false;
                            }
                            else if (user.name === localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")) {
                                flag_4 = true;
                                return;
                            }
                        });
                        if (!flag_4) {
                            d.readUsers.push({ name: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"), time: new Date().getTime(), displayTime: '', photoUrl: localStorage.getItem("photo") });
                            _this.db.list('/messages').update(d.$key, d);
                        }
                    }
                });
            });
        });
    };
    ChatPage.prototype.send = function () {
        var _this = this;
        this.time = new Date().getTime();
        var message = {
            name: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"),
            email: localStorage.getItem("email"),
            type: localStorage.getItem("type"),
            phone: localStorage.getItem("phone"),
            facility: localStorage.getItem("facility"),
            channel: this.title,
            message: this.newMessage,
            time: this.time,
            photoUrl: localStorage.getItem("photo"),
            channelType: this.type,
            directChannel: this.directChannel,
            readUsers: [{ name: '', time: 0, displayTime: '', photoUrl: '' }],
            bot: ''
        };
        if (this.newMessage != '') {
            this.db.list('/messages').push(message).then(function (data) {
                _this.firebaseAnalytics.logEvent('messages', { message: 'message' })
                    .then(function (res) { return console.log(res); })
                    .catch(function (error) { return console.error(error); });
                _this.userProvider.sendTrueVault(message);
                if (typeof _this.params.get("email") !== 'undefined') {
                    if (_this.params.get("email") !== '') {
                        _this.userProvider.directMessage(_this.newMessage, [_this.params.get("email")]);
                    }
                    else {
                        _this.userProvider.sendSMS(_this.newMessage, [_this.params.get("phone")]);
                    }
                    // this.users.map(u => {
                    //   if(u.email === this.params.get("email") || u.phoneNumber === this.params.get("phone")) {
                    //     this.userProvider.sendSMS(this.newMessage, [u.phoneNumber]);
                    //   }
                    // });
                }
                else {
                    var emails_1 = [];
                    var phones_1 = [];
                    _this.users.map(function (u) {
                        if (_this.newMessage.indexOf("@" + u.firstName + "" + u.lastName) >= 0) {
                            emails_1.push(u.email);
                            phones_1.push(u.phoneNumber);
                            if (_this.newMessage.indexOf("@" + u.firstName + "" + u.lastName + ",") >= 0) {
                                _this.newMessage = _this.newMessage.replace("@" + u.firstName + "" + u.lastName + ",", "");
                            }
                            else {
                                _this.newMessage = _this.newMessage.replace("@" + u.firstName + "" + u.lastName, "");
                            }
                        }
                    });
                    _this.userProvider.directMessage(_this.newMessage, emails_1);
                    _this.userProvider.sendSMS(_this.newMessage, phones_1);
                }
                _this.newMessage = '';
            });
        }
    };
    ChatPage.prototype.getDisplayTime = function (time) {
        var timeDistance = new Date().getTime() - time;
        if (timeDistance / 1000 < 60) {
            return (timeDistance / 1000).toFixed() + ' seconds ago';
        }
        else if (timeDistance / 1000 >= 60 && timeDistance / 1000 < 3600) {
            return (timeDistance / 60000).toFixed() + ' minutes ago';
        }
        else if (timeDistance / 1000 >= 3600 && timeDistance / 1000 < 3600 * 24) {
            return (timeDistance / 3600000).toFixed() + ' hours ago';
        }
        else {
            return ((timeDistance / 3600000) / 24).toFixed() + ' days ago';
        }
    };
    ChatPage.prototype.showMessageModal = function (readers) {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_4__message_message__["a" /* MessagePage */], { readers: readers });
        modal.present();
    };
    ChatPage.prototype.checkName = function (event) {
        var _this = this;
        var filterStr = event.value.substring(event.value.lastIndexOf('@') + 1, event.value.length);
        this.filteredUsers = [];
        this.users.map(function (u) {
            if ((u.firstName + u.lastName).toLowerCase().indexOf(filterStr.toLowerCase()) >= 0) {
                _this.filteredUsers.push(u);
            }
        });
        if (event.value.substring(event.value.length - 1, event.value.length) === '@' && localStorage.getItem("channelType") === "departments") {
            this.showUserList = true;
            this.atNumbers += 1;
        }
        else if (event.value.match(/@/gi) === null || event.value.match(/@/gi).length < this.atNumbers) {
            this.showUserList = false;
            this.atNumbers = 0;
        }
    };
    ChatPage.prototype.setUser = function (user) {
        this.username = user.firstName + user.lastName;
        if (this.newMessage.indexOf('@' + this.username) < 0) {
            this.newMessage = this.newMessage.replace(this.newMessage.substring(this.newMessage.lastIndexOf('@'), this.newMessage.length), '@' + this.username);
        }
        this.showUserList = false;
    };
    return ChatPage;
}());
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chat',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/chat/chat.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n          <line data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="12" x2="23" y2="12" stroke-linejoin="round"></line>\n          <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="12" y1="5" x2="23" y2="5" stroke-linejoin="round"></line>\n          <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="19" x2="12" y2="19" stroke-linejoin="round"></line>\n          </g></svg>\n      </button>\n      <ion-title>{{title}}</ion-title>\n      <button class="option">\n          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n          <circle data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="12" cy="12" r="2" stroke-linejoin="round"></circle>\n          <circle fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="3" cy="12" r="2" stroke-linejoin="round"></circle>\n          <circle fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="21" cy="12" r="2" stroke-linejoin="round"></circle>\n          </g></svg>\n      </button>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item *ngFor="let message of messages; let i = index">\n      <div class="message_top">\n        <div class="avatar-div">\n          <!-- <img class="avatar" [src]="message.photoUrl" width="35" height="35"> -->\n          <div class="avatar" [style.backgroundColor]="colors[message.name.length % 4]">{{message.name.substring(0,1).toUpperCase()}}</div>\n        </div>\n        <div class="text-div">\n          <div class="usr_n">{{message.name}} <span *ngIf="message.title">/ {{message.title}}</span></div>\n          <span class="time_stamp">{{message.displayTime}}</span>\n          <div class="message-div">\n            <p>{{message.message}}</p>\n            <span *ngIf="isReadUserExist[i] && message.name !== \'Legacy Bot\'" (click)="showMessageModal(message.readUsers)" class="readers">Read by {{message.readUsers.length - 1}}</span>\n          </div>\n        </div>\n      </div>\n    </ion-item>\n  </ion-list>\n  <ion-list no-lines *ngIf="showUserList" class="auto-list">\n    <ion-item *ngFor="let u of filteredUsers" (click)="setUser(u)">@{{u.firstName + u.lastName}}</ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-input type="text" placeholder="Enter message..." [(ngModel)]="newMessage" (keyup.enter)="send()" (ionChange)="checkName($event)"></ion-input>\n  <button ion-button item-right (click)="send()" class="btn-send">Send</button>\n</ion-footer>'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/chat/chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_firebase__["a" /* Firebase */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__facilitysignup_facilitysignup__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(319);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.signin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__facilitysignup_facilitysignup__["a" /* FacilitysignupPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/home/home.html"*/'\n<ion-content padding>\n  <!-- <img src="assets/icon/home.png"> -->\n  <h4>Legacy</h4>\n</ion-content>\n<ion-footer>\n  <button block ion-button (click)="signup()" color="transparent" class="btn btn-transparent">Sign up</button>\n  <button block ion-button (click)="signin()" color="light" class="btn btn-light">Sign in</button>\n</ion-footer>'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/home/home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModalPage = (function () {
    function ModalPage(navCtrl, navParams, view, user, db, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.user = user;
        this.db = db;
        this.toast = toast;
        this.inviteData = {
            firstName: '',
            lastName: '',
            facilityName: '',
            email: '',
            number: '(1)',
            type: '',
            patient: '',
            inviteDate: new Date()
        };
        this.inviteType = '';
        this.patients = [];
        this.inviteType = this.navParams.get("type");
        this.inviteData.type = this.inviteType;
        user.patients.subscribe(function (d) {
            user.getPatients().then(function (data) {
                _this.patients = data;
            });
        });
    }
    ModalPage.prototype.ionViewDidLoad = function () {
    };
    ModalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    ModalPage.prototype.sendInvite = function () {
        var _this = this;
        this.inviteData.email = this.inviteData.email.toLowerCase();
        this.inviteData.facilityName = this.inviteData.facilityName.toLowerCase();
        this.closeModal();
        var message = 'Sent invitation.';
        this.presentToast(message);
        this.inviteData.facilityName = localStorage.getItem("facility") ? localStorage.getItem("facility") : '';
        this.user.sendInvitation(this.inviteData).then(function (data) {
            var message = 'Sent invitation successfully.';
            _this.presentToast(message);
        })
            .catch(function (err) {
        });
    };
    ModalPage.prototype.addPatient = function () {
        var _this = this;
        this.user.patients.subscribe(function (data) {
            console.log(data, localStorage.getItem("patientId"));
            if (typeof localStorage.getItem("patientId") === 'undefined' || localStorage.getItem("patientId") === '') {
                _this.db.list("/patients").push({ facility: localStorage.getItem("facility"), patients: [_this.inviteData.firstName + " " + _this.inviteData.lastName] });
            }
            else {
                if (typeof data !== 'undefined' && data.indexOf(_this.inviteData.firstName + " " + _this.inviteData.lastName) < 0) {
                    data.push(_this.inviteData.firstName + " " + _this.inviteData.lastName);
                    _this.db.list("/patients").update(localStorage.getItem("patientId"), { facility: localStorage.getItem("facility"), patients: data });
                }
                else if (typeof data === 'undefined') {
                    _this.db.list("/patients").update(localStorage.getItem("patientId"), { facility: localStorage.getItem("facility"), patients: [_this.inviteData.firstName + " " + _this.inviteData.lastName] });
                }
            }
        });
        var message = 'Added new patient successfully.';
        this.presentToast(message);
        this.closeModal();
    };
    ModalPage.prototype.presentToast = function (message) {
        var toast = this.toast.create({
            message: message,
            duration: 1500,
            position: 'top'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    return ModalPage;
}());
ModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-modal',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/modal/modal.html"*/'<!--\n  Generated template for the Modal page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title *ngIf="inviteType === \'family\'">Add family member</ion-title>\n    <ion-title *ngIf="inviteType === \'facility\'">Add facility member</ion-title>\n    <ion-title *ngIf="inviteType === \'patient\'">Add a patient</ion-title>\n    <button (click)="closeModal()" class="btn-close-modal">\n      <ion-icon name="close" ios="md-close"></ion-icon>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item>\n      <ion-label stacked class="first-label">First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="inviteData.firstName"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="inviteData.lastName"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="inviteType === \'family\'">\n      <ion-label stacked>Patient Name</ion-label>\n      <ion-select [(ngModel)]="inviteData.patient" multiple="false">\n        <ion-option *ngFor="let p of patients">{{p}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="inviteType !== \'patient\'">\n      <ion-label stacked>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="inviteData.email"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="inviteType !== \'patient\'">\n      <ion-label stacked>Phone Number</ion-label>\n      <ion-input type="text" [(ngModel)]="inviteData.number"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button block ion-button color="secondary" class="btn btn-green" (click)="sendInvite()" [disabled]="(!inviteData.email && !inviteData.number) || !inviteData.firstName || !inviteData.lastName" *ngIf="inviteType === \'facility\'">Send Invitation</button>\n  <button block ion-button color="secondary" class="btn btn-green" (click)="sendInvite()" [disabled]="(!inviteData.email && !inviteData.number) || !inviteData.firstName || !inviteData.lastName || !inviteData.patient" *ngIf="inviteType === \'family\'">Send Invitation</button>\n  <button block ion-button color="secondary" class="btn btn-green" (click)="addPatient()" [disabled]="!inviteData.firstName || !inviteData.lastName" *ngIf="inviteType === \'patient\'">Add Patient</button>\n</ion-content>'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/modal/modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
], ModalPage);

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, user, load, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.load = load;
        this.toast = toast;
        this.updateData = {
            firstname: '',
            lastname: '',
            title: '',
            password: '',
            confirmpassword: '',
        };
        this.facility = localStorage.getItem("facility");
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.signOut = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        this.user.logout();
    };
    SettingsPage.prototype.update = function () {
        var loading = this.load.create({
            spinner: 'hide',
            content: "\n        <div class=\"loading\">\n          <h4>Legacy</h4>\n        </div>"
        });
        loading.present();
        var toast = this.toast.create({
            message: "User has been updated successfully.",
            duration: 1500,
            position: 'bottom'
        });
        this.user.updateUser(this.updateData).then(function (res) {
            loading.dismiss();
            toast.present();
        });
    };
    SettingsPage.prototype.sendFeedback = function () {
    };
    SettingsPage.prototype.rateUs = function () {
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n        <line data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="12" x2="23" y2="12" stroke-linejoin="round"></line>\n        <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="12" y1="5" x2="23" y2="5" stroke-linejoin="round"></line>\n        <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="19" x2="12" y2="19" stroke-linejoin="round"></line>\n        </g></svg>\n    </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item-group>\n    <ion-item-divider color="light">About</ion-item-divider>\n    <ion-item>\n      <ion-input type="text" placeholder="First Name" [(ngModel)]="updateData.firstname"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" placeholder="Last Name" [(ngModel)]="updateData.lastname"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="text" placeholder="Job Title" [(ngModel)]="updateData.title"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="password" placeholder="Enter New Password" [(ngModel)]="updateData.password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="password" placeholder="Enter Confirm Password" [(ngModel)]="updateData.confirmpassword"></ion-input>\n    </ion-item>\n    <!-- <ion-item-divider color="light">Support</ion-item-divider>\n    <button ion-item (click)="sendFeedback()" class="btn" detail-none>Send us Feedback</button>\n    <button ion-item (click)="rateUs()" class="btn" detail-none>Rate Us!</button> -->\n    <ion-item-divider color="light">Logged in as {{facility}}</ion-item-divider>\n    <button ion-item (click)="signOut()" class="btn" detail-none>Log out</button>\n  </ion-item-group>\n  <button block ion-button (click)="update()" [disabled]="!updateData.firstname && !updateData.lastname && !updateData.title && !updateData.password && !updateData.confirmpassword || updateData.password !== updateData.confirmpassword" class="btn btn-blue btn-update">Update</button>  \n</ion-content>\n'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/settings/settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, userService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.title = '';
        this.feedback = '';
        this.feedbackList = [];
        this.title = this.navParams.get('title');
        this.userService.getFeedbacks().then(function (res) {
            res.map(function (r) {
                if ((r.email !== '' && r.email === localStorage.getItem('email')) || (r.email === '' && r.phone === localStorage.getItem('phone'))) {
                    _this.feedbackList.push(r);
                }
            });
        });
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
    };
    FeedbackPage.prototype.sendFeedback = function () {
        var _this = this;
        if (this.feedback !== '') {
            this.userService.sendFeedback(this.feedback).then(function (res) {
                _this.feedbackList = [];
                res.map(function (r) {
                    if ((r.email !== '' && r.email === localStorage.getItem('email')) || (r.email === '' && r.phone === localStorage.getItem('phone'))) {
                        _this.feedbackList.push(r);
                    }
                });
            });
            this.feedback = '';
        }
    };
    return FeedbackPage;
}());
FeedbackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-feedback',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/feedback/feedback.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n      <line data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="12" x2="23" y2="12" stroke-linejoin="round"></line>\n      <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="12" y1="5" x2="23" y2="5" stroke-linejoin="round"></line>\n      <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="19" x2="12" y2="19" stroke-linejoin="round"></line>\n      </g></svg>\n    </button>\n    <ion-title>{{title}}</ion-title>\n    <button class="option">\n      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n      <circle data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="12" cy="12" r="2" stroke-linejoin="round"></circle>\n      <circle fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="3" cy="12" r="2" stroke-linejoin="round"></circle>\n      <circle fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="21" cy="12" r="2" stroke-linejoin="round"></circle>\n      </g></svg>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item *ngFor="let f of feedbackList">\n      <p>{{ f.description }}</p>\n      <p>\n        <span class="date">{{ f.date }}</span>\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <ion-input type="text" placeholder="Enter feedback..." [(ngModel)]="feedback" (keyup.enter)="sendFeedback()"></ion-input>\n  <button ion-button item-right (click)="sendFeedback()" class="btn-send">Send Feedback</button>\n</ion-footer>'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/feedback/feedback.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* UserProvider */]])
], FeedbackPage);

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 196:
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
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/feedback/feedback.module": [
		751,
		2
	],
	"../pages/home/home.module": [
		749,
		1
	],
	"../pages/settings/settings.module": [
		750,
		0
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
webpackAsyncContext.id = 239;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacilitysignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FacilitysignupPage = (function () {
    function FacilitysignupPage(navCtrl, navParams, provider, loading, alert, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.loading = loading;
        this.alert = alert;
        this.db = db;
        this.signupData = {
            facility: '',
            emailphone: '',
            email: '',
            phone: ''
        };
        this.facilities = [];
        this.tempFacilities = [];
        this.showList = false;
        db.list("facilities").subscribe(function (data) {
            _this.facilities = data;
            _this.tempFacilities = data;
        });
    }
    FacilitysignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FacilitysignupPage');
    };
    FacilitysignupPage.prototype.ionViewWillEnter = function () {
        this.signupData.email = '';
        this.signupData.phone = '';
    };
    FacilitysignupPage.prototype.signup = function () {
        var _this = this;
        if (parseInt(this.signupData.emailphone.substring(0, 1)) > 0) {
            this.signupData.phone = this.signupData.emailphone;
        }
        else {
            this.signupData.email = this.signupData.emailphone.toLowerCase();
        }
        this.signupData.facility = this.signupData.facility.toLowerCase();
        if (this.signupData.facility.indexOf(" ") >= 0) {
            var alert_1 = this.alert.create({
                message: 'Facility name can not include space.',
                buttons: [{ text: "OK" }]
            });
            alert_1.present();
            return;
        }
        var loading = this.loading.create({
            spinner: 'hide',
            content: "\n        <div class=\"loading\">\n          <h4>Legacy</h4>\n        </div>"
        });
        loading.present();
        this.provider.isInvited(this.signupData).then(function (data) {
            console.log(data);
            loading.dismiss();
            if (typeof data === "boolean") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */], { isInvited: false, data: _this.signupData });
            }
            else if (typeof data === "object") {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */], { isInvited: true, data: data });
            }
        }).catch(function (err) {
            loading.dismiss();
            var alert = _this.alert.create({
                message: err.message,
                buttons: [{ text: "OK" }]
            });
            alert.present();
        });
    };
    FacilitysignupPage.prototype.selectFacility = function (value) {
        this.signupData.facility = value;
        this.showList = false;
    };
    FacilitysignupPage.prototype.getFilteredFacilities = function (event) {
        var _this = this;
        var key = event.target.value;
        this.facilities = [];
        this.tempFacilities.map(function (f) {
            if (f.$value.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                _this.facilities.push(f);
            }
        });
    };
    return FacilitysignupPage;
}());
FacilitysignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-facilitysignup',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/facilitysignup/facilitysignup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h6>First Step<span>1/2</span></h6>\n  <p>Enter your email and facility name.</p>\n  <ion-list no-lines>\n    <ion-item>\n      <ion-label stacked>Email / Phone Number</ion-label>\n      <ion-input type="text" [(ngModel)]="signupData.emailphone"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Facility Name</ion-label>\n      <ion-input type="text" [(ngModel)]="signupData.facility" (focus)="showList = true" (keyup)="getFilteredFacilities($event)"></ion-input>\n    </ion-item>\n    <ion-list *ngIf="showList" class="facility-list" no-lines>\n      <ion-item *ngFor="let f of facilities" (click)="selectFacility(f.$value)">\n        {{ f.$value }}\n      </ion-item>\n    </ion-list>\n  </ion-list>\n  <button block ion-button (click)="signup()" [disabled]="!signupData.facility || !signupData.emailphone" class="btn btn-blue">Sign up</button>  \n</ion-content>\n'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/facilitysignup/facilitysignup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], FacilitysignupPage);

//# sourceMappingURL=facilitysignup.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_firebase_analytics__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_chat__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, alertCtrl, db, userProvider, toast, loading, firebaseAnalytics) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.userProvider = userProvider;
        this.toast = toast;
        this.loading = loading;
        this.firebaseAnalytics = firebaseAnalytics;
        this.signupData = {
            firstName: '',
            lastName: '',
            facilityName: '',
            phone: '(1)',
            email: '',
            password: '',
            repassword: '',
            type: 'facility',
            patient: '',
            createdAt: new Date()
        };
        this.isAdded = false;
        this.isInvited = false;
        this.invitedEmail = '';
        this.invitedPhone = '';
        this.isInvited = navParams.data.isInvited;
        if (this.isInvited) {
            var data = navParams.data.data;
            this.signupData.firstName = data.firstName;
            this.signupData.lastName = data.lastName;
            this.signupData.facilityName = data.facilityName;
            this.signupData.phone = '(1)' + data.number;
            this.signupData.email = data.email;
            this.signupData.type = data.type;
            this.signupData.patient = data.patient;
            this.invitedEmail = data.email;
            this.invitedPhone = data.number;
        }
        else {
            var data = navParams.data.data;
            this.signupData.facilityName = data.facility;
            this.signupData.email = data.email.toLowerCase();
            this.signupData.phone = '(1)' + data.phone;
            this.invitedEmail = data.email.toLowerCase();
            this.invitedPhone = '(1)' + data.phone;
        }
    }
    SignupPage.prototype.ionViewDidEnter = function () {
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        this.signupData.facilityName = this.signupData.facilityName.toLowerCase();
        this.signupData.email = this.signupData.email.toLowerCase();
        var loading = this.loading.create({
            spinner: 'hide',
            content: "\n        <div class=\"loading\">\n          <h4>Legacy</h4>\n        </div>"
        });
        loading.present();
        this.db.list("/facilities").subscribe(function (data) {
            if (_this.signupData.password !== _this.signupData.repassword) {
                loading.dismiss();
                var alert_1 = _this.alertCtrl.create({
                    message: 'Please enter same password in re-enter password.',
                    buttons: ['OK']
                });
                _this.signupData.repassword = '';
                alert_1.present();
                return;
            }
            if (!_this.isAdded) {
                _this.isAdded = true;
                _this.userProvider.adduser(_this.signupData)
                    .then(function (data) {
                    _this.firebaseAnalytics.logEvent('signup users', { email: _this.signupData.email, phone: _this.signupData.phone })
                        .then(function (res) { return console.log(res); })
                        .catch(function (error) { return console.error(error); });
                    loading.dismiss();
                    _this.presentToast("Signed up successfully.");
                    _this.userProvider.setPatients().then(function (d) {
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__chat_chat__["a" /* ChatPage */]);
                    });
                })
                    .catch(function (err) {
                    loading.dismiss();
                    _this.isAdded = false;
                    var alert = _this.alertCtrl.create({
                        title: 'Error',
                        message: err.message,
                        buttons: ['OK']
                    });
                    alert.present();
                });
            }
        });
    };
    SignupPage.prototype.presentToast = function (message) {
        var toast = this.toast.create({
            message: message,
            duration: 1500,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <h6>Second Step<span>2/2</span></h6>\n  <p>Enter your name, phone number and password.</p>\n  <ion-list no-lines>\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="signupData.email" [disabled]="invitedEmail.length > 0"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Phone Number</ion-label>\n      <ion-input type="text" [(ngModel)]="signupData.phone" [disabled]="invitedPhone.length > 3"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Facility Name</ion-label>\n      <ion-input type="text" [(ngModel)]="signupData.facilityName" disabled></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="signupData.firstName"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="signupData.lastName"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="signupData.password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Re-enter Password</ion-label>\n      <ion-input type="password" [(ngModel)]="signupData.repassword"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button block ion-button class="btn btn-blue" (click)="signup()" [disabled]="(!signupData.email && !signupData.phone) || !signupData.password || !signupData.repassword || !signupData.firstName || !signupData.lastName || !signupData.facilityName">Signup</button>\n</ion-content>\n'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagePage = (function () {
    function MessagePage(navCtrl, navParams, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.readers = [];
        this.name = '';
        this.colors = ['#86d59b', '#005aff'];
        this.readers = this.navParams.get("readers");
        this.name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
    }
    MessagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagePage');
    };
    MessagePage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    return MessagePage;
}());
MessagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-message',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/message/message.html"*/'\n<ion-header>\n  <ion-navbar>\n    <ion-title>Message Read By</ion-title>\n    <button (click)="closeModal()" class="btn-close-modal">\n      <ion-icon name="close" ios="md-close"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list *ngFor="let u of readers" no-lines>\n    <ion-item *ngIf="u.name !== name && u.name !== \'\'">\n      <!-- <img [src]="u.photoUrl" width="35" height="35"> -->\n      <div class="avatar" [style.backgroundColor]="colors[u.name.length % 2]">{{u.name.substring(0,1).toUpperCase()}}</div>\n      <div>\n        <p class="name">{{u.name}}</p>\n        <p class="time">Read Message {{u.displayTime}}</p>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/message/message.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
], MessagePage);

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = (function () {
    function LoginPage(navCtrl, userProvider, alertCtrl, loading) {
        this.navCtrl = navCtrl;
        this.userProvider = userProvider;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.loginData = {
            emailphone: '',
            password: '',
            email: '',
            phone: ''
        };
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        if (parseInt(this.loginData.emailphone.substring(0, 1)) > 0) {
            this.loginData.phone = this.userProvider.getPhoneNumber(this.loginData.emailphone);
        }
        else {
            this.loginData.email = this.loginData.emailphone.toLowerCase();
        }
        var loading = this.loading.create({
            spinner: 'hide',
            content: "\n        <div class=\"loading\">\n          <h4>Legacy</h4>\n        </div>"
        });
        loading.present();
        var flag = false;
        this.userProvider.login(this.loginData)
            .then(function (data) {
            _this.userProvider.setPatients().then(function (d) {
                if (!flag) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__chat_chat__["a" /* ChatPage */]);
                    flag = true;
                    loading.dismiss();
                }
            }).catch(function (err) {
                loading.dismiss();
            });
        })
            .catch(function (err) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                message: err.message,
                buttons: ['OK']
            });
            alert.present();
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n \n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item>\n      <ion-label stacked class="first-label">Email / Phone Number</ion-label>\n      <ion-input type="email" [(ngModel)]="loginData.emailphone"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="loginData.password"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button block ion-button (click)="login()" [disabled]="!loginData.emailphone || !loginData.password" class="btn btn-blue">Login</button>  \n</ion-content>'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_modal__ = __webpack_require__(184);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DirectoryPage = (function () {
    function DirectoryPage(navCtrl, navParams, db, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.title = "";
        this.users = [];
        this.tempUsers = [];
        this.searchKey = '';
        this.result = '';
        this.colors = ['#005aff', '#86d59b', '#00c0ff', '#7200ff'];
        this.title = 'Facility Directory';
        this.db.list("/userList").subscribe(function (data) {
            var facility = '';
            data.map(function (user) {
                if (localStorage.getItem("email") === user.email && localStorage.getItem("phone") === user.phoneNumber) {
                    facility = user.facility;
                }
            });
            data.map(function (user) {
                if (facility === user.facility) {
                    user.photoUrl = localStorage.getItem("photo");
                    _this.users.push(user);
                    _this.tempUsers.push(user);
                }
            });
        });
    }
    DirectoryPage.prototype.ionViewDidLoad = function () {
    };
    DirectoryPage.prototype.presentModal = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modal_modal__["a" /* ModalPage */]);
        modal.present();
    };
    DirectoryPage.prototype.getUsers = function (event) {
        var _this = this;
        console.log(event);
        this.searchKey = event.target.value;
        this.users = [];
        this.tempUsers.map(function (user) {
            var username = user.firstName + " " + user.lastName;
            if (username.toLowerCase().indexOf(_this.searchKey.toLowerCase()) >= 0) {
                _this.users.push(user);
            }
        });
        this.result = this.users.length + " results";
    };
    return DirectoryPage;
}());
DirectoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-directory',template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/pages/directory/directory.html"*/'<!--\n  Generated template for the Directory page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n        <line data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="12" x2="23" y2="12" stroke-linejoin="round"></line>\n        <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="12" y1="5" x2="23" y2="5" stroke-linejoin="round"></line>\n        <line fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="19" x2="12" y2="19" stroke-linejoin="round"></line>\n        </g></svg>\n    </button>\n    <ion-title>{{title}}</ion-title>\n    <button class="option">\n        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24"><g transform="translate(0, 0)">\n        <circle data-color="color-2" fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="12" cy="12" r="2" stroke-linejoin="round"></circle>\n        <circle fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="3" cy="12" r="2" stroke-linejoin="round"></circle>\n        <circle fill="none" stroke="#252b3b" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" cx="21" cy="12" r="2" stroke-linejoin="round"></circle>\n        </g></svg>\n    </button>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-input (keyup)="getUsers($event)" id="search" placeholder="search..."></ion-input>\n  <p class="result">{{result}}</p>\n  <ion-list class="userlist" no-lines>\n    <ion-item *ngFor="let user of users">\n      <div class="item">\n        <!-- <img [src]="user.photoUrl" width="40" height="40" class="avatar"> -->\n        <div class="avatar" [style.backgroundColor]="colors[(user.firstName.length + user.lastName.length + 1) % 4]">{{user.firstName.substring(0,1).toUpperCase()}}</div>\n        <div class="usr_s">\n          {{user.firstName + " " + user.lastName}} <span *ngIf="user.title">/ {{user.title}}</span>\n        </div>\n      </div>\n    </ion-item>\n  </ion-list>\n  <ion-fab>\n    <button ion-fab color="secondary"><ion-icon name="add"></ion-icon></button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/pages/directory/directory.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], DirectoryPage);

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(367);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export config */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_facilitysignup_facilitysignup__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_directory_directory__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_modal_modal__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_message_message__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_feedback_feedback__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_user__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_firebase_analytics__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_firebase__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_database__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_http__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var config = {
    apiKey: "AIzaSyBW5Hn3GzzCWLkoAjYwoeuipNd_EmmBPSM",
    authDomain: "legacy-f1a71.firebaseapp.com",
    databaseURL: "https://legacy-f1a71.firebaseio.com",
    projectId: "legacy-f1a71",
    storageBucket: "legacy-f1a71.appspot.com",
    messagingSenderId: "954500088643"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_directory_directory__["a" /* DirectoryPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_modal_modal__["a" /* ModalPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_facilitysignup_facilitysignup__["a" /* FacilitysignupPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_feedback_feedback__["a" /* FeedbackPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_19_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
            __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_20_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_22__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                scrollAssist: true,
                autoFocusAssist: false,
                backButtonText: '',
                iconMode: 'ios',
                modalEnter: 'modal-slide-in',
                modalLeave: 'modal-slide-out',
                tabsPlacement: 'bottom',
                pageTransition: 'ios-transition'
            }, {
                links: [
                    { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/feedback/feedback.module#FeedbackPageModule', name: 'FeedbackPage', segment: 'feedback', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_directory_directory__["a" /* DirectoryPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_modal_modal__["a" /* ModalPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_facilitysignup_facilitysignup__["a" /* FacilitysignupPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_feedback_feedback__["a" /* FeedbackPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_14__providers_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_firebase__["a" /* Firebase */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var serverUrl = 'https://us-central1-legacy-f1a71.cloudfunctions.net/';
// const serverUrl = 'http://localhost:5000/legacy-f1a71/us-central1/';
var UserProvider = (function () {
    function UserProvider(auth, db, zone, http) {
        var _this = this;
        this.auth = auth;
        this.db = db;
        this.zone = zone;
        this.http = http;
        this.user = {};
        this.firestore = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage();
        this.headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.facilities = [];
        this.isLogout = false;
        this.subscribes = [];
        this.truevaultToken = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"]('');
        this.isSetUser = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"](false);
        this.isConfirmedCode = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"](false);
        this.patients = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"]([]);
        this.directUsers = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"]([]);
        this.invitationData = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"]({});
        this.isSeletedChannel = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"](false);
        this.userList = this.db.list("/userList");
        this.confirmDataList = this.db.list("/confirmData");
        this.patientList = this.db.list("/patients");
        this.facilityList = this.db.list("/facilities");
        this.subscribes[0] = this.facilityList.subscribe(function (data) {
            _this.facilities = data;
        });
        var authUrl = 'https://api.truevault.com/v1/auth/login';
        var formData = new FormData();
        formData.append("username", "test");
        formData.append("password", "test");
        formData.append("account_id", "562ad185-5324-4abb-be69-f017c9a6954a");
        this.http.post(authUrl, formData).subscribe(function (data) {
            _this.truevaultToken.next(data.json().user.access_token);
        });
    }
    UserProvider.prototype.adduser = function (newuser) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.auth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password)
            // .then(data => {
            if (newuser.phone !== '') {
                newuser.phone = _this.getPhoneNumber(newuser.phone);
            }
            newuser.email = newuser.email.toLowerCase();
            // this.getImageUrl('').then(url => {
            _this.userList.push({
                firstName: newuser.firstName,
                lastName: newuser.lastName,
                email: newuser.email,
                password: newuser.password,
                phoneNumber: newuser.phone,
                facility: newuser.facilityName,
                type: newuser.type,
                patient: newuser.patient,
                photo: '',
                // photoUrl: url,
                photoUrl: '',
                status: 'online'
            }).then(function (data) {
                _this.setCurrentUser(newuser);
                _this.createBotMessage(newuser);
                _this.sendWelcomeEmail(newuser);
                _this.sendWelcomeSMS(newuser);
                resolve(data);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
            // });
            _this.subscribes[1] = _this.facilityList.subscribe(function (data) {
                var flag = false;
                data.map(function (d) {
                    if (d.$value === newuser.facilityName) {
                        flag = true;
                    }
                });
                if (!flag) {
                    _this.facilityList.push(newuser.facilityName);
                }
            });
            // })
            // .catch(err => {
            //   reject(err);
            // });
        });
    };
    UserProvider.prototype.login = function (user) {
        var _this = this;
        this.isLogout = false;
        user.email = user.email.toLowerCase();
        return new Promise(function (resolve, reject) {
            var isExist = false;
            _this.subscribes[2] = _this.userList.subscribe(function (data) {
                data.map(function (d) {
                    if (((d.email === user.email && d.email !== '') || (d.phoneNumber === user.phone && d.phoneNumber.length === 10)) && d.password === user.password && !_this.isLogout) {
                        d.isLogin = true;
                        _this.userList.update(d.$key, d);
                        isExist = true;
                        _this.setCurrentUser(user);
                        resolve(true);
                    }
                });
                if (!isExist || data.length === 0) {
                    reject({ message: "User doesn't exist or Email(or Phone Number) / Password is wrong." });
                }
            });
        });
    };
    UserProvider.prototype.getImageUrl = function (photo) {
        var _this = this;
        var image = '';
        image = photo != '' ? photo : 'person-flat.png';
        return new Promise(function (resolve, reject) {
            _this.firestore.ref().child(image).getDownloadURL().then(function (url) {
                _this.zone.run(function () {
                    resolve(url);
                });
            }).catch(function (err) {
                reject('');
            });
        });
    };
    UserProvider.prototype.sendInvitation = function (inviteUser) {
        var _this = this;
        if (inviteUser.number !== '') {
            inviteUser.number = this.getPhoneNumber(inviteUser.number);
        }
        inviteUser.key = localStorage.getItem("inviteKey") ? localStorage.getItem("inviteKey") : '';
        var url = serverUrl + "sendEmail";
        return new Promise(function (resolve, reject) {
            _this.http.post(url, { user: inviteUser, type: 'sendInvite' }, _this.options).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.getCurrentUser = function () {
        var user = {
            email: localStorage.getItem("email") ? localStorage.getItem("email") : '',
            firstName: localStorage.getItem("firstName") ? localStorage.getItem("firstName") : '',
            lastName: localStorage.getItem("lastName") ? localStorage.getItem("lastName") : '',
            type: localStorage.getItem("type") ? localStorage.getItem("type") : '',
            facility: localStorage.getItem("facility") ? localStorage.getItem("facility") : '',
            photo: localStorage.getItem("photo") ? localStorage.getItem("photo") : '',
        };
        return user;
    };
    UserProvider.prototype.setCurrentUser = function (user) {
        var _this = this;
        this.subscribes[3] = this.userList.subscribe(function (data) {
            var users = [];
            var phone = user.phone !== '' ? _this.getPhoneNumber(user.phone) : user.phone;
            var facility = '';
            data.map(function (d) {
                if ((d.email == user.email && user.email != '') || (d.phoneNumber == phone && user.email == '')) {
                    facility = d.facility;
                }
            });
            data.map(function (d) {
                if ((d.email == user.email && user.email != '') || (d.phoneNumber == phone && user.email == '')) {
                    localStorage.setItem("facility", d.facility);
                    localStorage.setItem("firstName", d.firstName);
                    localStorage.setItem("lastName", d.lastName);
                    localStorage.setItem("type", d.type);
                    localStorage.setItem("email", d.email);
                    localStorage.setItem("photo", d.photoUrl);
                    localStorage.setItem("channel", d.patient);
                    localStorage.setItem("phone", d.phoneNumber);
                    localStorage.setItem("userid", d.$key);
                    _this.isSetUser.next(true);
                    if (d.type === "facility") {
                        localStorage.setItem("channelType", "departments");
                    }
                    else {
                        localStorage.setItem("channelType", "");
                    }
                    return;
                }
                else {
                    if (d.type === "facility" && d.facility === facility) {
                        users.push({ email: d.email, name: d.firstName + " " + d.lastName, phone: d.phoneNumber });
                    }
                }
            });
            _this.directUsers.next(users);
        });
    };
    UserProvider.prototype.confirmInvitation = function (inviteCode) {
        var _this = this;
        var url = serverUrl + "sendEmail";
        return new Promise(function (resolve, reject) {
            _this.http.post(url, { code: inviteCode, email: localStorage.getItem("email"), type: 'confirmInvite' }, _this.options).subscribe(function (data) {
                resolve(data.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.setPatients = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.subscribes[4] = _this.patientList.subscribe(function (data) {
                var flag = false;
                data.map(function (d) {
                    if (d.facility === localStorage.getItem("facility")) {
                        flag = true;
                        localStorage.setItem("patientId", d.$key);
                        _this.patients.next(d.patients);
                        resolve(data);
                    }
                });
                if (!flag || data.length === 0) {
                    localStorage.setItem("patientId", '');
                    _this.patients.next([]);
                    resolve(false);
                }
            });
        });
    };
    UserProvider.prototype.getPatients = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.subscribes[5] = _this.patientList.subscribe(function (data) {
                data.map(function (d) {
                    if (d.facility == localStorage.getItem("facility")) {
                        resolve(d.patients);
                    }
                });
            });
        });
    };
    UserProvider.prototype.isInvited = function (signupData) {
        var _this = this;
        if (signupData.phone !== '') {
            signupData.phone = this.getPhoneNumber(signupData.phone);
        }
        return new Promise(function (resolve, reject) {
            _this.subscribes[6] = _this.userList.subscribe(function (data) {
                data.map(function (d) {
                    if (((d.email === signupData.email && d.email !== '') || (d.phoneNumber === signupData.phone && d.email === '')) && d.facility !== signupData.facility) {
                        reject({ message: "Email or Phone Number is already registered in other facility." });
                        return;
                    }
                });
            });
            _this.subscribes[7] = _this.confirmDataList.subscribe(function (data) {
                var flagEmail = false;
                data.map(function (d) {
                    if (((d.email === signupData.email && d.email !== '') || (d.number === signupData.phone && d.number !== '')) && d.facilityName === signupData.facility) {
                        resolve(d);
                    }
                    else if (((d.email === signupData.email && d.email !== '') || (d.phoneNumber === signupData.phone && d.email === '')) && d.facilityName !== signupData.facility) {
                        reject({ message: "Email or Phone Number is already registered in other facility." });
                    }
                    else {
                        _this.facilities.map(function (d) {
                            if (d.$value === signupData.facility) {
                                flagEmail = true;
                            }
                        });
                    }
                });
                if (!flagEmail) {
                    resolve(flagEmail);
                }
                else {
                    reject({ message: "Please use invited Email or Phone Number for this facility." });
                }
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.sendTrueVault = function (message) {
        var _this = this;
        this.truevaultToken.subscribe(function (token) {
            var url = 'https://api.truevault.com/v1/vaults/a8f0106b-da4e-41e4-a8f6-fa666ddbad93/documents';
            var option = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({
                headers: new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({ 'Authorization': 'Basic ' + btoa(token + ':""') })
            });
            var formData = new FormData();
            formData.append('document', new Buffer(JSON.stringify(message)).toString("base64"));
            formData.append('schema_id', 'cf4f4dcb-7913-4d0f-82b7-60e5e8dc5841');
            formData.append('owner_id', 'a3478cc8-386c-4e62-ba65-939520be5fc1');
            _this.http.post(url, formData, option).subscribe(function (data) {
                console.log(data);
            });
        });
    };
    UserProvider.prototype.getTrueVault = function () {
        var _this = this;
        this.truevaultToken.subscribe(function (token) {
            var docUrl = 'https://api.truevault.com/v1/vaults/a8f0106b-da4e-41e4-a8f6-fa666ddbad93/schemas/cf4f4dcb-7913-4d0f-82b7-60e5e8dc5841/documents';
            var option = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({
                headers: new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({ 'Authorization': 'Basic ' + btoa(token + ':""') })
            });
            _this.http.get(docUrl, option).subscribe(function (data) {
            });
        });
    };
    UserProvider.prototype.directMessage = function (message, emails) {
        var url = serverUrl + 'directMessage';
        if (emails.length > 0) {
            this.http.post(url, { emails: emails, message: message }, this.options).subscribe(function (data) {
            });
        }
    };
    UserProvider.prototype.sendSMS = function (message, phones) {
        var url = serverUrl + 'sendSMS';
        if (phones.length > 0) {
            this.http.post(url, { phones: phones, message: message }, this.options).subscribe(function (data) {
                console.log(data);
            });
        }
    };
    UserProvider.prototype.logout = function () {
        var _this = this;
        this.isLogout = true;
        var sub = this.userList.subscribe(function (data) {
            data.map(function (d) {
                if ((d.email !== '' && d.email === localStorage.getItem('email')) || (d.phoneNumber === localStorage.getItem("phone") && d.email === '') && _this.isLogout) {
                    d.isLogin = false;
                    _this.userList.update(d.$key, d);
                }
            });
        });
        sub.unsubscribe();
        this.subscribes.map(function (sub) {
            sub.unsubscribe();
        });
        localStorage.setItem("patientId", '');
    };
    UserProvider.prototype.sendWelcomeEmail = function (user) {
        var url = serverUrl + 'welcomeMessage';
        this.http.post(url, { email: user.email, name: user.firstName + " " + user.lastName }, this.options).subscribe(function (data) {
            console.log(data);
        });
    };
    UserProvider.prototype.sendWelcomeSMS = function (user) {
        var url = serverUrl + 'welcomeSMS';
        this.http.post(url, { phone: user.phoneNumber, name: user.firstName + " " + user.lastName }, this.options).subscribe(function (data) {
            console.log(data);
        });
    };
    UserProvider.prototype.createBotMessage = function (user) {
        var msgContent = 'Welcome to Legacy!To get started, click on the menu icon in the upper lefthand corner.You can: 1. Leave messages for #Departments 2. Invite other facility staff 3. Add patients 4. Invite family members of patients 5. @Tag staff members 6. See who has read your messages & when they read them. Enjoy!';
        var message = { channel: "#General", channelType: '', directChannel: '', email: user.email, phone: user.phone, facility: user.facilityName, name: 'Legacy Bot', photoUrl: '', time: new Date().getTime(), type: user.type, message: msgContent, bot: user.email === '' ? user.phone : user.email, readUsers: [{ name: '', time: 0, displayTime: '', photoUrl: 'https://firebasestorage.googleapis.com/v0/b/legacy-f1a71.appspot.com/o/person-flat.png?alt=media&token=2ddd322f-02fe-4b25-a960-5f14e6112a8e' }] };
        this.db.list("/messages").push(message);
    };
    UserProvider.prototype.getPhoneNumber = function (phoneStr) {
        var phone = '';
        var numlist = phoneStr.match(/\d+/g);
        numlist.map(function (num) {
            phone += num;
        });
        phone = phone.substr(phone.length - 10);
        return phone;
    };
    UserProvider.prototype.updateUser = function (user) {
        var _this = this;
        var firstName = user.firstname !== '' ? user.firstname : localStorage.getItem("firstName");
        var lastName = user.lastname !== '' ? user.lastname : localStorage.getItem("lastName");
        setTimeout(function () {
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
        }, 5000);
        return new Promise(function (resolve, reject) {
            _this.subscribes[8] = _this.userList.subscribe(function (data) {
                data.map(function (d) {
                    if ((d.email !== '' && d.email === localStorage.getItem('email')) || (d.phoneNumber === localStorage.getItem("phone") && d.email === '')) {
                        d.firstName = user.firstname !== '' ? user.firstname : d.firstName;
                        d.lastName = user.lastname !== '' ? user.lastname : d.lastName;
                        d.title = user.title !== '' ? user.title : (typeof d.title === 'undefined' ? '' : d.title);
                        d.password = user.password !== '' ? user.password : d.password;
                        _this.userList.update(d.$key, d);
                        localStorage.setItem("title", d.title);
                        resolve('success');
                    }
                });
            });
            _this.subscribes[9] = _this.db.list('messages').subscribe(function (data) {
                data.map(function (d) {
                    if ((d.email !== '' && d.email === localStorage.getItem('email') && d.bot === '') || (d.phoneNumber === localStorage.getItem("phone") && d.email === '' && d.bot === '')) {
                        d.title = user.title !== '' ? user.title : (typeof d.title === 'undefined' ? '' : d.title);
                        d.name = firstName + ' ' + lastName;
                        d.readUsers.map(function (u) {
                            if (u.name === localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')) {
                                u.name = firstName + ' ' + lastName;
                            }
                        });
                        d.directChannel.replace(localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName'), d.name);
                        _this.db.list('messages').update(d.$key, d);
                    }
                });
            });
        });
    };
    UserProvider.prototype.sendFeedback = function (feedback) {
        var _this = this;
        var date = new Date();
        return new Promise(function (resolve, reject) {
            _this.subscribes[9] = _this.db.list("feedbackList").push({ description: feedback, email: localStorage.getItem('email'), phone: localStorage.getItem('phone'), name: localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName'), date: date.toString().substring(4, 15) }).then(function (res) {
                _this.db.list("feedbackList").subscribe(function (data) {
                    resolve(data);
                });
            });
        });
    };
    UserProvider.prototype.getFeedbacks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.subscribes[10] = _this.db.list("feedbackList").subscribe(function (data) {
                resolve(data);
            });
        });
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]) === "function" && _d || Object])
], UserProvider);

var _a, _b, _c, _d;
//# sourceMappingURL=user.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(387).Buffer))

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_directory_directory__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_modal_modal__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_feedback_feedback__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl, user, config, db) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        this.user = user;
        this.config = config;
        this.db = db;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */];
        this.facility = '';
        this.username = '';
        this.photoUrl = '';
        this.userType = 'facility';
        this.directs = [];
        this.patients = [];
        this.directNewStatus = [];
        this.colors = ['#005aff', '#86d59b', '#00c0ff', '#7200ff'];
        // all platforms
        this.config.set('scrollPadding', false);
        this.config.set('scrollAssist', false);
        this.config.set('autoFocusAssist', false);
        // android
        this.config.set('android', 'scrollAssist', true);
        this.config.set('android', 'autoFocusAssist', 'delay');
        this.initializeApp();
        this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */];
        this.departments = [
            { title: '#General', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: true },
            { title: '#Activities', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: false },
            { title: '#Dietary', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: false },
            { title: '#Nursing', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: false },
            { title: '#BusinessOffice', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: false },
            { title: '#DSD', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: false },
            { title: '#MDS', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "departments", selected: false },
        ];
        this.settings = [
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */], channel: "settings" },
            { title: 'Directory', component: __WEBPACK_IMPORTED_MODULE_7__pages_directory_directory__["a" /* DirectoryPage */], channel: "settings" },
            { title: 'Invite Facility Workers', component: __WEBPACK_IMPORTED_MODULE_8__pages_modal_modal__["a" /* ModalPage */], channel: "settings", type: "modal", inviteType: 'facility' },
            { title: 'Invite Family Member', component: __WEBPACK_IMPORTED_MODULE_8__pages_modal_modal__["a" /* ModalPage */], channel: "settings", type: "modal", inviteType: 'family' },
            { title: 'Add a Patient', component: __WEBPACK_IMPORTED_MODULE_8__pages_modal_modal__["a" /* ModalPage */], channel: "settings", type: "modal", inviteType: 'patient' },
            { title: 'Feedback', component: __WEBPACK_IMPORTED_MODULE_10__pages_feedback_feedback__["a" /* FeedbackPage */], channel: "settings" },
            { title: 'Log out', component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "settings" }
        ];
        this.user.directUsers.subscribe(function (data) {
            _this.directs = [];
            if (localStorage.getItem("type") === "facility") {
                data.map(function (d) {
                    _this.directs.push({ title: d.name, component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], email: d.email, phone: d.phone, type: "direct", receiver: d.name, sender: localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"), selected: false });
                });
            }
        });
        this.user.patients.subscribe(function (data) {
            _this.patients = [];
            if (typeof data !== 'undefined' && localStorage.getItem("patientId") !== '') {
                data.map(function (d) {
                    if (localStorage.getItem("type") == "facility") {
                        var isAlready_1 = false;
                        _this.patients.map(function (page) {
                            if (page.title === d) {
                                isAlready_1 = true;
                            }
                        });
                        if (data.indexOf(d) >= 0 && !isAlready_1) {
                            _this.patients.push({ title: d, component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "patients", selected: false });
                        }
                    }
                    else {
                        _this.patients = [{ title: localStorage.getItem("channel"), component: __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */], channel: "patients", selected: false }];
                    }
                });
            }
            _this.db.list("userList").subscribe(function (data) {
                _this.directNewStatus = [];
                data.map(function (d) {
                    _this.directs.map(function (dir) {
                        if ((d.email !== '' && d.email === dir.email) || (d.email === '' && d.phoneNumber === dir.phoneNumber)) {
                            _this.directNewStatus.push(d.isLogin ? true : false);
                        }
                    });
                });
            });
            _this.db.list('messages').subscribe(function (data) {
                data.map(function (d) {
                    if (d.type === localStorage.getItem("type") && d.facility === localStorage.getItem("facility") && (d.bot === '' || d.bot === localStorage.getItem('email') || d.bot === localStorage.getItem('phone')) && d.directChannel === '') {
                        var flag_1 = false;
                        d.readUsers.map(function (user) {
                            if (user.name === localStorage.getItem("firstName") + ' ' + localStorage.getItem('lastName')) {
                                flag_1 = true;
                            }
                        });
                        if (!flag_1) {
                            _this.departments.map(function (channel) {
                                if (channel.title === d.channel) {
                                    channel.new = true;
                                }
                            });
                            _this.patients.map(function (channel) {
                                if (channel.title === d.channel) {
                                    channel.new = true;
                                }
                            });
                        }
                        else {
                            _this.departments.map(function (channel) {
                                if (channel.title === d.channel) {
                                    channel.new = false;
                                }
                            });
                            _this.patients.map(function (channel) {
                                if (channel.title === d.channel) {
                                    channel.new = false;
                                }
                            });
                        }
                    }
                    else if (d.type === localStorage.getItem("type") && d.facility === localStorage.getItem("facility") && (d.bot === '' || d.bot === localStorage.getItem('email') || d.bot === localStorage.getItem('phone')) && d.directChannel.indexOf(localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')) >= 0) {
                        var flag_2 = false;
                        d.readUsers.map(function (user) {
                            if (user.name === localStorage.getItem("firstName") + ' ' + localStorage.getItem('lastName')) {
                                flag_2 = true;
                            }
                        });
                        if (!flag_2) {
                            _this.directs.map(function (channel) {
                                if (channel.title === d.channel) {
                                    channel.new = true;
                                }
                            });
                        }
                        else {
                            _this.directs.map(function (channel) {
                                if (channel.title === d.channel) {
                                    channel.new = false;
                                }
                            });
                        }
                    }
                });
            });
        });
        this.user.isSetUser.subscribe(function (d) {
            _this.username = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
            _this.facility = localStorage.getItem("facility");
            _this.photoUrl = localStorage.getItem("photo");
            _this.userType = localStorage.getItem("type");
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        localStorage.setItem("channelType", page.channel);
        this.departments.map(function (page) {
            page.selected = false;
        });
        if (page.component === __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */]) {
            this.user.isSeletedChannel.next(true);
        }
        page.selected = true;
        if (page.type) {
            this.nav.setRoot(page.component, { title: page.title, type: page.type, sender: page.sender, receiver: page.receiver, email: page.email, phone: page.phone });
        }
        else {
            this.nav.setRoot(page.component, { title: page.title });
        }
    };
    MyApp.prototype.signOut = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */]);
        this.user.logout();
    };
    MyApp.prototype.presentModal = function (page) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_modal_modal__["a" /* ModalPage */], { title: page.title, type: page.inviteType });
        modal.present();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Volumes/data/git-projects/legacy/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-content>\n    <button class="btn-close" menuToggle>\n      <ion-icon name="close" ios="md-close"></ion-icon>\n    </button>\n    <div class="facility_usr">\n      <div class="avatar" [style.backgroundColor]="colors[username.length % 4]">{{username.substring(0,1).toUpperCase()}}</div>\n      <!-- <img class="avatar_drk" [src]="photoUrl" width="50" height="50"> -->\n      <div class="usr_f">{{facility}}</div>\n    </div>\n    <h4 *ngIf="userType == \'facility\'">Departments</h4>\n    <ion-list *ngIf="userType == \'facility\'" no-lines>\n      <button *ngFor="let p of departments" menuClose ion-item (click)="openPage(p)" [class.isDepartmentSelected]="p.selected" [class.isDepartmentNew]="p.new" class="btn" detail-none>\n        {{p.title}}\n      </button>\n    </ion-list>\n    <h4>Patients</h4>\n    <ion-list no-lines>\n      <button *ngFor="let p of patients" menuClose ion-item (click)="openPage(p)" [class.isPatientNew]="p.new" class="btn" detail-none>\n        {{p.title}}\n      </button>\n    </ion-list>\n    <p *ngIf="userType == \'facility\' && patients.length == 0" class="no-notice">No patients added</p>\n    <h4 *ngIf="userType == \'facility\'">Direct Messages</h4>\n    <ion-list *ngIf="directs.length != 0" no-lines>\n      <button *ngFor="let d of directs;let i = index" menuClose ion-item (click)="openPage(d)" [class.isDirectLogin]="directNewStatus[i]" [class.isDirectNew]="d.new" class="btn" detail-none>\n        <div class="direct-point"></div>\n        {{d.title}}\n      </button>\n    </ion-list>\n    <p *ngIf="userType == \'facility\' && directs.length == 0" class="no-notice">No facility members</p>\n    <ion-list no-lines>\n      <h4>Facility Settings</h4>\n      <button menuClose ion-item (click)="openPage(settings[5])" class="btn" detail-none>Feedback</button>\n      <button menuClose ion-item (click)="openPage(settings[0])" class="btn" detail-none>Settings</button>\n      <button menuClose ion-item (click)="openPage(settings[1])" class="btn" detail-none>Directory</button>\n      <button menuClose ion-item (click)="presentModal(settings[2])" *ngIf="userType == \'facility\'" class="btn" detail-none>Invite Facility Workers</button>\n      <button menuClose ion-item (click)="presentModal(settings[3])" class="btn" detail-none>Invite Family Member</button>\n      <button menuClose ion-item (click)="presentModal(settings[4])" *ngIf="userType == \'facility\'" class="btn" detail-none>Add a Patient</button>\n      <button menuClose ion-item (click)="signOut()" class="btn" detail-none>Log out</button>\n    </ion-list>    \n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Volumes/data/git-projects/legacy/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_11__providers_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Config */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[362]);
//# sourceMappingURL=main.js.map