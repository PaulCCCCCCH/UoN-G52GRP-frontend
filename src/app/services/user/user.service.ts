import { Injectable } from '@angular/core';
import {baseUrl} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = baseUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  getUser(id: string) {
    return this.http.get<MyHttpResponse>(this.baseUrl + '/' + id);
  }
}
