import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../globals';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = baseUrl + '/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // TODO
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
    alert('received: ' + username);
    alert('received: ' + password);

  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
