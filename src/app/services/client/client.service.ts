import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../../../classes/client';
import {RequestOptions} from '@angular/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo2/clients';
  private baseUrl = 'http://api.nottsgroup.forture.services/companies/';


  constructor(private http: HttpClient) { }

  getClient(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + `?id=${id}`);
  }

  getClients(): Observable<MyHttpResponse> {
    // headers.append('test@', 'something');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VyaWQiOiI1YzkwZDIxN2IzOThkZjJlYjY4ZGVlZDUiLCJpYXQiOjE1NTI5OTQ4NTAsImV4cCI6MTU1Mjk5ODQ1MH0.9UzWQfP3F7-tVcSfnozfwTIJDYrKQK-vSNsKCJvywmI',
    })
  };
  // const result = this.http.get<Client[]>(this.baseUrl, httpOptions);
  return this.http.get<MyHttpResponse>(this.baseUrl, httpOptions);
  }

}
