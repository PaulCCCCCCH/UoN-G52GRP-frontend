import { Component, Input, OnInit } from '@angular/core';
import {Questionnaire } from '../../../classes/questionnaire';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.scss']
})
export class ViewQuestionnaireComponent implements OnInit {

  FAKE_QLIST: Questionnaire[];
  questionnaire: Questionnaire;
  progress: number;

  constructor() {
    this.FAKE_QLIST = [
      new Questionnaire(1, 'How is Peter?'),
      new Questionnaire(2, 'What do you think of ACE module?'),
    ];
  }

  ngOnInit() {
    const id = 2; // This should be from the router
    this.questionnaire = this.FAKE_QLIST.find(q => q.id === id);
    this.progress = this.questionnaire.responseNumber / this.questionnaire.assignedNumber;
  }

}
