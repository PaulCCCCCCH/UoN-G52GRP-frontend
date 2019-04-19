import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private baseUrl = baseUrl + '/respondents/respondent/';

  constructor(private http: HttpClient) { }

  getForm(ticket: string) {
    return this.http.get<MyHttpResponse>(this.baseUrl + 'get/' + ticket);
  }

  saveResponse(ticket: string, form: string) {
    const reqBody = {
      form: form
    };
    return this.http.post<MyHttpResponse>(this.baseUrl + 'save/' + ticket, reqBody);
  }

  submitResponse(ticket: string, form: string) {
    const reqBody = {
      form: form
    };
    return this.http.post<MyHttpResponse>(this.baseUrl + 'submit/' + ticket, reqBody);
  }


}
