import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { MyApp } from './app.component';

import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { ApiRequestProvider } from '../providers/api-request/api-request';
import { OauthProvider } from '../providers/oauth/oauth';
import { Diagnostic } from '@ionic-native/diagnostic';

import { ModalContentPage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { Popoverprovider } from '../providers/popover';
import { Popover } from '../pages/popover/popover';

import { CartProvider } from '../providers/cart/cart';

@NgModule({
  declarations: [
    MyApp,
    Popover,
    ModalContentPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Popover,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Geolocation,
    LocationAccuracy,
    Diagnostic,
    Popoverprovider,
    ApiRequestProvider,
    OauthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider
  ]
})
export class AppModule {}
