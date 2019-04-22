import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Question} from '../../../classes/question';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {ActivatedRoute, Router} from '@angular/router';


/**
 * This is a page for editing a questionnaire (e.g. set title,
 * add/remove questions).
 * Input data is dynamically bound to component attributes.
 *
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-questionnaire-edit',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.scss'],
  providers: [NgbDropdownConfig]
})
export class EditQuestionnaireComponent implements OnInit {

  /**
   * Questions of current questionnaire.
   */
  private questions: Question[];

  /**
   * Current questionnaire Id. Undefined if the user is editing
   * a new questionnaire and have not clicked the 'save' button.
   */
  private questionnaireId: string;

  /**
   * The input title and description. Bound dynamically to the
   * user input using [(ngModel)]
   */
  private inputTitle: string;
  private inputDescription: string;

  /**
   * The list of respondent emails. Retrieved from catching the
   * event emitted by 'assign' component
   */
  private emailList: string[];

  /**
   * The deadline of the questionnaire. Bound to the 'Datepicker' element
   * input.
   */
  private deadline: Date;

  /**
   * Used to alert the user that a new question is added.
   */
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  /**
   * Defines how long the 'success' alert on creating question
   * will last in milliseconds.
   */
  messageShowTimeMs = 2000;

  /**
   * Used when a user wants to change the index of a question.
   * 'From' is the original index of the question.
   * 'To' is the target index of the question.
   * These will be recorded when a user selects a question (open
   * the 'change index' window of a quesiton).
   */
  private from: number;
  private to: number;



  constructor(private _location: Location,
              private modalService: NgbModal,
              private questionnaireService: QuestionnaireService,
              private route: ActivatedRoute,
              private router: Router,
              private config: NgbDropdownConfig
  ) {
    this.questions = [];
    this.from = 0;
    this.to = 0;
    this.config.placement = 'top-left';
  }

  /**
   * Initializes the component by doing the following:
   * 1. Initialize success alert
   * 2. Request current questionnaire from server if there is one
   * 3. If step 2 returns a questionnaire,
   *    binds corresponding fields
   */
  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(this.messageShowTimeMs)
    ).subscribe(() => this.successMessage = null);

    this.questionnaireId = this.route.snapshot.paramMap.get('id');
    // TODO: edit draft given id.
    if (this.questionnaireId) {
      this.questionnaireService.getQuestionnaire(this.questionnaireId, '').subscribe(
        res => {
          this.questions = JSON.parse(res.data.form);
          this.inputTitle = res.data.title;
          this.inputDescription = res.data.description;
        }
      );
      return;
    }
  }

  /**
   * Goes back to previous page.
   */
  backClicked() {
    this.router.navigate(['/questionnaires']);
  }

  /**
   * Adds a question of type specified by the type code in the
   * questionnaire.
   * @param typeCode The type code of the new question.
   *                  See 'Question' class specification for more details.
   */
  addQuestion(typeCode: number) {
    const question = new Question(typeCode);
    if (question.typeCode === 2 || question.typeCode === 3) {
      question.choices = [];
    }
    this.questions.push(question);
    console.log(question);
    this._success.next(`Successfully added a question`);
  }

  /**
   * Delete a question of given index.
    * @param index the index of the question to be deleted
   */
  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  /**
   * Swaps the questions of index 'this.from' and 'this.to'
   */
  setIndex() {
    if (Number.isInteger(this.to) && this.to > 0 && this.to <= this.questions.length) {
      const temp = this.questions[this.from];
      const target = this.to - 1;
      this.questions.splice(this.from, 1);
      this.questions.splice(target, 0, temp);
    } else {
      alert('Invalid index');
    }
  }

  /**
   * Opens 'change index' window and record current
   * question index.
   * @param content the tag of ng-template
   * @param index selected question index
   */
  openChangeIndexWindow(content, index: number) {
    this.openWindow(content);
    this.from = index;
  }

  openWindow(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  /**
   * Adds an empty choice to a question
   * @param question a choice question
   */
  addChoice(question: Question) {
    question.choices.push('');
  }

  /**
   * Removes the choice of a question
   * @param question a choice question
   * @param choiceIndex the index of the choice that the user wishes to remove
   */
  removeChoice(question: Question, choiceIndex: number) {
    question.choices.splice(choiceIndex, 1);
  }


  /**
   * Saves current questionnaire as a draft
   */
  submit() {
    const id = this.questionnaireId;
    const form = JSON.stringify(this.questions);
    if (!id) {
      this.questionnaireService.postQuestionnaire(form, this.inputTitle, this.inputDescription).subscribe(
        res => {
          alert('Form saved!');
          this.questionnaireId = res.data._id;
          this.router.navigate(['/questionnaire/edit/' + this.questionnaireId]);
        },
        err => this.alertError(err)
      );
    } else {
      this.questionnaireService.updateQuestionnaire(this.questionnaireId, form, this.inputTitle, this.inputDescription).subscribe(
        res => alert('Form saved!'),
        err => this.alertError(err)
      );
    }
  }

  /**
   * Deletes current questionnaire. It does nothing if current
   * questionnaire has not been saved yet.
   */
  deleteQuestionnaire() {
    this.questionnaireService.deleteQuestionnaire(this.questionnaireId).subscribe(
      res => {
        alert('Successfully deleted questionnaire!');
        this.router.navigate(['questionnaires/']);
        this.modalService.dismissAll();
      },
      err => this.alertError(err)
    );
  }

  /**
   * Activates current questionnaire so that respondents can have access to
   * it.
   */
  activate() {
    if (!this.questionnaireId) {
      alert('Please save the draft first!');
      return;
    }
    if (!this.deadline || this.deadline < new Date()) {
      alert('Deadline required!');
    }
    if (!this.questionnaireService.validateEmails(this.emailList)) {
      return;
    }
    this.questionnaireService.createActiveQuestionnaire(this.questionnaireId, this.inputTitle, this.inputDescription).subscribe(
      res => {
        const newId = res.data._id;
        this.questionnaireService.assignRespondents(newId, this.emailList).subscribe(
          () => {
            this.questionnaireService.activateQuestionnaire(newId, this.deadline).subscribe(
              () => {
                this.router.navigate(['/questionnaires/active']);
                alert('Questionnaire activated!');
                this.modalService.dismissAll();
              }
            );

          }
        );
      },
      err => this.alertError(err)
    );
  }

  /**
   * Checks the validity of input email addresses. Returns a boolean value.
   */
  checkValidity() {
    if (this.questionnaireService.validateEmails(this.emailList)) {
      alert('email addresses valid!');
    }
  }

  /**
   * Set the deadline of a questionnaire.
   * @param deadline a Date Object.
   */
  setDeadline(deadline: Date) {
    console.log(deadline);
    this.deadline = deadline;
  }

  /**
   * Called whenever input field for emails changes. This
   * @param emailList a list of email strings. Comes from the
   *                    event emitter from 'assign componeng'
   */
  onListChange(emailList: string[]) {
    this.emailList = emailList;
  }

  /**
   * Alert the user of an given error
   * @param err error received as a http response.
   */
  alertError(err) {
    alert('Operation failed! Message from server: ' + err.error.err.message);
    console.log(err);
  }

  alertSave() {
    alert('Please save the draft first');
  }

  /**
   * Used to maintain focus on a changing HTML element
   */
  trackByFn(index: any, item: any) {
    return index;
  }

}
