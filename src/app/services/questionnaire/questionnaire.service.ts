import { Injectable } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private qListUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/questionnaires';

  constructor(private httpClient: HttpClient) { }

  getQList(): Observable<Questionnaire[]> {
    return this.httpClient.get<Questionnaire[]>(this.qListUrl);
  }

  getQuestionnaire(id: number): Observable<Questionnaire> {
    return this.httpClient.get<Questionnaire>(this.qListUrl + `/${id}`);
  }

}
