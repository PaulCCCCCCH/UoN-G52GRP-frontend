import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * This pages prevents unauthorized user to access protected
 * routes.
 *
 * @author Chonghan Chen
 */
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * If the user is authenticated, returns true; otherwise
   * returns false and redirect the user to login page.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['admin/login']);
    return false;
  }

}
