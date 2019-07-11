import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor( 
		public router: Router,
		public auth: AuthService ) {}

	canActivate( 
		route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

		if (!this.auth.isAuthenticated()) {
			this.router.navigateByUrl('/login');
			return false;
	    }
	    return true;
	    
  	}

}