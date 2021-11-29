import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';


@Injectable()
export class ApiRequestProvider {
  initApi:string = "apikey=rL%N8f_4RYT+9m5tMKMv";
  
  // server:string = "http://localhost/atk.api/index.php";
  // server:string = "http://18.188.37.168/atk.api/index.php";
  server:string = "http://tuyoinc.com/atk.api/index.php";
  
  apiKey:any;
  loader:any;

  constructor(public http: Http, public toastCtr:ToastController, public loadingCtrl:LoadingController,public storage: Storage) {
    console.log('Hello ApiProvider Provider');
    var url_photo= "http://localhost/atk.api/media/uploads";
    localStorage.setItem('PhotoUrl',url_photo);

    var localstorage_apikey = localStorage.getItem('Token');
    
    if(localstorage_apikey == "" || localstorage_apikey == null){
      localstorage_apikey = "33938ba5341192c19f417e7ab7731b1de7e3d67485b7563eb5dc83c2162347182a2357991c1294f6c99d932be8b290b92bc44cc87fddb7e6c71430f1b1278495"
      console.log("key gotten again static");
    }else{
      console.log("Not null", localstorage_apikey);
    }

    this.apiKey = "apikey="+ localstorage_apikey;

  }

  initAccess(action,data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve)=>{
    this.http.post(this.server,this.initApi+action+data,{headers:headers}).retryWhen(error=>error.delay(500)).subscribe(res=>{
      resolve(res)
    },err=>{
      console.log(err);
      this.syserrorToast(err).then((err)=>{
        if(err){
          this.initAccess(action,data);
        }
      });
    })
  });
  }

  getData(action){
    return new Promise((resolve)=>{
    this.http.get(this.server+this.apiKey+action).retryWhen(error=>error.delay(500)).subscribe(res=>{
      resolve(res)
    },err=>{
      this.syserrorToast(err).then((err)=>{
        if(err){
          this.getData(action);
        }
      });
    })
  });
  }

  postData(action,data){

   

    var all = this.apiKey+action+data;
    console.log("Not null", all);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve)=>{
    this.http.post(this.server,all,{headers:headers}).retryWhen(error=>error.delay(1000)).subscribe(res=>{
      resolve(res)
    },err=>{
      this.syserrorToast(err).then((err)=>{
        if(err){
          this.postData(action,data);
        }
      });
    })
  });
  }

  syserrorToast(message, position='top'){
    return new Promise((resolve,reject)=>{
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      duration: 4000,
      cssClass:'connecterror'
    });
    toast.present();
  });
  }

  successToast(message, position='bottom'){
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      duration: 4000,
      cssClass: 'successtoast'
    });
    toast.present();
  }

  errorToast(message, position='top'){
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      duration: 4000,
      cssClass: 'errortoast'
    });
    toast.present();
  }

infoToast(message, position='top'){
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'infotoast'
    });
    toast.present();
  }

  pageLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }
  

  dismissLoading(){
    this.loader.dismiss();
  }
}
