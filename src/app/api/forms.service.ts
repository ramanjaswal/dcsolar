import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Observable, of } from 'rxjs';

import { apiBaseURL } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../helpers/message.service';
import { handleError } from '../helpers/error.handler';

import { AuthService } from '../helpers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private apiUrl = apiBaseURL + '/forms';  // URL to web api

  constructor(
    private http: HttpClient,
	private messageService: MessageService,
	private auth: AuthService
  ) { }

  savePVSiteVisitForm( data ){

    return this.http.post<any>( this.apiUrl + '/pv-site-visit', {data: data} , this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('PV Site Visit', []) )
    );

  }

  savePrePVSiteVisitForm( data ){
    return this.http.post<any>( this.apiUrl + '/pre-pv-site', {data: data} , this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Pre PV Site', []) )
    );
  }

  saveCloseOfSaleForm( data ){
	return this.http.post<any>( this.apiUrl + '/close-of-sale', {data: data} , this.auth.authHeaders() )
	.pipe(
		tap( res => {
			if( !res.status ){
				this.messageService.error( res.message );
			}
		} ),
		catchError( handleError('Close Of Sal', []) )
	);
  }

  saveInitialCheckOffForm( data ){
	return this.http.post<any>( this.apiUrl + '/initial-checkoff', {data: data} , this.auth.authHeaders() )
	.pipe(
		tap( res => {
			if( !res.status ){
				this.messageService.error( res.message );
			}
		} ),
		catchError( handleError('Inital Check Off', []) )
	);
  }

  saveFinalCheckOffForm( data ){
	return this.http.post<any>( this.apiUrl + '/final-checkoff', {data: data} , this.auth.authHeaders() )
	.pipe(
		tap( res => {
			if( !res.status ){
				this.messageService.error( res.message );
			}
		} ),
		catchError( handleError('Final Check Off', []) )
	);
  }

  saveCustomerReferral(data){
	return this.http.post<any>( this.apiUrl + '/customer-referral', {data: data} , this.auth.authHeaders() )
	.pipe(
		tap( res => {
			if( !res.status ){
				this.messageService.error( res.message );
			}
		} ),
		catchError( handleError('Final Check Off', []) )
	);
  }

}
