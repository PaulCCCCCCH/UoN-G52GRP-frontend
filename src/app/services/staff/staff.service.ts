import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../globals';

/**
 * The service used to manage staff.
 */

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  /**
   * Base route for staff in the back end.
   */
  private baseUrl = baseUrl + '/companies/company/staff';

  constructor(private http: HttpClient) { }

  /**
   * Gets the list of all staff of a company
   * @param companyId the id of the company
   */
  getStaff(companyId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + '/' + companyId);
  }

  /**
   * Adds a staff to a company. The staff is initially a user of
   * the system. It will then be listed as a staff of a company and
   * will have access to all the questionnaires of the company.
   * @param companyId the id of the company
   * @param userId the id of a user in the system
   */
  addStaff(companyId: string, userId: string): Observable<MyHttpResponse> {
    const reqBody = {userid: userId};
    return this.http.post<MyHttpResponse>(this.baseUrl + '/add/' + companyId, reqBody);
  }

  /**
   * Removes a staff from a company.
   * @param companyId the id of the company
   * @param userId the id of the staff in the company
   */
  removeStaff(companyId: string, userId: string) {
    const reqBody = {userid: userId};
    return this.http.post<MyHttpResponse>(this.baseUrl + '/remove/' + companyId, reqBody);
  }

}
