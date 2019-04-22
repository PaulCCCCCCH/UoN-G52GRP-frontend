import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

/**
 * This service handles any inquiries related to questionnaires.
 *
 * @author Chonghan Chen
 */

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  /**
   * Base route for responses in the back end.
   */
  private baseUrl = baseUrl + '/respondents/respondent/';

  constructor(private http: HttpClient) { }

  /**
   * Get the form corresponding to the ticket.
   * @param ticket a unique token representing a 'form-respondent' pair.
   */
  getForm(ticket: string) {
    return this.http.get<MyHttpResponse>(this.baseUrl + 'get/' + ticket);
  }


  /**
   * Save the (partially finished) response in database
   * @param ticket a unique token representing a 'form-respondent' pair.
   * @param form a stringified form
   */
  saveResponse(ticket: string, form: string) {
    const reqBody = {
      form: form
    };
    return this.http.post<MyHttpResponse>(this.baseUrl + 'save/' + ticket, reqBody);
  }

  /**
   * Submits current response. This cannot be undone, and the respondent
   * will no longer have access to the questionnaire.
   * The ticket will be invalid immediately.
   * @param ticket a unique token representing a 'form-respondent' pair.
   * @param form a stringified form
   *
   */
  submitResponse(ticket: string, form: string) {
    const reqBody = {
      form: form
    };
    return this.http.post<MyHttpResponse>(this.baseUrl + 'submit/' + ticket, reqBody);
  }


}
