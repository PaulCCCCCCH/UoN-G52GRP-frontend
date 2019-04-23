import {Component, OnInit} from '@angular/core';
import {Questionnaire} from '../../../classes/questionnaire';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {ActivatedRoute} from '@angular/router';

/**
 * This page shows a list of questionnaires with specified state
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-q-list',
  templateUrl: './list-questionnaire.component.html',
  styleUrls: ['./list-questionnaire.component.scss']
})
export class ListQuestionnaireComponent implements OnInit {

  /**
   * A list of questionnaires with specified state
   */
  qList: Questionnaire[];

  /**
   * The status of the questionnaires that the user wishes to see
   */
  status = this.route.snapshot.paramMap.get('status');

  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {
  }

  /**
   * Initializes the component
   * Gets the list of the questionnaires.
   */
  ngOnInit() {
    this.getQList();
  }

  /**
   * Retrieve from database the questionnaires with a specific status.
   */
  getQList() {
    this.questionnaireService.getQList(this.status).subscribe(
      res => {
        this.qList = res.data;
        this.qList.forEach(
          q => {
            q.created_at = new Date(q.created_at).toDateString();
            q.deadline = new Date(q.deadline).toDateString();
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
