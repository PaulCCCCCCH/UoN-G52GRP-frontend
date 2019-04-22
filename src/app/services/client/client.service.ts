import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../../../classes/client';
import {RequestOptions} from '@angular/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo2/clients';
  private baseUrl = baseUrl + '/companies';


  constructor(private http: HttpClient) { }

  getClient(id: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + '/company' + `/${id}`);
  }

  getClients(): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  removeClient(id: string): Observable<MyHttpResponse> {
    return this.http.delete<MyHttpResponse>(this.baseUrl + `/company/${id}`);
  }

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

  addClient(name: string, description: string): Observable<MyHttpResponse> {
    if (name === '') {
      alert('Name is required!');
      return;
    }
    const reqBody = {name: name, description: description};
    return this.http.post<MyHttpResponse>(this.baseUrl + `/company/`, reqBody);
  }
}
