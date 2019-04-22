import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MyHttpResponse} from '../../../classes/myHttpResponse';

/**
 * Service used to retrieve questions of a questionnaire.
 * This is not currently used, and may be removed in the future.
 *
 * @author Chonghan Chen
 */
@Injectable({
  providedIn: 'root'
})
export class GetQuestionService {

  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/';

  constructor(private http: HttpClient) { }

  /**
   * Get a QuestionSet object corresponding to a questionnaire specified by its id.
   */
  getQuestionSet(questionnaireId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `questionSets/?questionnaireId=${questionnaireId}`);
  }

  /**
   * Get a question given its id.
   */
  getQuestion(questionId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `questions/?id=${questionId}`);
  }

}
