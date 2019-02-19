import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {QuestionSet} from '../../../classes/questionSet';
import {Question} from '../../../classes/question';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionService {

  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/';

  constructor(private http: HttpClient) { }

  /**
   * Get a QuestionSet object corresponding to a questionnaire specified by its id.
   */
  getQuestionSet(questionnaireId: number): Observable<QuestionSet> {
    return this.http.get<QuestionSet>(this.baseUrl + `questionSets/?questionnaireId=${questionnaireId}`);
  }

  /**
   * Get a question given its id.
   */
  getQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(this.baseUrl + `questions/?questionId=${questionId}`);
  }

}
