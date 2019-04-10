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

  getClient(id: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + `/${id}`);
  }

  getClients(): Observable<MyHttpResponse> {
    // headers.append('test@', 'something');
    // token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VyaWQiOiI1YzkwZDIxN2IzOThkZjJlYjY4ZGVlZDUiLCJpYXQiOjE1NTI5OTQ4NTAsImV4cCI6MTU1Mjk5ODQ1MH0.9UzWQfP3F7-tVcSfnozfwTIJDYrKQK-vSNsKCJvywmI
  // const result = this.http.get<Client[]>(this.baseUrl, httpOptions);
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  removeClient(id: string): Observable<MyHttpResponse> {
    return this.http.delete<MyHttpResponse>(this.baseUrl + `/company/${id}`);
  }

  editClient(id: string, name: string, description: string): Observable<MyHttpResponse> {
    if (id === undefined) {
      const reqBody = {name: name, description: description};
      return this.http.post<MyHttpResponse>(this.baseUrl + `/company/`, reqBody);
    } else {
      const reqs = [];
      if (name) {
        reqs.push({propName: 'name', value: name});
      }
      if (description) {
        reqs.push({propName: 'description', value: description});
      }
      return this.http.patch<MyHttpResponse>(this.baseUrl + `/company/${id}`, reqs);
    }
  }

}
