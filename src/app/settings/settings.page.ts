import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private statusBar: StatusBar) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#ffffff");
  }

}
