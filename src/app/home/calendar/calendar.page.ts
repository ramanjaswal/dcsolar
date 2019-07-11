import { Component, OnInit } from '@angular/core';
import { ModalController  } from '@ionic/angular';
import { ProfilePage } from '../../profile/profile.page';

import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  user: any = {
    avatar: "/assets/avatar.png"
  };
  constructor(
    public modalController: ModalController,
    private statusBar: StatusBar) { }

  ngOnInit() {
    //this.statusBar.backgroundColorByHexString("#f4f4f4");
  }

  ionViewWillEnter(){
    this.getUser();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#f4f4f4");
  }

  getUser(){
    let _user = window.localStorage.getItem('user');
    if( _user !== null ){
      this.user = JSON.parse( _user );
    }
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
