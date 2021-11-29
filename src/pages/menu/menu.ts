import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {Popoverprovider} from '../../providers/popover';
import { Diagnostic } from '@ionic-native/diagnostic';

import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  @ViewChild(Slides) slides: Slides;
  actions:any; data:any; currency: string="₵";productcode:any;prclustercode:any;productname:any; clustername:any;gottencartitem: any;cartiteminfo: any;arr: any;
  searchVal: any;searchresults: any;total_db:any;totalItems_db:any;cartinfo: any;gottenitem: any;cartcount:any;url:any;descending: boolean = false;order: number;
  column: string = 'name';searchQuery: string = '';items: any;orderPlaced_showmap: boolean = false;ads: any;
  userslocation:any;username_:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public popoverCtrl: PopoverController, public pop: Popoverprovider, public apiReq:ApiRequestProvider, public cart:CartProvider, public storage: Storage,private diagnostic: Diagnostic, private _PLATFORM : Platform) {
    // this.url=localStorage.getItem('PhotoUrl')+'/products/';

    // this.url="http://localhost/atk.api/media/uploads/products/"; 
    this.url="http://tuyoinc.com/atk.api/media/uploads/products/"; 
    
    this.productcode = localStorage.getItem('Productcode');
    this.productcode = localStorage.getItem('productname');
    this.clustername = localStorage.getItem('BranchCode');
    this.username_ = localStorage.getItem('username');
    this.username_  = this.username_.charAt(0).toUpperCase() + this.username_.slice(1);;
    
    this.total_db = 0;


    this.userslocation = this.navParams.get('userslocation');

    if(this.userslocation == "" || this.userslocation == null ){
      this.userslocation = localStorage.getItem('userslocation');
    }

    
    // this.productcode = this.navParams.get('productcode');
    console.log('This is the info on menu ', this.userslocation);
    this.checklocation();
    this.loadData();

  }

  
  checklocation(){

    this.diagnostic.isLocationEnabled().then((isEnabled) => {
      if(!isEnabled && this._PLATFORM.is('cordova')){
          //handle confirmation window code here and then call switchToLocationSettings
        this.diagnostic.switchToLocationSettings();
      }
      else{   
      }
    })

  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.loadData();

    setTimeout(() => {

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  ionViewWillEnter(){
    
    // this.loadAds();
  }

  ionViewDidEnter(){
    console.log("Total Cart Items " , this.cartcount);
    this.cartcount_here();
    this.mapStatus();
  }

  cartcount_here(){
    this.cartcount = this.cart.count_me();
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

  loadData(){
    this.items =[];
    this.actions = "&actions=fetchrestaurants";
    this.data = "&userslocation="+this.userslocation;
    this.apiReq.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' I have data!');
      if(repo.msg == 'true'){
        this.items = repo.data;
      }else{
        this.apiReq.errorToast('Network is slow');
      }
    })
  }

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

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  goProductdetailsPage(id,name,price,photo) {
    this.navCtrl.push('ProductdetailsPage',{
      productcode:id,
      productname:name,
      productprice:price,
      productphoto:photo
    });
  }

  opencart() {
      this.navCtrl.push('CartPage');
  }

  opensearch() {
      this.navCtrl.push('SearchPage');
  }

  openfoods(restaurant_details) {

    this.navCtrl.push('FoodsPage',{
      restaurant_details:restaurant_details
    });
    
  }


  addToCart(prcode,productname,productprice){
    this.cart.addToCart(prcode,productname,productprice);
    this.cartcount_here();
  }

  carttotal(price){
    // Store pin in database
    this.storage.get('pricetotal').then((gottenitems) => {
      if(gottenitems != null){

          this.total_db = Number(gottenitems) + Number(price); 
          this.storage.set('pricetotal', this.total_db);
          console.log('Total not new', this.total_db);

      }else{
         this.total_db = Number(price); 
         this.storage.set('pricetotal', this.total_db);
         console.log('Total ', this.total_db);
      }
    });
  }

  cartItemsNum(){
    // Store pin in database
    this.storage.get('cartItemsNum').then((gottenitems) => {
      if(gottenitems != null){
          this.totalItems_db = Number(gottenitems) + 1; 
          this.storage.set('cartItemsNum', this.totalItems_db);
          console.log('Total Items in cart Not New', this.totalItems_db);
      }else{
         this.totalItems_db = 1; 
         this.storage.set('cartItemsNum', this.totalItems_db);
         console.log('Total Items in cart Old', this.totalItems_db);
      }
    });
  }

  GetcartItemsNum(){
    // Store pin in database
    this.storage.get('cartItemsNum').then((gottenitems) => {
      if(gottenitems != null){
          this.totalItems_db = Number(gottenitems); 
      }
    });

  }


  toCartPage(){
    this.navCtrl.push('CartPage');
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  toNotificationPage() {
    this.navCtrl.push('NotificationPage');
  }

  toMaplocPage() {
    this.navCtrl.push('MaplocPage');
  }

  toProductDetailsPage(id,name,price,photo) {
      this.navCtrl.push('ProductdetailsPage',{
        productcode:id,
        productname:name,
        productprice:price,
        productphoto:photo
      });
    // this.navCtrl.push('ProductdetailsPage');
  }


  presentPopover(event){
    this.pop.navPopover(event);
  }

  popView(){
    this.navCtrl.pop();
  }
}
