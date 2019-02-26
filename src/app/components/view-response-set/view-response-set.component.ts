import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetResponseService} from '../../services/getResponse/get-response.service';
import {ResponseSet} from '../../../classes/responseSet';
import {QuestionSet} from '../../../classes/questionSet';
import {GetQuestionService} from '../../services/getQuestion/get-question.service';
import {Question} from '../../../classes/question';
import {Response} from '../../../classes/response';

@Component({
  selector: 'app-view-response-set',
  templateUrl: './view-response-set.component.html',
  styleUrls: ['./view-response-set.component.scss']
})
export class ViewResponseSetComponent implements OnInit {

  uid = +this.route.snapshot.paramMap.get('uid');
  qid = +this.route.snapshot.paramMap.get('qid');
  private responseSet: ResponseSet;
  private responses: Response[];

  private questionSet: QuestionSet;
  private questions: Question[];

  private finished = false;

  constructor(
    private route: ActivatedRoute,
    private responseService: GetResponseService,
    private questionService: GetQuestionService,
) { }

  ngOnInit() {

    this.responseService.getResponseSet(this.qid, this.uid).subscribe(
      responseSet => {
        this.responseSet = responseSet[0];
        this.responses = this.responseSet.responses;
        this.questionService.getQuestionSet(this.responseSet.questionnaireId).subscribe(
          questionSet => {
            this.questionSet = questionSet[0];
            this.questions = this.questionSet.questions;
            this.finished = true;
          }
        );
      }
    );
  }

  getQuestionByResponse(response: Response): Question {
    return this.questions.find(question => question.id === response.questionId);
  }

  getChoicePairs(question: Question) {
    const choicePairs = [];
    let count = 1;
    question.choices.forEach(choice => {
      choicePairs.push({text: choice, index: count});
      count++;
    });
    return choicePairs;
  }
}
