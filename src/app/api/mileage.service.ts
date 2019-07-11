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
export class MileageService {

  private apiUrl = apiBaseURL + '/mileage';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private auth: AuthService
  ) { }

  saveTrip( data ){

    return this.http.post<any>( this.apiUrl + '/trip', {data: data} , this.auth.authHeaders() )
		.pipe(
			tap( res => {
				if( !res.status ){
					this.messageService.error( res.message );
				}
			} ),
			catchError( handleError('PV Site Visit', []) )
    );

  }

}
