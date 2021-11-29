import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
/**
 * Generated class for the Popover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class Popover {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popover');
  }

  close(){
    this.viewCtrl.dismiss();
  }

  toLoginPage(){
    localStorage.clear();

    this.storage.clear();

    this.navCtrl.push('HomePage');
    this.close()

  }

  toNotificationPage(){
    this.navCtrl.push('NotificationPage');
    this.close()
  }

  toProfilePage(){
    this.navCtrl.push('ProfilePage');
    this.close()
  }

  toHistoryPage(){
    this.navCtrl.push('HistoryPage');
    this.close()
  }

  



}
