import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private statusBar: StatusBar) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#ffffff");
  }

}
