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
   * Get one a complete question to a questionnaire.
   */
  getQuestionSet(questionnaireId: number, userId: number): Observable<QuestionSet> {
    return this.http.get<QuestionSet>(this.baseUrl + `questionSets/?userId=${userId}&questionnaireId=${questionnaireId}`);
  }

  /**
   * Get one question to a question.
   */
  getQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(this.baseUrl + `questions/?questionId=${questionId}`);
  }

  /**
   * Get the list of all questions to a questionnaire.
   */
  getQuestionSets(questionnaireId: number): Observable<QuestionSet[]> {
    return this.http.get<QuestionSet[]>(this.baseUrl + `questionSets/?questionnaireId=${questionnaireId}`);
  }

}
