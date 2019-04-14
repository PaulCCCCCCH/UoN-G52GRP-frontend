import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionnaireService} from '../../../services/questionnaire/questionnaire.service';
import {GetQuestionService} from '../../../services/getQuestion/get-question.service';
import {Questionnaire} from '../../../../classes/questionnaire';
import {Question} from '../../../../classes/question';
import {ResponseSet} from '../../../../classes/responseSet';
import {Response} from '../../../../classes/response';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.scss']
})
export class QuestionnaireFillComponent implements OnInit {
  selected = '';
  out = '';

  private formId: string;
  private questionnaire: Questionnaire;
  private questions: Question[];
  private responseSet: ResponseSet;
  private responses: Response[];

  private QAmapping = {};

  constructor(
   private route: ActivatedRoute,
   private questionnaireService: QuestionnaireService,
   private questionService: GetQuestionService
  ) {}

  onAddPost() {
    this.selected = this.out;
  }

  ngOnInit() {
    this.formId = this.route.snapshot.paramMap.get('formId');
    this.questionnaireService.getQuestionnaire(this.formId).subscribe(
      res_form => {
        this.questionnaire = res_form.data;
        this.questionService.getQuestionSet(this.formId).subscribe(
          res_questions => {
            this.questions = res_questions.data;

            // TODO: If draft found, do not create new response set.
            this.createResponseSet();
            /**
             responseSet = this.fetchResponseSet();
             if(!responseSet) {
          this.createResponseSet();
        }
             */

            // Call loadMapping only after questions and responses are all fetched
            this.loadMapping();

          });
      });
  }


  createResponseSet() {

    // Get responses
    const responses = [];
    this.questions.forEach(question => {
      const response = new Response();
      response.questionId = question.id;
      response.type = question.type;
      response.typeCode = question.typeCode; // TODO: Backend generate responseId
      response.responseBody = '';

      responses.push(response);
    });
    this.responses = responses;

    const responseSet = new ResponseSet();
    responseSet.questionnaireId = this.formId;
    responseSet.responses = responses;
    this.responseSet = responseSet;

  }

  getResponseByQuestion(question: Question): Response {
    return this.responses.find(r => r.questionId === question.id);
  }

  loadMapping() {
    this.questions.forEach(question => {
      this.QAmapping[question.id] = this.getResponseByQuestion(question);
    });
  }

  onClickCheckbox(question: Question, choice: number) {
    const response = this.QAmapping[question.id];
    let choices = [];
    if (response.responseBody !== '') {
      choices = response.responseBody.split(',').map(a => +a);
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
    const response = this.QAmapping[question.id];
    response.responseBody = choice.toString();
  }
}
