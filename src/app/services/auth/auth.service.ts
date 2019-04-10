import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../globals';
import {Observable} from 'rxjs';
import {AuthInterceptorService} from './auth-interceptor.service';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = baseUrl + '/auth/login';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    ) {}

  login(username: string, password: string): Observable<MyHttpResponse> {
    /*
     return this.http.post(this.authUrl, {username: username, password: password})
       .pipe(map(user => {
         if (user && user.token) {
           localStorage.setItem('currentUser', JSON.stringify(user));
         }
         return user;
       }));
    */

    // This works
    // TODO: delete this.
    /*
    alert('received: ' + username);
    alert('received: ' + password);
    */

    return this.http.post<MyHttpResponse>(this.authUrl, {email: username, password: password});

  }

  logout() {
    localStorage.removeItem('id_token');
  }

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

  getUserEmail(): string {
    const currentToken = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(currentToken).email;
  }

  getUserId(): string {
    const currentToken = localStorage.getItem('id_token');
    return this.jwtHelper.decodeToken(currentToken).userid;
  }
}
