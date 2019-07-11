import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Events  } from '@ionic/angular';
import { AddPage } from './add/add.page';

import { CustomersService} from '../api/customers.service';
import { LoadingService } from '../helpers/loading.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss']
})
export class CustomersPage implements OnInit {

	customers: any = [];
	searchText: any;
	currentPage: any = 1;

	referer: any;

	constructor(
		public modalController: ModalController,
		private customerService: CustomersService,
		private loading: LoadingService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private events: Events) { }

	ngOnInit() {

		this.loading.start();
		this.getAllCustomers().then( customers => {
			this.customers = customers;
			this.loading.stop();
		} )

		this.referer = this.route.snapshot.paramMap.get('ref');

	}

	getAllCustomers(){
		//this.loading.start();
		return new Promise( resolve => {
			this.customerService.getAllCustomers( this.searchText, this.currentPage ).subscribe( res => {
				//this.loading.stop();
				resolve(res.data);
			} )
		} )
	}

	filterCustomers(){
		this.currentPage = 1;
		this.getAllCustomers().then( customers => {
			this.customers = customers;
		} );
	}

	loadCustomers(event){
		this.currentPage++;
		this.getAllCustomers().then( customers => {
			event.target.complete();
			this.customers = this.customers.concat( customers );
		})
	}

	selectCustomer(customer){
		this.events.publish('customer:selected:' + this.referer , customer);
		this.navCtrl.pop();
	}

	async presentAddModal() {
	    const modal = await this.modalController.create({
	      component: AddPage,
	      componentProps: { value: 123 }
	    });
	    return await modal.present();
  	}

}
