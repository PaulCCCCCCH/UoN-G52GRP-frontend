import { Component, Input, OnInit } from '@angular/core';
import {Questionnaire } from '../../../classes/questionnaire';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.scss']
})
export class ViewQuestionnaireComponent implements OnInit {

  private id = +this.route.snapshot.paramMap.get('id');
  private questionnaire: Questionnaire;
  progress: number;
  finished = false;

  constructor(
    private modalService: NgbModal,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.questionnaireService.getQuestionnaire(this.id).subscribe(questionnaires => {
      this.questionnaire = questionnaires[0];
      this.progress = this.questionnaire.responseNumber / this.questionnaire.assignedNumber;
      this.finished = true;
    });
    /*
    this.questionnaireService.getQList().subscribe(questionnaires =>
      this.questionnaire = questionnaires[0]
    );
    */

  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  viewResponseList() {
    window.location.href = 'view-response-list/' + this.id;
  }

}

