import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
productname:any; productprice:any; productimg:any; productcode:any; productphoto:any; url:any; currency:string="₵";
cartcount:any; total_db:any; cartinfo:any;actions:any; data:any;itemquantity:any;item_quantity_num:any;item_exists: boolean = false;
items:any; prclustercode:any; clustername:any; gottencartitem: any; cartiteminfo: any;gottenitem: any; beneficiarycode:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public apiReq:ApiRequestProvider) {
    // this.url=localStorage.getItem('PhotoUrl')+'/products/';
    this.url="http://localhost/thechoo.api/media/uploads/products/";
    this.productcode = this.navParams.get('productcode');
    this.productname = this.navParams.get('productname');
    this.productprice = this.navParams.get('productprice');
    this.productimg = this.navParams.get('productimg');
    this.productphoto = this.navParams.get('productphoto');
    this.beneficiarycode = localStorage.getItem('BeneficiaryID');
    let count = localStorage.getItem('CartCount');
    if(count){
      this.cartcount = count;
    }else{
      this.cartcount = 0;
    }

   
    this.item_quantity_num = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
    

  }

  ionViewDidEnter(){
    this.cartcount = localStorage.getItem('CartCount');
    this.loadcart();
   }

  opencart() {
    this.navCtrl.push('CartPage');
  }


  quantityedit(type,productname,productprice){

    if(this.item_exists == true){
      this.quantityedit_new(type,productname,productprice);
    }else{
      if(type == "add"){
        this.item_quantity_num = this.item_quantity_num + 1;
      }else{
        if(this.item_quantity_num != 1){
          this.item_quantity_num = this.item_quantity_num - 1;
        }      
      } 
    }


    
  }

  quantityedit_new(type,productname,productprice){
    if(type == "add"){
      this.update_quantity("add",productname,productprice);
    }else{
      if(this.item_quantity_num != 1){
       this.update_quantity("substract",productname,productprice);
      }      
    } 
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


  loadcart() {
    this.storage.get('currentcart').then((gottenitems) => {
      this.gottenitem = "[" + gottenitems + "]";
      this.cartinfo = JSON.parse(this.gottenitem);
  
      if(this.cartinfo =='' || this.cartinfo == '[]' || this.cartinfo == null || this.cartinfo  == 'false'){
        this.cartinfo = [];
      }
      console.log('Your cartitems are ', this.cartinfo);
      this.check_quantity(this.productname);
    });

    
  }


  check_quantity(productname){

      if(this.cartinfo.length != 0 ){

        let index_of_product = this.cartinfo.findIndex((item) => item.itemname === productname);

          if(index_of_product >= 0){
            this.item_quantity_num = this.cartinfo[index_of_product]['itemquantity'];
            console.log('Exists True ');
            this.item_exists = true;
          }else{
            this.item_quantity_num = 1;
            console.log('Does not exist ');
            this.item_exists = false;
          }

          console.log('Got into the check quantity section' , this.item_quantity_num);

      }else{

        this.item_exists = false;

      }      
  }

  addToCart(itemcode,itemname,itemprice){
    
    // Store pin in database
    // this.storage.get('currentcart').then((gottenitems) => {
    //   if(gottenitems != null){
    //       this.cartcount = Number(this.cartcount) + 1;
    //       localStorage.setItem('CartCount',JSON.stringify(this.cartcount));
    //       this.cartinfo ={ itemcode: itemcode, itemname: itemname, itemprice: itemprice, itemquantity: this.item_quantity_num}​​​​​​​;
    //       var cartinfostring = JSON.stringify(this.cartinfo);
    //       var newcartinfo = gottenitems + "," + cartinfostring;
    //       this.storage.set('currentcart', newcartinfo);
    //       this.apiReq.successToast('Product Added to Cart');
    //       console.log('Your cart items are ', newcartinfo);

    //   }else{
    //       this.cartcount = Number(this.cartcount) + 1;
    //       localStorage.setItem('CartCount',JSON.stringify(this.cartcount));
    //       this.cartinfo = { itemcode: itemcode, itemname: itemname, itemprice: itemprice, itemquantity: this.item_quantity_num}​​​​​​​;
    //       this.cartinfo = JSON.stringify(this.cartinfo);
    //       this.storage.set('currentcart', this.cartinfo);
    //       this.apiReq.successToast('Product Added to Cart');
    //       console.log('Your cart item is stored');
    //   }
    // });

    var Current_itemtotalcost = Number(itemprice) * Number(this.item_quantity_num);
    console.log('Total ');


    // this.carttotal(Current_itemtotalcost);
    // this.item_exists = true;
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
  

}
