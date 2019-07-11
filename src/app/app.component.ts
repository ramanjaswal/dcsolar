import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController, ModalController, Events  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ProfilePage } from './profile/profile.page';

import { LoadingService } from './helpers/loading.service';
import { UserService } from './api/user.service';

import { BackgroundGeolocation, 
        BackgroundGeolocationConfig, 
        BackgroundGeolocationResponse,
        BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Customers',
      url: '/home',
      icon: 'customers'
    },
    // {
    //   title: 'Time Off',
    //   url: '/home',
    //   icon: 'timeoff'
    // },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  user: any = {
    //avatar: "/assets/avatar.png"
  };
  showAvatar: Boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public modalController: ModalController,
    private router: Router,
    private events: Events,
    private loading: LoadingService,
    private userService: UserService,
    private backgroundGeolocation: BackgroundGeolocation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
    
    });

    this.onMenuOpen();
    this.handleEvents();

  }

  onMenuOpen(){
    let _user = window.localStorage.getItem('user');
    if( _user !== null ){
      this.user = JSON.parse( _user );
    }
  }

  menuOpened(){
    setTimeout( () => {
      this.showAvatar = true;
    }, 300 )
  }

  handleEvents(){

    this.events.subscribe('user:login', ( user ) => {
      this.loading.start();

      this.userService.profile().subscribe( res => {
        this.loading.stop();

        if( res.status === true ){

            let user = res.data;
            if(user.avatar == "" || user.avatar == undefined || user.avatar == null){
              user.avatar = "/assets/avatar.png";
            }
            this.user = user;
            window.localStorage.setItem( 'user', JSON.stringify(user) );
        }

      } )
    });

    this.events.subscribe('bg:location:start', (user) => {
        this.backgroundGeolocation.start();
    })

    this.events.subscribe('bg:location:stop', (user) => {
      this.backgroundGeolocation.stop();
  })

  }

  closeMenu(){
    this.menu.close('appMenu');
  }

  doLogout(){
    window.localStorage.clear();
    this.menu.close('appMenu');
    this.router.navigateByUrl('/login');
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  initBacgroundLocationTracking(){

    const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
    .then(() => {
      
      this.backgroundGeolocation.on( BackgroundGeolocationEvents.location ).subscribe((location: BackgroundGeolocationResponse) => {
        
        //console.log(location);

        this.events.publish("bg:location:response", location);
        

        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
      });

    });

  }

}
