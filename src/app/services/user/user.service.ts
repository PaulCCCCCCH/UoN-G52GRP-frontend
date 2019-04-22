import { Injectable } from '@angular/core';
import {baseUrl} from '../../globals';
import {HttpClient} from '@angular/common/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';

/**
 * This service is used for managing users of the system.
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = baseUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get a list of all users in the system
   */
  getUsers() {
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  /**
   * Get a specific user of given id.
   * @param id the id of the user.
   */
  getUser(id: string) {
    return this.http.get<MyHttpResponse>(this.baseUrl + '/' + id);
  }
}
