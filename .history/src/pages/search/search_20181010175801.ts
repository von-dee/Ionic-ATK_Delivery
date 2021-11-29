import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openrestaurants() {
    this.navCtrl.push('MenuPage');
  }

  
  selectlocation() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Your Location');

    alert.addInput({
      type: 'radio',
      label: 'Legon',
      value: 'legon',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'KNUST',
      value: 'knust'
    });

    alert.addInput({
      type: 'radio',
      label: 'Tarkwa',
      value: 'tarkwa'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        
        console.log('ionViewDidLoad SearchPage');

      }
    });
    alert.present();
  }

}