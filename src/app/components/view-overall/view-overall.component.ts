import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GetResponseService} from '../../services/getResponse/get-response.service';
import {ResponseSet} from '../../../classes/responseSet';
import {GetQuestionService} from '../../services/getQuestion/get-question.service';
import {Question} from '../../../classes/question';

@Component({
  selector: 'app-view-overall',
  templateUrl: './view-overall.component.html',
  styleUrls: ['./view-overall.component.scss']
})
export class ViewOverallComponent implements OnInit {

  private id = this.route.snapshot.paramMap.get('id');
  private responseSets: ResponseSet[];
  private responseNumber: number;
  private questions: Question[];
  private responseCounter = {};
  private responseTextKeeper = {};

  // Collapse Controller
  private isCollapsed: boolean[];

  constructor(
    private route: ActivatedRoute,
    private responseService: GetResponseService,
    private questionService: GetQuestionService
  ) { }

  // TODO: This involves APIs of getting all responses given a questionnaire ID.

  ngOnInit() {
    this.responseService.getResponseSets(this.id).subscribe(
      resResponseSet => {
        this.responseSets = resResponseSet.data;
        this.responseNumber = this.responseSets.length;
        this.questionService.getQuestionSet(this.id).subscribe(
          resQuestionSet => {
          this.questions = resQuestionSet.data;
          this.isCollapsed = new Array(this.questions.length);
          this.isCollapsed.map(_ => false);

          this.questions.forEach(
            question => {
              const numOfChoices = question.choices.length;
              const counter = {};
              for (let i = 0; i < numOfChoices; i++) {
                counter[i] = 0;
              }
              this.responseCounter[question.id] = counter;
              this.responseTextKeeper[question.id] = [];
            });

          this.responseSets.forEach(
            responseSet => {
            responseSet.responses.forEach(response => {
              if (response.typeCode === 3 || response.typeCode === 4) {
                const choices = response.responseBody.split(',').map(str => parseInt(str));
                choices.forEach(choice => this.responseCounter[response.questionId][choice] += 1);
              } else {
                this.responseTextKeeper[response.questionId].push(response.responseBody);
              }
            });
          });
        // For debugging
        // console.log(this.responseCounter);
      });
    });
  }



}
