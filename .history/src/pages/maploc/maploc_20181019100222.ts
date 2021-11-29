import { Component , ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';

import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { CallNumber } from '@ionic-native/call-number';

declare var google;

/**
 * Generated class for the MaplocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maploc',
  templateUrl: 'maploc.html',
})
export class MaplocPage {

  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  mylat: any;items: any;mylong: any;item: any;page_from: any;data: any;trans_code: any;
  pharm_name: any;pharm_location: any;pharm_longitude: any;api_data: any;
  pharm_phone: any;gottenitem: any;cartinfo: any;total_db: any;
  pharm_latitude: any;pharm_drugname: any; pharm_drugdescription: any;latLngme:any;action:any;datacollection:any;
  latme :any;total:any;itemsgotten:any;longme :any;PhoneNumber:any;

  constructor(public navCtrl: NavController, public storage: Storage, public api:ApiRequestProvider,private http: Http, public navParams: NavParams, private geolocation : Geolocation, private callNumber: CallNumber) {
    this.total_db = 0;
    this.page_from = this.navParams.get('page');
    this.PhoneNumber = localStorage.getItem('PhoneNumber');
    
    this.trans_code = localStorage.getItem('Transaction_Code');
  }


  ionViewDidLoad(){
    this.loadcart();
    this.getTotalPrice();
    this.initMap();
    this.getDeliveryGuyObservable();
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



  initMap() {

    this.geolocation.getCurrentPosition().then((position) => {

     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     this.latme = position.coords.latitude;
     this.longme = position.coords.longitude;

     let mapOptions = {
       center: latLng,
       zoom: 15
     }


     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     this.directionsDisplay.setMap(this.map);

     this.calculateAndDisplayRoute(this.longme,this.latme);

   }, (err) => {
     console.log(err);
   });


  }

  
  calculateAndDisplayRoute(guy_long,guy_lat) {
    var start = this.latme + ',' + this.longme;
    var end =   guy_lat + ',' + guy_long;

    // var start = '5.300622800000001,-1.9992394';
    // var end = '5.300535, -1.993902';

    console.log(start);


    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  pagepop(){
    this.navCtrl.push('MenuPage');
  }

  callPharmacy(){
    this.callNumber.callNumber(this.PhoneNumber, false)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  getDeliveryGuyObservable() {
    setTimeout(() => {
        this.fetchDeliveryGuysloc();
    }, 2000);
  }

  fetchDeliveryGuysloc() {
      console.log("Selasie is my name ");

      this.getDeliveryGuyObservable();

      // this.action = "&actions=deliveryguyloc";
      // this.datacollection = '&transcode='+ this.trans_code;
  
      //   this.api.postData(this.action,this.datacollection).then(res => {
      //     this.items=JSON.parse(res['_body']).response;
      //     this.api_data=JSON.parse(res['_body']).data;
         
      //     if(this.api_data.deliveryguy_longitude != null || this.api_data.deliveryguy_longitude != ""){
      //       this.calculateAndDisplayRoute(this.api_data.deliveryguy_longitude,this.api_data.deliveryguy_latitude);
      //     }
          
      //     if(this.api_data.delivery_status != "3" && this.api_data.delivery_status != null && this.api_data.delivery_status != ""){
      //       this.getDeliveryGuyObservable();
      //     }

      //     console.log("Tis is de res" , this.api_data.deliveryguy_latitude) ;
          
      //   }).catch(err=>{
      //     console.log(err);
      //   });
  
  }

}

