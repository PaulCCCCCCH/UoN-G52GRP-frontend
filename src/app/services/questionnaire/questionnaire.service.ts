import { Injectable } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

//  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/questionnaires';
  private baseUrl = baseUrl + '/questionnaires';
  constructor(private http: HttpClient) { }

  getQuestionnaire(id: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `/questionnaire/${id}`);
  }

  getQList(status: string): Observable<MyHttpResponse> {
    if (status === 'active') {
      return this.http.get<MyHttpResponse>(baseUrl + `/activequestionnaires/`);
    } else if (status === 'expired') {
      // TODO: Need the list of expired questionnaires
      return this.http.get<MyHttpResponse>(baseUrl + `/activequestionnaires/`);
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
    return this.http.post<MyHttpResponse>(this.baseUrl + '/questionnaire', reqBody);
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

}
