import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../globals';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private baseUrl = baseUrl + '/companies/company/staff';

  constructor(private httpClient: HttpClient) { }

  getStaff(companyId: string): Observable<MyHttpResponse> {
    return this.httpClient.get<MyHttpResponse>(this.baseUrl + '/' + companyId);
  }

  addStaff(companyId: string, userId: string): Observable<MyHttpResponse> {
    const reqBody = {userId: userId};
    return this.httpClient.post<MyHttpResponse>(this.baseUrl + '/add/' + companyId, reqBody);
  }




}
