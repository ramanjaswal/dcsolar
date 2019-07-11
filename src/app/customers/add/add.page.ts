import { Component, OnInit } from '@angular/core';
import { ModalController   } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
  	this.modalCtrl.dismiss();
  }

}
