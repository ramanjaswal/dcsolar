import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ProfilePageModule } from './profile/profile.module';
import { RidePageModule } from './home/mileage/ride/ride.module';
import { AddPageModule as AddCustomerPageModule } from './customers/add/add.module';

import { EditPageModule as EditEventModule } from './home/calendar/edit/edit.module';
import { HttpClientModule }    from '@angular/common/http';

// import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AuthGuardService as AuthGuard } from './helpers/auth-guard.service';

import { IonicStorageModule } from '@ionic/storage';

import { ProfileButtonComponent } from './components/profile-button/profile-button.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';

@NgModule({
  declarations: [
    AppComponent,
    ProfileButtonComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      //rippleEffect: false,
      mode: 'ios'
    }),
    AppRoutingModule,
    ProfilePageModule,
    RidePageModule,
    AddCustomerPageModule,
    EditEventModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__dcsolar',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
    // IonAlphaScrollModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FingerprintAIO,
    AuthGuard,
    Geolocation,
    Camera,
    File,
    FileTransfer,
    BackgroundGeolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
