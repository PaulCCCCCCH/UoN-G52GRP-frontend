import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {QuestionnaireService} from '../../../../services/questionnaire/questionnaire.service';
import {GetQuestionService} from '../../../../services/getQuestion/get-question.service';
import {ActivatedRoute} from '@angular/router';
import {Questionnaire} from '../../../../../classes/questionnaire';
import {QuestionSet} from '../../../../../classes/questionSet';

@Component({
  selector: 'app-view-questionnaires',
  templateUrl: './view-questionnaires.component.html',
  styleUrls: ['./view-questionnaires.component.scss']
})
export class ViewQuestionnairesComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit() {

  }

  backClicked() {
    this._location.back();
  }

}
