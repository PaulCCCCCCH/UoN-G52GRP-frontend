import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../globals';
import {Observable} from 'rxjs';
import {AuthInterceptorService} from './auth-interceptor.service';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import { JwtHelperService } from '@auth0/angular-jwt';


/**
 * This service is for authentication.
 *
 * @author Chonghan Chen
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = baseUrl + '/auth/login';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    ) {}

  /**
   * Send username and password to the database.
   */

  login(username: string, password: string): Observable<MyHttpResponse> {
    return this.http.post<MyHttpResponse>(this.authUrl, {email: username, password: password});

  }

  /**
   * Removes local jwt token. The user will no longer have
   * access to the system until logging in again.
   * This method is implemented but not used yet.
   */
  logout() {
    localStorage.removeItem('id_token');
  }

  /**
   * Checks if the user is authenticated to access the system.
   * To be authenticated, there must be a valid jwt which is not
   * expired in local storage.
   */
  isAuthenticated(): boolean {
    const currentToken = localStorage.getItem('id_token');
    if (!currentToken) {
      return false;
    }
    const decoded = this.jwtHelper.decodeToken(currentToken);
    const date = new Date(0);
    if (decoded.exp === undefined) {
      return false;
    }
    date.setUTCSeconds(decoded.exp);
    return ! (date.valueOf() < new Date().valueOf());

  }

  /**
   * Returns the username (email) of the current user.
   * This is done by decoding current jwt token.
   */
  getUserEmail(): string {
    const currentToken = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(currentToken).email;
  }

  /**
   * Returns the user id of the current user.
   * This is done by decoding current jwt token.
   */
  getUserId(): string {
    const currentToken = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(currentToken).userid;
  }
}
