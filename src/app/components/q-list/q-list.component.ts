import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../../../classes/questionnaire';
import { QuestionnaireService } from '../../services/questionnaire/questionnaire.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-q-list',
  templateUrl: './q-list.component.html',
  styleUrls: ['./q-list.component.scss']
})
export class QListComponent implements OnInit {

  qList: Questionnaire[];
  public toggled;

  private status = this.route.snapshot.paramMap.get('status');

  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getQList();
  }

  getQList() {
    this.questionnaireService.getQList(this.status).subscribe(
      res => {
        this.qList = res.data;
        this.qList.forEach(
          q => {
            q.created_at = new Date(q.created_at).toDateString();
          }
        );
      },
      err => {
        alert('Server error! Cannot get list!');
      }
    );
  }

  onClick(id) {
  }

}
