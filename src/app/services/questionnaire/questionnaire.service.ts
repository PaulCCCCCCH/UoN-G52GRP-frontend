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
  private baseUrl = baseUrl + '/questionnaires/questionnaire';
  constructor(private http: HttpClient) { }

  getQuestionnaire(id: number): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.baseUrl + `/?id=${id}`);
  }

  getQList(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.baseUrl);
  }

  // TODO: take form as questionnaire and stringify here
  postQuestionnaire(form: string, title: string): Observable<MyHttpResponse> {
    const postBody = {
      title: title,
      description: 'This is for testing',
      form: form,
    };
    return this.http.post<MyHttpResponse>(this.baseUrl, postBody);
  }

}
