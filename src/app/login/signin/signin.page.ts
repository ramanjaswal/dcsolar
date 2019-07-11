import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

import { UserService } from '../../api/user.service';
import { LoadingService } from '../../helpers/loading.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

	credentials: any = {}
	constructor( 
		private router: Router,
		private userService: UserService,
		private loading: LoadingService,
		private events: Events ) { }

	ngOnInit() {
	}

	doSignIn(){
		this.loading.start();
		this.userService.login( this.credentials ).subscribe( res => {
			this.loading.stop();

			if( res.status === true ){
				this.credentials = {}
				window.localStorage.setItem('jwt', res.data )

				this.events.publish('user:login');

				this.router.navigateByUrl('/home');
			}

		} )

	}

}
