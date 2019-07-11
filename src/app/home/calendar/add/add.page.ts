import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

	showDescription: Boolean = false;
	constructor(
		private statusBar: StatusBar
	) { }

	ngOnInit() {
	}

	ionViewDidEnter(){
	    this.statusBar.backgroundColorByHexString("#ffffff");
  	}

	toggleDescription(){

		this.showDescription = !this.showDescription;

	}

}
