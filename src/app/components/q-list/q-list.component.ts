import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { QuestionnaireService } from '../../services/questionnaire/questionnaire.service';

@Component({
  selector: 'app-q-list',
  templateUrl: './q-list.component.html',
  styleUrls: ['./q-list.component.scss']
})
export class QListComponent implements OnInit {

  // FAKE_QLIST: Questionnaire[];
  qList: Questionnaire[];
  public toggled;

  constructor(private questionnaireService: QuestionnaireService) {
    /*this.FAKE_QLIST = [
      new Questionnaire(1, 'How is Peter?'),
      new Questionnaire(2, 'What do you think of ACE module?'),
      new Questionnaire(3, 'Another questionnaire.'),
    ];*/
  }

  ngOnInit() {
    this.questionnaireService.getQList().subscribe(questionnaires =>
      this.qList = questionnaires
    );
  }

  onClick(id) {
  }

}
