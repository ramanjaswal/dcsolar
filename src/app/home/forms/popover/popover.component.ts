import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';

import { MessageService } from '../../../helpers/message.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @Input() contact: any;
  //@Input() onEdit: any;

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(
  	public actionSheetController: ActionSheetController,
    public popoverController: PopoverController,
    private messageService: MessageService) { }

  ngOnInit() {}

  attach(){
  	this.popoverController.dismiss();
  	this.presentActionSheet();
  }

  edit(){
    this.onEdit.emit(true);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      //header: '',
      mode: 'ios',
      buttons: [{
        text: 'UPLOAD PHOTOS',
        icon: '',
        handler: () => {
          //console.log('Favorite clicked');
        }
      }, {
        text: 'CANCEL',
        icon: '',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
