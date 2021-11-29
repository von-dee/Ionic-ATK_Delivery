import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  testRadioOpen:boolean;
  testRadioResult:any;
  selected_location:any = "East Legon";
  selected_category:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openrestaurants(userslocation) {

    this.navCtrl.push('MenuPage',{
      userslocation : userslocation
    });

  }

  presentToast(data,status) {
    var message;
    if(status == "1"){
      message = 'You selected ' + data;
    }else{
      message = "No " + data + " records yet";
    }

    this.selected_category = data;
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  
  selectlocation() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Your Location');

    alert.addInput({
      type: 'radio',
      label: 'East Legon',
      value: 'East Legon',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'UG Legon',
      value: 'UG Legon'
    });


    alert.addInput({
      type: 'radio',
      label: 'KNUST',
      value: 'KNUST'
    });

    alert.addInput({
      type: 'radio',
      label: 'Tarkwa',
      value: 'Tarkwa'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.selected_location = data;

        localStorage.setItem('userslocation',data);
        console.log('This is the info ', data);
        this.openrestaurants(data)

      }
    });
    alert.present();
  }

}