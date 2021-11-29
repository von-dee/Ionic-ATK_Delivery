import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { CartProvider } from '../../providers/cart/cart';

declare var google;

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartinfo: any;
  gottenitem: any;
  totalItems_db: any;
  total_db:any;
  clustername:any;
  beneficiaryname:any;
  fullname:any;
  branchcode:any;
  walletcode:any;
  action:any;
  data:any;
  items:any;
  count_now:any;orderPlaced_showmap:any;
  wallet_balance:any; benefiqrcode:any; beneficiarycode:any; userid:any;
  item_quantity_num:any; location:any; locationlat :any;locationlong:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController, public api:ApiRequestProvider, public cart:CartProvider, private geolocation : Geolocation) {
    this.total_db=0;
    this.userid = localStorage.getItem('UserID');
    this.fullname = localStorage.getItem('FullName');
    this.branchcode = localStorage.getItem('BranchCode');
    this.clustername = localStorage.getItem('BranchName');
    this.walletcode = localStorage.getItem('WalletCode');
    this.wallet_balance = localStorage.getItem('WalletBalance');
    this.beneficiaryname = localStorage.getItem('BeneficiaryName');
    this.beneficiarycode = localStorage.getItem('BeneficiaryID');
    this.benefiqrcode = localStorage.getItem('BeneficiaryQRCODE');

    this.orderPlaced_showmap = false;
    this.location = "Achimota ABC";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.getTotalPrice();
    this.loadcart();
    this.GetcartItemsNum();
    this.initMap();
    this.mapStatus();
  }

  loadcart() {
    this.storage.get('currentcart').then((gottenitems) => {
      this.gottenitem = "[" + gottenitems + "]";
      this.cartinfo = JSON.parse(this.gottenitem);
  
      if(this.cartinfo =='' || this.cartinfo == '[]' || this.cartinfo == null || this.cartinfo  == 'false'){
        this.cartinfo = [];
      }
      console.log('Your cartitems are ', this.cartinfo);
    });
  }
  
  mapStatus(){
    this.storage.get('mapstatus').then((gottenitems) => {
      if(gottenitems != null){
        if(gottenitems == "pending"){
          this.orderPlaced_showmap = true;
        }else{
          this.orderPlaced_showmap = false;
         }
      }
    });
  }

  initMap() {

    this.geolocation.getCurrentPosition().then((position) => {

     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     this.locationlat = position.coords.latitude;
     this.locationlong = position.coords.longitude;
    //  console.log("Your long and lat ",this.locationlat);
   }, (err) => {
     console.log(err);
   });


  }


  Subtract_from_total(price){
    
    // Store pin in database
    this.storage.get('pricetotal').then((gottenitems) => {
      if(gottenitems != null){
          this.total_db = Number(gottenitems) - Number(price); 
          this.storage.set('pricetotal', this.total_db);
          console.log('Subtracting from total', this.total_db);
      }else{   
         this.total_db = 0;
         console.log('Subtracting. Nothing dey total ', this.total_db);
      }
    });

    this.total_db = this.total_db - price;

  }

  getTotalPrice(){
    // Store pin in database
    this.storage.get('pricetotal').then((gottenitems) => {
      if(gottenitems != null){

          this.total_db = Number(gottenitems);
          console.log('Get Total Price Old', this.total_db);

      }else{
         this.total_db = 0;
         console.log('Get total price New ', this.total_db);
      }
    });

  }

  
  removeitem(item){
        this.storage.get('currentcart').then((gottenitems) => {
          this.gottenitem = "[" + gottenitems + "]";
          this.cartinfo = JSON.parse(this.gottenitem);
          //this.cartinfo = this.cartinfo.filter(item => item.itemname !== itemname);

          var index = this.cartinfo.findIndex(x => x.itemname == item.itemname);
          
          console.log("Item Position" , index);

          this.cartinfo.splice(index,1);

          if (this.cartinfo === undefined || this.cartinfo.length == 0) {
            console.log("Array is empty");
            this.storage.remove('currentcart');
          }else{
              var cartinfo_var = JSON.stringify(this.cartinfo);
              cartinfo_var = cartinfo_var.replace('[', '');
              cartinfo_var = cartinfo_var.replace(']', '');
              this.storage.set('currentcart', cartinfo_var);
          }
          
          var pricetot = Number(item.itemprice) * Number(item.itemquantity) 
          this.Subtract_from_total(pricetot);
          console.log("Item Removed");
        });
        
        this.Subtract_from_total(item.itemprice);

        this.ReduceCartItemsNum();
  }

  pagepop(){
    this.navCtrl.pop();
  }

  ReduceCartItemsNum(){
    
     this.count_now = localStorage.getItem('CartCount');
     console.log('Cart total ', this.count_now);

    if(this.count_now === undefined || this.count_now == null || this.count_now == ""){
      console.log('Cart total Nill');
    }else{
      this.count_now = Number(this.count_now) - 1;
      localStorage.setItem('CartCount',this.count_now);
      console.log('Cart total Deduction done');
    }

  }


  refreshPage() {
    console.log('Page is refreshed ');
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    //this.viewCtrl.getContent();
  }
  
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Confired transaction. Buy clicked');
            this.SetMapStatus("pending");
            this.checkout();
          }
        }
      ]
    });
    alert.present();
  }

  checkout(){

    this.action = "&actions=savetransaction";
    this.data = '&transusercode='+this.userid+'&transqrcode='+ this.benefiqrcode + '&walletcode='+this.walletcode + '&producttotalcost='+ this.total_db + '&productlist='+  this.gottenitem + '&location='+  this.location + '&locationlat='+  this.locationlat + '&locationlong='+  this.locationlong + '&username='+ this.fullname ;

      this.api.postData(this.action,this.data).then(res => {
        this.items=JSON.parse(res['_body']).response;
        var transcode_ =JSON.parse(res['_body']).data;
        console.log(this.items);
        if(this.items=='true'){
          localStorage.setItem('Transaction_Code',transcode_);          
        }else{
          this.api.errorToast('Processing Error!');
        }
      }).catch(err=>{
        console.log(err);
      });

  }

  toMapPage(){
    this.navCtrl.push('MaplocPage');
  }

  SetMapStatus(type){
    // Store pin in database
    if(type == "pending"){
      this.storage.set('mapstatus', "pending");
      console.log("Set map status to pending");
    }else{
      this.storage.set('mapstatus', "none");
      console.log("Set map status to none");
    }
  }

  showAlert(message_title,message_detail) {
    const alert = this.alertCtrl.create({
      title: message_title,
      subTitle: message_detail,
      buttons: ['OK']
    });
    alert.present();
  }

  GetcartItemsNum(){
    // Store pin in database
    this.storage.get('cartItemsNum').then((gottenitems) => {
      if(gottenitems != null){
          this.totalItems_db = Number(gottenitems); 
      }else{
          this.totalItems_db = 0; 
      }
    });

  }


  update_quantity(operation_type,productname,productprice){

    if(operation_type == "add"){

        let index_of_product = this.cartinfo.findIndex((item) => item.itemname === productname);
        var current_quantity = this.cartinfo[index_of_product]['itemquantity'];
    
        this.item_quantity_num = Number(current_quantity) + 1;
        this.cartinfo[index_of_product]['itemquantity'] = this.item_quantity_num;

        var cartinfostring = JSON.stringify(this.cartinfo);
        cartinfostring = cartinfostring.replace('[', '');
        cartinfostring = cartinfostring.replace(']', '');
        this.storage.set('currentcart', cartinfostring);

        this.edittotal("add",productprice)
        console.log('Your addition', this.item_quantity_num);
 
    }else{

        let index_of_product = this.cartinfo.findIndex((item) => item.itemname === productname);
        var current_quantity_sub = this.cartinfo[index_of_product]['itemquantity'];
    
        this.item_quantity_num = Number(current_quantity_sub) - 1;
        this.cartinfo[index_of_product]['itemquantity'] = this.item_quantity_num;
  
        var cartinfostring_sub = JSON.stringify(this.cartinfo);
        cartinfostring_sub = cartinfostring_sub.replace('[', '');
        cartinfostring_sub = cartinfostring_sub.replace(']', '');
        this.storage.set('currentcart', cartinfostring_sub);
    
        this.edittotal("subtract",productprice)
        console.log('Your subtraction', this.item_quantity_num);

    }
 
   }
 
   quantityedit(type,productname,productprice){
     if(type == "add"){
       this.update_quantity("add",productname,productprice);
     }else{
       if(this.item_quantity_num != 1){
        this.update_quantity("substract",productname,productprice);
       }      
     } 
   }


   edittotal(type,price){
    // Store total price in database
    this.storage.get('pricetotal').then((gottenitems) => {
      if(gottenitems != null){
          if(type == "add"){
            this.total_db = Number(gottenitems) + Number(price); 
            this.storage.set('pricetotal', this.total_db);
            this.cart_number_edit("add");
            console.log('Total add', this.total_db);
          }else{
            this.total_db = Number(gottenitems) - Number(price); 
            this.storage.set('pricetotal', this.total_db);
            this.cart_number_edit("minus");
            console.log('Total subtract', this.total_db);
          }
      }
    });

  }
  

  cart_number_edit(type){

    if(type == "add"){
      var count = localStorage.getItem('CartCount');
      var count_now = Number(count) + 1;
      localStorage.setItem('CartCount',JSON.stringify(count_now));
    }else{
      var count_minus = localStorage.getItem('CartCount');
      var count_now_minus = Number(count_minus) - 1;
      localStorage.setItem('CartCount',JSON.stringify(count_now_minus));
    }

   
  }

  clear_Cart(){
    this.storage.remove('currentcart');
    this.storage.remove('pricetotal');
    localStorage.removeItem('CartCount');
    this.cartinfo = [];
    this.total_db = 0; 
  }
  

}
