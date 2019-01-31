import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import * as $ from 'jquery';

@Component({
  selector: 'app-q-list',
  templateUrl: './q-list.component.html',
  styleUrls: ['./q-list.component.scss']
})
export class QListComponent implements OnInit {

  FAKE_QLIST: Questionnaire[];
  qList: Questionnaire[];
  public toggled;

  constructor() {
    this.FAKE_QLIST = [
      new Questionnaire(1, 'How is Peter?'),
      new Questionnaire(2, 'What do you think of ACE module?'),
      new Questionnaire(3, 'Another questionnaire.'),
    ];
  }

  ngOnInit() {
    this.qList = this.FAKE_QLIST;
  }

  onClick(id) {
  }

}
