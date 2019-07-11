import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiBaseURL } from '../config';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../helpers/message.service';
import { handleError } from '../helpers/error.handler';

// import { AuthService } from '../helpers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private apiUrl = apiBaseURL ;

  constructor(
    private http: HttpClient,
		private messageService: MessageService
  ) { }

  getStates(){
    return this.http.get<any>( this.apiUrl + '/states')
	    .pipe(
        tap( res => {
          if( !res.status ){
            this.messageService.error( res.message );
          }
        } ),
			  catchError( handleError('Get Time', []) )
	    );
  }

  getCities( state ){
    return this.http.get<any>( this.apiUrl + '/cities?state_code=' + state )
      .pipe(
        tap( res => {
          if( !res.status ){
            this.messageService.error( res.message );
          }
        } ),
        catchError( handleError('Get Time', []) )
      );
  }

}
