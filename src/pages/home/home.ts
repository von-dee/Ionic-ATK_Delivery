import { Component } from '@angular/core';
import { IonicPage, NavController,  NavParams, ModalController, ViewController,AlertController,Platform } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { CartProvider } from '../../providers/cart/cart';


import { Storage } from '@ionic/storage';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  isLoggedIn:boolean = false;
  users: any; pwd:any; uname:any; data:any;
  actions:any;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController , public navParams: NavParams, public api:ApiRequestProvider, public cart:CartProvider,  public storage: Storage) {
    }

  

    loginUser(){
      this.api.pageLoading('Loggin in...');
      this.actions = "&actions=loginuser";
      this.data = "&usname="+this.uname+"&pwd="+this.pwd;
      this.api.initAccess(this.actions,this.data).then((res)=>{
        let repo = JSON.parse(res['_body']);
        if(repo.data == 'true'){
          console.log('Am Here! ',repo);
          localStorage.setItem('BranchCode',repo.branchcode);
          localStorage.setItem('PhotoUrl',repo.photourl);
          localStorage.setItem('BranchName',repo.branchname);
          localStorage.setItem('Email',repo.email);
          localStorage.setItem('FullName',repo.fullname);
          localStorage.setItem('Token',repo.key);
          localStorage.setItem('PhoneNumber',repo.phonenumber);
          localStorage.setItem('UserID',repo.userid);
          localStorage.setItem('photo',repo.photo);
          localStorage.setItem('username',repo.username);

          this.storage.set('Token', repo.key);
          
          this.toMenuPage();
          this.api.dismissLoading();
        }
      })
    }
  
    openModal() {
      let modal = this.modalCtrl.create(ModalContentPage);
      modal.present();
    }
  

  toMenuPage(){
    this.navCtrl.push('SearchPage');
  }

}




@Component({
  template: `
  
  <style media="screen">
  .button-outline-md {
    border-width: 1px;
    border-style: solid;
    border-color: #86470d;
    color: #86470d;
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  
  .item-md {
    padding-left: 16px;
    padding-right: 0;
    position: relative;
    font-size: 1.6rem;
    font-weight: normal;
    text-transform: none;
    color: #000;
    background-color: #f7f7f5;
  }
  </style>
  
  <ion-content style="background-color: #f7f7f5;">
    <div style="text-align: right;margin-right: 1.5rem;">
      <p (tap)="dismiss()"><ion-icon name="close" style="font-size: 1.7em !important; color: #86470d;"></ion-icon></p>
    </div>
    <h1 style="margin-top: 0rem; margin-left: 2rem; font-size: 2.2rem;"> &nbsp; <span style="font-size: 3rem;font-weight: 200;">SIGN UP</span></h1>
  
    <div style="text-align: center; padding-left: 4rem; padding-right: 3rem;">
      <ion-item>
        <ion-label floating>Username</ion-label>
        <ion-input type="text" value=""  [(ngModel)]="usname" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Phone Number</ion-label>
        <ion-input type="number" value=""  [(ngModel)]="phonenumber" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Password</ion-label>
        <ion-input type="password" value=""  [(ngModel)]="pwd" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Confirm Password</ion-label>
        <ion-input type="password" value=""  [(ngModel)]="pwdconfirm" ></ion-input>
      </ion-item>
     <button ion-button round outline style="margin-top: 7rem;"  (tap)="saveuser();" >Submit</button>
    </div>
  
  </ion-content>
  `
  })
  export class ModalContentPage {
  
    usname: any; pwd:string; phonenumber: any; email:any; Pharmlocation:any;pwdconfirm:any;
  actions:any;data:any;repo:any;
  
  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController,public navCtrl: NavController,public alertCtrl:AlertController, public api:ApiRequestProvider) {
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  saveuser(){
    
    this.api.pageLoading('Signing up...');
    this.actions = "&actions=saveuser";
    this.data = "&usname="+this.usname+"&pwd="+this.pwd+"&phonenumber="+this.phonenumber; 
   
    if(this.pwd == this.pwdconfirm){
      this.api.initAccess(this.actions,this.data).then(res=>{
        let repo = JSON.parse(res['_body']);
        console.log(repo +' I have data!');
        if(repo.data == 'true'){
          this.api.dismissLoading();
          this.dismiss();
          this.api.errorToast('Sign Up was successful');
        }else{
          this.api.dismissLoading();
          this.api.errorToast('Network is slow');
        }
      })
    }else{
      this.api.dismissLoading();
      this.showAlert("Your passwords are not the same");
    }

  }

  toMenuPage(){
    this.navCtrl.push('MenuPage');
  }

  
  showAlert(messsage){
    return new Promise((resolve,reject)=>{
    let alert=this.alertCtrl.create({
      title:"Sorry",
      subTitle:messsage,
      buttons:[
      {text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          resolve(false);
        }
      }]
    })
    alert.present();
    });
  }
  
  
  }
  