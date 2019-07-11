import { Component, OnInit } from '@angular/core';
import { ModalController   } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

	calendar = {
	    mode: 'month',
	    currentDate: new Date()
  	}
  	calendarTitle: String;
	constructor(public modalCtrl: ModalController) { }

	ngOnInit() {
	}

	closeModal(){
		this.modalCtrl.dismiss();
	}

	onChangeDate(date){

	}

	nextMonth(){
		var mySwiper = document.querySelector('.swiper-container')['swiper'];
		mySwiper.slideNext();
	}

	prevMonth(){
		var mySwiper = document.querySelector('.swiper-container')['swiper'];
		mySwiper.slidePrev();
	}

	onViewTitleChanged(title){
		this.calendarTitle = title;
	}

}
