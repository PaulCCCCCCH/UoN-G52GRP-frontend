import { Injectable } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

//  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/questionnaires';
  private baseUrl = baseUrl + '/questionnaires';
  private baseUrlActive = baseUrl + '/activequestionnaires';
  constructor(private http: HttpClient) { }

  getQuestionnaire(id: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `/questionnaire/${id}`);
  }

  getQList(status: string): Observable<MyHttpResponse> {
    if (status === 'active') {
      return this.http.get<MyHttpResponse>(this.baseUrlActive);
    } else if (status === 'expired') {
      // TODO: Need the list of expired questionnaires
      return this.http.get<MyHttpResponse>(this.baseUrlActive);
    }
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  // TODO: take form as questionnaire and stringify here
  postQuestionnaire(form: string, title: string, description: string): Observable<MyHttpResponse> {
    const reqBody = {
      title: title,
      description: description,
      form: form
    }
    return this.http.post<MyHttpResponse>(this.baseUrl + '/questionnaire/', reqBody);
  }

  deleteQuestionnaire(id: string) {
    return this.http.delete<MyHttpResponse>(this.baseUrl + `/questionnaire/` + id);
  }

  updateQuestionnaire(id: string, form: string, title: string, description: string) {
    const reqs = [];
    reqs.push({propName: 'title', value: title});
    reqs.push({propName: 'form', value: form});
    reqs.push({propName: 'description', value: description});
    return this.http.patch<MyHttpResponse>(this.baseUrl + `/questionnaire/` + id, reqs);
  }

  createActiveQuestionnaire(id: string, title: string, description: string) {
    const reqBody = {
      qid: id,
      title: title,
      description: description,
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + '/activequestionnaire/', reqBody);
  }

  getActiveQuestionnaire(id: string) {
    return this.http.get<MyHttpResponse>(this.baseUrlActive + '/activequestionnaire/' + id);
  }

  assignRespondents(qid: string, emails: string[]) {
    const reqBody = {
      respondents: emails
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/respondents/addbylist/` + qid, reqBody);
  }

  activateQuestionnaire(qid: string, deadline: Date) {
    const reqBody = {
      qid: qid,
      deadline: deadline
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/activate`, reqBody);
  }

  validateEmails(emails: string[]): boolean {
    if (emails.length === 0) {
      alert('Email list cannot be empty!');
      return false;
    }
    let valid = true;
    const invalids: string[] = [];
    emails.forEach(
      email => {
        if (!this.validateEmail(email)) {
          valid = false;
          invalids.push(email);
        }
      }
    );
    if (invalids.length > 0) {
      alert('Invalid email addresses detected: ' + invalids);
    }
    return valid;
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
