import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';

import { Events } from '@ionic/angular';

// import { AuthService } from '../helpers/auth.service';
import { LoadingService } from '../helpers/loading.service';
import { UserService } from '../api/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  sensorAvailable: Boolean = false;
  fpEnabled: Boolean = false;

  constructor( 
    private faio: FingerprintAIO,
    private router: Router,
    private loading: LoadingService,
    private userService: UserService,
    private events: Events,
    private storage: Storage ) { }

  ngOnInit() {
    this.checkFPSensor();
  }

  ionViewWillEnter(){
    
  }

  checkFPSensor(){
    this.faio.isAvailable().then( result => {

      this.sensorAvailable = true;
      //alert(result);

      this.storage.get('fp_token').then( val => {
        
          if( val !== null ){
            this.fpEnabled = true;
          }

      } )

    } ).catch( err => {

      //alert(err);

    })
  }

  async loginUsingFp(){

      const token = await this.storage.get('fp_token');

      this.loading.start();
      this.userService.fpLogin( token ).subscribe( res => {
        this.loading.stop();

        if( res.status === true ){

          window.localStorage.setItem('jwt', res.data )
          this.events.publish('user:login');
          this.router.navigateByUrl('/home');
        }

      } )

  }

  openTouchID(){

  	this.faio.show({
  	    clientId: 'dc-solar-fp-authentication', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
  	    clientSecret: 'o7xkOMYUbyxaH23oFAiL', //Necessary for Android encrpytion of keys. Use random secret key.
  	    disableBackup: true,  //Only for Android(optional)
  	    localizedFallbackTitle: 'Use Pin', //Only for iOS
  	    localizedReason: 'Please authenticate' //Only for iOS
  	})
  	.then( (result: any) => {

      this.loginUsingFp();
  		
      // this.router.navigateByUrl('/home/clockin');

  	} )
  	.catch( (error: any) => {

        console.log( error );

    } )

  }


}
