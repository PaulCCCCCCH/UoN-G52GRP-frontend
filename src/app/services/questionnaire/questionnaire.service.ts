import { Injectable } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {MyHttpResponse} from '../../../classes/myHttpResponse';
import {baseUrl} from '../../globals';

/**
 * This service handles any inquiries related to questionnaires.
 *
 * @author Chonghan Chen
 */

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

//  private baseUrl = 'https://my-json-server.typicode.com/paulcccccch/demo/questionnaires';
  /**
   * Base route for questionnaires in the back end.
   */
  private baseUrl = baseUrl + '/questionnaires';

  /**
   * Base route for active questionnaires in the back end.
   */
  private baseUrlActive = baseUrl + '/activequestionnaires';

   /**
   * Base route for archived questionnaires in the back end.
   */
  private baseUrlArchived = baseUrl + '/archivedquestionnaires';

  constructor(private http: HttpClient) { }

  /**
   * Gets a all questionnaires of give status
   * @param status
   */
  getQList(status: string): Observable<MyHttpResponse> {
    if (status === 'active') {
      return this.http.get<MyHttpResponse>(this.baseUrlActive);
    } else if (status === 'archived') {
      return this.http.get<MyHttpResponse>(this.baseUrlArchived);
    }
    return this.http.get<MyHttpResponse>(this.baseUrl);
  }

  /**
   * Adds a new questionnaire to the database.
   * @param form the stringified questionnaire
   * @param title the title of the questionnaire
   * @param description a brief description of the questionnaire
   */
  // TODO: take form as questionnaire and stringify here
  postQuestionnaire(form: string, title: string, description: string): Observable<MyHttpResponse> {
    const reqBody = {
      title: title,
      description: description,
      form: form
    };
    return this.http.post<MyHttpResponse>(this.baseUrl + '/questionnaire/', reqBody);
  }

  /**
   * Deletes a questionnaire from the database
   * @param id the id of the questionnaire to be deleted
   */
  deleteQuestionnaire(id: string) {
    return this.http.delete<MyHttpResponse>(this.baseUrl + `/questionnaire/` + id);
  }

  /**
   * Updates a questionnaire in the database.
   * @param id the id of the questionnaire to be updated.
   * @param form new questionnaire body
   * @param title new title of the questionnaire
   * @param description new description of the questionnaire
   */
  updateQuestionnaire(id: string, form: string, title: string, description: string) {
    const reqs = [];
    reqs.push({propName: 'title', value: title});
    reqs.push({propName: 'form', value: form});
    reqs.push({propName: 'description', value: description});
    return this.http.patch<MyHttpResponse>(this.baseUrl + `/questionnaire/` + id, reqs);
  }

  /**
   * Makes a saved draft to become an active but unassigned questionnaire
   * @param id the id of a saved draft
   * @param title the title of the new questionnaire
   * @param description the description of the new questionnaire
   */
  createActiveQuestionnaire(id: string, title: string, description: string) {
    const reqBody = {
      qid: id,
      title: title,
      description: description,
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + '/activequestionnaire/', reqBody);
  }

  /**
   * Retrieves a questionnaire of given id from the database
   * @param id the id of the questionnaire to be retrieved
   * @param status the status of the target questionnaire
   */
  getQuestionnaire(id: string, status: string): Observable<MyHttpResponse> {
    if (status === 'active') {
      return this.http.get<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/${id}`);
    } else if (status === 'archived') {
      return this.http.get<MyHttpResponse>(this.baseUrlArchived + `/archivedquestionnaire/${id}`);
    } else {
      return this.http.get<MyHttpResponse>(this.baseUrl + `/questionnaire/${id}`);
    }
  }

  /**
   * Assigns respondents to an active but unassigned questionnaire.
   * @param qid the id of the questionnaire to be assigned
   * @param emails a list of respondents' emails
   */
  assignRespondents(qid: string, emails: string[]) {
    const reqBody = {
      respondents: emails
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/respondents/addbylist/` + qid, reqBody);
  }

  /**
   * Removes a respondent of givne email from an active but
   * unassigned questionnaire.
   *
   * @param qid the id of the questionnaire
   * @param email: the email of the respondent to be removed
   *
   */
  removeRespondent(qid: string, email: string) {
    const reqBody = {
      respondent: email
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/respondents/delete` + qid, reqBody);
  }

  /**
   * Lifts a questionnaire from 'active but unassigned' to 'active and assigned'.
   * a deadline needs to be given to the questionnaire.
   * @param qid the id of the active questionnaire
   * @param deadline the deadline before which the responses
   *                  will be received and saved
   */
  activateQuestionnaire(qid: string, deadline: Date) {
    const reqBody = {
      qid: qid,
      deadline: deadline
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/activate`, reqBody);
  }

  /**
   * Close a questionnaire (i.e. make an active questionnaire no longer active)
   * @param qid the id of the active questionnaire
   */
  archiveQuestionnaire(qid: string) {
    const reqBody = {
      qid: qid,
    };
    return this.http.post<MyHttpResponse>(this.baseUrlActive + `/activequestionnaire/archive`, reqBody);
  }

  /**
   * Gives a list of emails, checks whether they are valid or not by
   * calling [[this.validateEmail]].
   * Returns true if all are valid, false otherwise.
   * @param emails a list of emails as strings
   */
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

  /**
   * Gives an email, checks whether it is valid or not by pattern matching.
   * Returns true if it is valid, false otherwise.
   * @param email an email as string
   */
  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
