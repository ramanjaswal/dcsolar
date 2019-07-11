import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

	constructor(public toastController: ToastController) { }

	async error( message: string ){
		const toast = await this.toastController.create({
	      message: message,
	      duration: 3000,
	      mode: 'md',
	      header: "ERROR",
	      position: 'top',
		  color: 'danger',
		  buttons: [
			{
				text: 'Done',
				role: 'cancel',
				handler: () => {
				  toast.dismiss();
				}
			}
		  ]
	    });
	    toast.present();
	}

	async success( message: string ){
		const toast = await this.toastController.create({
	      message: message,
	      duration: 3000,
	      mode: 'md',
	      header: "SUCCESS",
	      position: 'top',
		  color: 'success',
		  buttons: [
			{
				text: 'Done',
				role: 'cancel',
				handler: () => {
				  toast.dismiss();
				}
			}
		  ]
	    });
	    toast.present();
	}

	async notice( message: string ){
		const toast = await this.toastController.create({
	      message: message,
	      duration: 3000,
	      mode: 'md',
	      header: "NOTICE",
		  position: 'top',
		  buttons: [
			{
				text: 'Done',
				role: 'cancel',
				handler: () => {
				  toast.dismiss();
				}
			}
		  ]
	    });
	    toast.present();
	}

}
