import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionnaireService} from '../../../services/questionnaire/questionnaire.service';
import {Question} from '../../../../classes/question';
import {Response} from '../../../../classes/response';
import {ResponseService} from '../../../services/response/response.service';
import {Form} from '../../../../classes/form';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


/**
 * The page is for respondent to fill out a questionnaire
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.scss']
})
export class QuestionnaireFillComponent implements OnInit {

   /**
   * The unique ticket of the 'respondent-questionnaire' pair
   * from the url.
   */
  private ticket: string;

  /**
   * All questions of current questionnaire.
   */
  private questions: Question[];

  /**
   * The responses dictionary where:
   *    key = question id
   *    value = response
   */
  private responses = {};

  /**
   * The mapping for choice questions. This is only
   * an auxiliary variable and will not be submitted and
   * saved in the database. For each item:
   *    key = question id
   *    value = response body (string of choices)
   *
   * Note that only choice questions will need this variable.
   */
  private choicesMapping = {};

  constructor(
   private route: ActivatedRoute,
   private questionnaireService: QuestionnaireService,
   private responseService: ResponseService,
   private modalService: NgbModal,
   private router: Router
  ) {}

  /**
   * Initializes the component by doing the following:
   * 1. Get the unique ticked from current url.
   * 2. Get corresponding questionnaire.
   * 3. Parse questionnaire data and store them in local variables.
   */
  ngOnInit() {
    this.ticket = this.route.snapshot.paramMap.get('ticket');
    this.responseService.getForm(this.ticket).subscribe(
      res => {
        const data = JSON.parse(res.data);
        this.questions = JSON.parse(data.questions);
        console.log(this.questions);

        this.responses = JSON.parse(data.responses);
        console.log(this.responses);

        if (this.isEmpty(this.responses)) {
          console.log('No response found');
          this.initResponses();
        }

        this.questions.forEach(
          q => {
            if (q.typeCode === 3 || q.typeCode === 4) {
              const response = this.responses[q.id];
              this.choicesMapping[q.id] = this.intStringToArray(response.responseBody);
            }
          }
        );
        console.log(this.responses);
        console.log(this.choicesMapping);
      },
      err => {
        if (err.status === 403) {
          alert('Form already submitted! Not allowed to go back');
          this.router.navigate(['/error']);
        } else {
          alert('Server error! Failed to retrieve the form');
        }
      }
      );
  }


  /**
   * Initializes response.
   * This is called either when:
   * 1. The user opens the page for the first time
   * 2. The user resets the questionnaire.
   *
   */
  initResponses() {

    // Get responses
    const responses = {};
    this.questions.forEach(question => {
      const response = new Response();
      response.questionId = question.id;
      response.type = question.type;
      response.typeCode = question.typeCode; // TODO: Backend generate responseId
      response.responseBody = '';

      responses[question.id] = response;
    });
    this.responses = responses;

  }

  /**
   * Used to open a modal with the given tag
   * @param content the tag of the template that the user wishes to open
   */
  openWindow(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  /**
   * Parse a string of choices (separated by comma) to an integer array.
   * (e.g. from '1,2,3,4' (string) to [1,2,3,4] (int[]))
   *
   * @param str a string of choices separated by comma
   * @returns a list of integers
   */
  intStringToArray(str) {
    if (str === '') {
      return [];
    }
    return str.split(',').map(a => +a);
  }


  /**
   * Updates [[this.choicesMapping]] when the user clicks on a checkbox
   * of a multiple choices question.
   * @param question the question that the user is giving response to
   * @param choice the choice that the user is either adding or removing.
   *
   * Note that this function is different from [[this.onClickRatio]] in that
   * more than one choices may be selected.
   */
  onClickCheckbox(question: Question, choice: number) {
    const response = this.responses[question.id];
    let choices = [];
    if (response.responseBody !== '') {
      choices = this.intStringToArray(response.responseBody);
    }
    if (choices.includes(choice)) {
      for (let i = 0; i < choices.length; i++) {
        if (choices[i] === choice) {
          choices.splice(i, 1);
        }
      }
    } else {
      choices.push(choice);
    }
    choices.sort();
    response.responseBody = choices.toString();
  }

  /**
   * Updates [[this.choicesMapping]] when the user clicks on a radio box
   * of a choice question.
   * @param question the question that the user is giving response to
   * @param choice the choice that the user is either adding or removing.
   *
   * Note that this function is different from [[this.onClickCheckbox]] in that
   * only one choice is allowed.
   */
  onClickRadio(question: Question, choice: number) {
    const response = this.responses[question.id];
    response.responseBody = choice.toString();
  }

  /**
   * Stringifies current form and prepare it for submission.
   * @returns the stringified form ready to be put
   *          in a http request.
   */
  getStringifiedForm() {
    const form = new Form();
    form.responses = JSON.stringify(this.responses);
    form.questions = JSON.stringify(this.questions);
    return JSON.stringify(form);
  }

  /**
   * Saves current form to the database.
   */
  save() {
    const formString = this.getStringifiedForm();
    this.responseService.saveResponse(this.ticket, formString).subscribe(
      res => alert('Form saved!'),
      err => alert('Server Error! Form not saved!')
    );
  }

  /**
   * Finishes and submits current response.
   * This cannot be undone and the user will no longer
   * have access to the questionnaire.
   */
  submit() {
    const formString = this.getStringifiedForm();
    this.responseService.submitResponse(this.ticket, formString).subscribe(
      res => {
        alert('Form submitted successfully!');
        this.modalService.dismissAll();
        this.router.navigate(['response/submit/success/' + this.ticket]);
      },
      err => alert('Server Error! Submission failed!')
    );
  }

  /**
   * Clear all the response made by the user to the questionnaire.
   * Saved records will be deleted.
   */
  reset() {
    this.initResponses();
    this.save();
  }

  /**
   * A utility function that checks if a choice is selected or not.
   * @param qid the id of the question
   * @param choice the index of the choice that needs to be checked
   */
  isChecked(qid: string, choice: number) {
    return this.choicesMapping[qid].includes(choice);
  }

  /**
   * A utility function that checks if an object is empty.
   * i.e. if an object looks like {};
   * @param obj the object that needs to be checked
   */
  isEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }
}
