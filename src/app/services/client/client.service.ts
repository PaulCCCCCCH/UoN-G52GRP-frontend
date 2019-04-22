import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../../../classes/client';
import {RequestOptions} from '@angular/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

/**
 * Service for manipulating clients (companies) in the database.
 */

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  /**
  *  The base route of client service of back end.
  */
  private baseUrl = baseUrl + '/companies';


  constructor(private http: HttpClient) { }

  /**
   * Gets a client of given id.
   * @param id the id of the client that needs to be retrieved
   */
  getClient(id: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + '/company' + `/${id}`);
  }

  /**
   * Gets all clients that the current user has access to.
   */
  getClients(): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  /**
   * Removes a client of given id.
   * @param id the id of the client that needs to be removed.
   */
  removeClient(id: string): Observable<MyHttpResponse> {
    return this.http.delete<MyHttpResponse>(this.baseUrl + `/company/${id}`);
  }

  /**
   * Updates the information of a client of given id in the database.
   * @param id the id of the client that needs to be modified.
   * @param name new name of the client
   * @param description new description of the client
   */
  editClient(id: string, name: string, description: string): Observable<MyHttpResponse> {
    const reqs = [];
    if (name) {
      reqs.push({propName: 'name', value: name});
    }
    if (description) {
      reqs.push({propName: 'description', value: description});
    }
    return this.http.patch<MyHttpResponse>(this.baseUrl + `/company/${id}`, reqs);
  }

  /**
   * Adds a client to the database.
   * @param name the name of the client
   * @param description a brief description of the client
   */
  addClient(name: string, description: string): Observable<MyHttpResponse> {
    if (name === '') {
      alert('Name is required!');
      return;
    }
    const reqBody = {name: name, description: description};
    return this.http.post<MyHttpResponse>(this.baseUrl + `/company/`, reqBody);
  }
}
