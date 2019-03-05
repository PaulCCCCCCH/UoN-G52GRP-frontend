import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../../classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo2/clients';

  constructor(private http: HttpClient) { }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + `?id=${id}`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

}
