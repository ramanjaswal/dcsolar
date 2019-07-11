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
export class CustomersService {

	private apiUrl = apiBaseURL + '/customers';  // URL to web api

	constructor(
		private http: HttpClient,
		private messageService: MessageService,
		private auth: AuthService) { }

	getAllCustomers(query = '', page = 1): Observable<any>{

		return this.http.get<any>( this.apiUrl + '?query=' + query + '&page=' + page, this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Get All Customers', []) )
	    );

	}

	searchCustomers(query): Observable<any>{
		return this.http.get<any>( this.apiUrl + '/search?query=' + query, this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('Search Customers', []) )
	    );
	}
}
