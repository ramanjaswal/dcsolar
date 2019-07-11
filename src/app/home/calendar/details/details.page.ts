import { Component, OnInit } from '@angular/core';
import { ModalController  } from '@ionic/angular';

import { EditPage } from '../edit/edit.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor( 
    private modalController: ModalController,
    private statusBar: StatusBar ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString("#ffffff");
  }

  async presentEditModal() {
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
