import { Component, OnInit  } from '@angular/core';
import { ModalController   } from '@ionic/angular';

import { LoadingService } from '../helpers/loading.service'; 
import { UserService } from '../api/user.service'; 
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
// import { AuthService } from '../helpers/auth.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MessageService } from '../helpers/message.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = {
    //avatar: "/assets/avatar.png"
  };
  sensorAvailable: Boolean = false;
  showAvatar: Boolean = false;

  constructor(
    public modalCtrl: ModalController,
    private loading: LoadingService,
    private userService: UserService,
    private faio: FingerprintAIO,
    private messageService: MessageService,
    private storage: Storage,
    private statusBar: StatusBar) { }

  ngOnInit() {
    this.getProfileData();
    this.checkFPSensor();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#ffffff");
  }

  doRefresh(event){

    this.checkFPSensor();
    this.showAvatar = false;
    this.user = {};
    this.getProfileData().then( () => {
      event.target.complete();
    } )
    
  }

  checkFPSensor(){
    this.faio.isAvailable().then( result => {

      this.sensorAvailable = true;

    } ).catch( err => {

      //alert(err);

    })
  }

  closeModal(){
  	this.modalCtrl.dismiss();
  }

  toggleStatus(){
  	this.user.online_status = !this.user.online_status;
    this.doUpdateValue( 'online_status', this.user.online_status );
  }

  getProfileData(){

    //this.loading.start();
    return new Promise( resolve => {

      this.userService.profile().subscribe( res => {
        //this.loading.stop();
  
        if( res.status === true ){
  
          let user = res.data;
  
          if(user.avatar == "" || user.avatar == undefined || user.avatar == null){
            user.avatar = "/assets/avatar.png";
          }
  
          this.user = user;
  
          setTimeout( () => {
            this.showAvatar = true;
          }, 300 );
  
          /* Check for touch ID **/
          this.storage.get('fp_token').then( val => {
            // alert(val)
            if( val !== null ){
                this.user.enable_touch = true;
            }
  
          } );
          /*****/
  
          window.localStorage.setItem( 'user', JSON.stringify(this.user) );

          resolve();
        }
  
      } )

    } )

  }

  updateProfile($event){
    this.doUpdateValue( $event.target.name, this.user[$event.target.name] );
  }

  doUpdateValue(field, value){
    this.userService.update( field, value ).subscribe( res => {

      if( res.status === true ){
        console.log(res);
      }

    } )
  }

  setUpTouchID($event){

    if( this.user.enable_touch ){

      this.faio.show({
          clientId: 'dc-solar-fp-authentication', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
          clientSecret: 'o7xkOMYUbyxaH23oFAiL', //Necessary for Android encrpytion of keys. Use random secret key.
          disableBackup: true,  //Only for Android(optional)
          localizedFallbackTitle: 'Use Pin', //Only for iOS
          localizedReason: 'Please authenticate' //Only for iOS
      })
      .then( (result: any) => {
          
          this.loading.start();
          this.userService.fpToken().subscribe( res => {
            this.loading.stop();

            if( res.status === true ){
              //window.localStorage.setItem( 'fp_token', res.token );
              this.storage.set('fp_token', res.token);
              this.messageService.success( res.message );

            }

          } )

      } )
      .catch( (error: any) => {

          console.log( error );

      } )

    }
    else{
      this.storage.remove('fp_token')
    }

  }

}
