import { Component, OnInit } from '@angular/core';

import { UserService } from '../../api/user.service';
import { MessageService } from '../../helpers/message.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

	email: string = '';
	constructor( 
		private userService: UserService,
		private messageService: MessageService ) { }

	ngOnInit() {
	}

	doResetPassword(){
		this.userService.reset( this.email ).subscribe( res => {

			if(res.status){
				this.messageService.success( res.message );
			}
		} )
	}

}
