import { Injectable } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/questionnaires';

  constructor(private http: HttpClient) { }

  getQuestionnaire(id: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(this.baseUrl + `/?id=${id}`);
  }

  getQList(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.baseUrl);
  }

}
