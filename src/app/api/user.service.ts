import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { apiBaseURL } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../helpers/message.service';
import { handleError } from '../helpers/error.handler';

import { AuthService } from '../helpers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private userUrl = apiBaseURL + '/user';  // URL to web api

	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private auth: AuthService) { }

	login(credentials: any): Observable<any>{

		return this.http.post<any>( this.userUrl + '/login', credentials )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Login', []) )
	    );
	}

	fpLogin( token ): Observable<any>{

		let params = { token: token }

		return this.http.post<any>( this.userUrl + '/fp-login', params )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Login', []) )
	    );
	}

	reset(email: string): Observable<any>{

		return this.http.post<any>( this.userUrl + '/reset-password', { email: email } )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Reset Password', []) )
	    );
	}

	profile(): Observable<any>{

		return this.http.get<any>( this.userUrl + '/profile', this.auth.authHeaders() )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Profile', []) )
	    );

	}

	update(field, val): Observable<any>{

		if( typeof val === "boolean" ){
			val = val ? 1 : 0; 
		}

		let params = {
			field: field,
			val: val
		}

		return this.http.put<any>( this.userUrl + '/profile', params, this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Update Profile', []) )
		);

	}

	fpToken(): Observable<any>{

		return this.http.post<any>( this.userUrl + '/fp-token', {}, this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('FP Token', []) )
		);

	}

}
