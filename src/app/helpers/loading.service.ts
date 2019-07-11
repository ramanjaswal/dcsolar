import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

	loading: any;
	constructor(public loadingController: LoadingController) { }

	async start( msg = "Loading..." ) {
		this.loading = await this.loadingController.create({
		  message: msg
		});
		await this.loading.present();

		// const { role, data } = await loading.onDidDismiss();

		// console.log('Loading dismissed!');
	}

	async stop(){
		if( this.loading )
			await this.loading.dismiss();
	}
}
