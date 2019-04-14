import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseSet} from '../../../classes/responseSet';
import {Response} from '../../../classes/response';
import {MyHttpResponse} from '../../../classes/myHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class GetResponseService {

  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/';

  constructor(private http: HttpClient) { }

  /**
   * Get one a complete response to a questionnaire.
   */
  getResponseSet(questionnaireId: string, userId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `responseSets/?userId=${userId}&questionnaireId=${questionnaireId}`);
  }

  /**
   * Get one response to a question.
   */
  getResponse(responseId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `responses/?responseId=${responseId}`);
  }

  /**
   * Get the list of all responses to a questionnaire.
   */
  getResponseSets(questionnaireId: string): Observable<MyHttpResponse> {
    return this.http.get<MyHttpResponse>(this.baseUrl + `responseSets/?questionnaireId=${questionnaireId}`);
  }

}
