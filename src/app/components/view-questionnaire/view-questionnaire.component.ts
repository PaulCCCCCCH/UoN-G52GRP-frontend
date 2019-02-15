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

  id: number;
  questionnaire: Questionnaire;
  progress: number;

  constructor(
    private modalService: NgbModal,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.questionnaireService.getQuestionnaire(this.id).subscribe(questionnaire => {
      this.questionnaire = questionnaire;
      this.progress = this.questionnaire.responseNumber / this.questionnaire.assignedNumber;
    });

  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

}

