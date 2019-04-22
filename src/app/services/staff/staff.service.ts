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

  constructor(private http: HttpClient) { }

  getStaff(companyId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + '/' + companyId);
  }

  addStaff(companyId: string, userId: string): Observable<MyHttpResponse> {
    const reqBody = {userid: userId};
    return this.http.post<MyHttpResponse>(this.baseUrl + '/add/' + companyId, reqBody);
  }

  removeStaff(companyId: string, userId: string) {
    const reqBody = {userid: userId};
    return this.http.post<MyHttpResponse>(this.baseUrl + '/remove/' + companyId, reqBody);
  }

}
