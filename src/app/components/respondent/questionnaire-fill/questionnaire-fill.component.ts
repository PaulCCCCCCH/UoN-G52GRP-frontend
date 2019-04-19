import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionnaireService} from '../../../services/questionnaire/questionnaire.service';
import {GetQuestionService} from '../../../services/getQuestion/get-question.service';
import {Questionnaire} from '../../../../classes/questionnaire';
import {Question} from '../../../../classes/question';
import {ResponseSet} from '../../../../classes/responseSet';
import {Response} from '../../../../classes/response';
import {ResponseService} from '../../../services/response/response.service';
import {Form} from '../../../../classes/form';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.scss']
})
export class QuestionnaireFillComponent implements OnInit {
  selected = '';
  out = '';

  private ticket: string;
  private questions: Question[];
  private responses = {};
  private choicesMapping = {};

  constructor(
   private route: ActivatedRoute,
   private questionnaireService: QuestionnaireService,
   private questionService: GetQuestionService,
   private responseService: ResponseService,
   private modalService: NgbModal,
   private router: Router
  ) {}

  onAddPost() {
    this.selected = this.out;
  }

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

        // TODO: If draft found, do not create new response set.
            /**
             responseSet = this.fetchResponseSet();
             if(!responseSet) {
          this.createResponseSet();
        }
             */

            // Call loadMapping only after questions and responses are all fetched

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

  openWindow(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  intStringToArray(str) {
    if (str === '') {
      return [];
    }
    return str.split(',').map(a => +a);
  }


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

  onClickRadio(question: Question, choice: number) {
    const response = this.responses[question.id];
    response.responseBody = choice.toString();
  }

  getStringifiedForm() {
    const form = new Form();
    form.responses = JSON.stringify(this.responses);
    form.questions = JSON.stringify(this.questions);
    return JSON.stringify(form);
  }

  save() {
    const formString = this.getStringifiedForm();
    this.responseService.saveResponse(this.ticket, formString).subscribe(
      res => alert('Form saved!'),
      err => alert('Server Error! Form not saved!')
    );
  }

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

  reset() {
    this.initResponses();
    this.save();
  }

  isChecked(qid: string, choice: number) {
    return this.choicesMapping[qid].includes(choice);
  }

  isEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }
}
