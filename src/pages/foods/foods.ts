import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import {Popoverprovider} from '../../providers/popover';

import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foods',
  templateUrl: 'foods.html',
})
export class FoodsPage {
  actions:any; data:any; currency: string="₵";productcode:any;prclustercode:any;productname:any; clustername:any;gottencartitem: any;cartiteminfo: any;arr: any;
  searchVal: any;searchresults: any;total_db:any;totalItems_db:any;cartinfo: any;gottenitem: any;cartcount:any;url:any;descending: boolean = false;order: number;
  column: string = 'name';searchQuery: string = '';items: any;orderPlaced_showmap: boolean = false;ads: any;restaurant_details:any;
  rest_name: any;rest_description: any;rest_location: any;rest_phone: any;rest_rate: any;rest_id: any;rest_coverimage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public popoverCtrl: PopoverController, public pop: Popoverprovider, public apiReq:ApiRequestProvider, public cart:CartProvider, public storage: Storage) {
    // this.url=localStorage.getItem('PhotoUrl')+'/products/';
    
    // this.url="http://localhost/atk.api/media/uploads/products/"; 
    this.url="http://tuyoinc.com/atk.api/media/uploads/products/"; 
    this.productcode = localStorage.getItem('Productcode');
    this.productcode = localStorage.getItem('productname');
    this.clustername = localStorage.getItem('BranchCode');
    this.total_db = 0;
    this.items = "";
    
    this.restaurant_details = this.navParams.get('restaurant_details');
    console.log(this.restaurant_details);
    this.rest_id = this.restaurant_details.rest_id;
    this.rest_name = this.restaurant_details.rest_name;
    this.rest_description = this.restaurant_details.rest_description;
    this.rest_location = this.restaurant_details.rest_location;
    this.rest_phone = this.restaurant_details.rest_phone;
    this.rest_rate = this.restaurant_details.rest_rate;
    this.rest_coverimage = this.restaurant_details.rest_coverimage;
    
  }


  ionViewWillEnter(){
    this.loadData();
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
    this.actions = "&actions=productfetch";
    this.data = "&rest_id="+this.rest_id;
    this.apiReq.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      
      if(repo.msg == 'true'){
        this.items = repo.data;
        console.log(this.items +' I have data!');
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

  openfoods() {
    this.navCtrl.push('FoodsPage');
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
  }


  presentPopover(event){
    this.pop.navPopover(event);
  }

  popView(){
    this.navCtrl.pop();
  }
}
