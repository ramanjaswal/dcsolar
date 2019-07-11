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
export class ClockinService {

	private clockinUrl = apiBaseURL + '/clockin';

	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private auth: AuthService) { }

	getTracker(){
		return this.http.get<any>( this.clockinUrl + '/tracker', this.auth.authHeaders() )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Get Time', []) )
	    );
	}

	clockIn( params ){

		return this.http.post<any>( this.clockinUrl + '/clock-in', params, this.auth.authHeaders() )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Start Clock', []) )
	    );

	}

	clockOut(){

		return this.http.post<any>( this.clockinUrl + '/clock-out', { }, this.auth.authHeaders() )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Stop Clock', []) )
	    );

	}

	getChartsData(){
		return this.http.get<any>( this.clockinUrl + '/charts', this.auth.authHeaders() )
	    .pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Get Charts Data', []) )
	    );
	}

}
