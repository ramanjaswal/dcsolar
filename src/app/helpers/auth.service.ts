import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor() { }

	isAuthenticated(): boolean {

	    const token = window.localStorage.getItem('jwt');

	    // Check whether the token is expired and return
	    // true or false
	    return !jwtHelper.isTokenExpired(token);
  	}

  	authHeaders(){

  		const token = window.localStorage.getItem('jwt');

  		return {
		  headers: new HttpHeaders({
		    'x-api-key': token
		  })
		};
  	}

}
