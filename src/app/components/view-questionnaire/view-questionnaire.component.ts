import {Component, OnInit} from '@angular/core';
import {Questionnaire} from '../../../classes/questionnaire';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {ActivatedRoute, Router} from '@angular/router';


/**
 * This page shows a questionnaire and provides buttons each providing
 * some useful utilities.
 *
 * @author Chonghan Chen
 */
@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.scss']
})
export class ViewQuestionnaireComponent implements OnInit {

  /**
   * The status of current questionnaire.
   * Different utilities will be provided to questionnaires
   * with different status.
   */
  private status = this.route.snapshot.paramMap.get('status');

  /**
   * Current questionnaire id
   */
  private id = this.route.snapshot.paramMap.get('id');

  /**
   * Current questionnaire
   */
  private questionnaire: Questionnaire;

  /**
   * @todo
   */
  progress: number;

  /**
   * Will be set to true when the page finishes loading.
   * The page will not be displayed until this is set to True.
   * This is necessary since we want the page to be shown
   * all at once instead of partially at first, then the rest.
   *
   */
  finished = false;

  constructor(
    private modalService: NgbModal,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  /**
   *  Initializes the component by retrieving the questionnaire
   *  from database.
   */
  ngOnInit() {
    this.questionnaireService.getQuestionnaire(this.id, this.status).subscribe(
      res => {
        const q = res.data;
        this.questionnaire = q;
        this.progress = this.questionnaire.responseNumber / this.questionnaire.assignedNumber; // <--- not working properly at present.
        this.questionnaire.created_at = new Date(q.created_at).toDateString();
        this.questionnaire.deadline = new Date(q.deadline).toDateString();
        this.finished = true;
      });
    /*
    this.questionnaireService.getQList().subscribe(questionnaires =>
      this.questionnaire = questionnaires[0]
    );
    */

  }

  /**
   * Open the modal with given tag
   * @param content the tag of the modal to be opened
   *
   */
  openWindowCustomClass(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  /**
   * Navigates to a page where the user can see a list of responses to
   * the questionnaire.
   * Used by a navigation button
   */
  viewResponseList() {
    this.router.navigate(['/view-response-list/' + this.id]);
  }

  /**
   * Navigates to a page where the user can the overall statistics of
   * the questionnaire.
   * Used by a navigation button
   */
  viewOverall() {
    this.router.navigate(['/questionnaire/view-overall/' + this.status + '/' + this.id]);
  }

  /**
   * Deletes current questionnaire from database.
   */
  deleteQuestionnaire() {
    this.questionnaireService.deleteQuestionnaire(this.id).subscribe(
      res => {
        alert('Successfully deleted questionnaire!');
        this.modalService.dismissAll();
        this.router.navigate(['/questionnaires/']);
      },
      err => alert('Server error! Questionnaire not deleted!')
    );
  }

  closeQuestionnaire() {
    this.questionnaireService.archiveQuestionnaire(this.id).subscribe(
      res => {
        alert('Questionnaire archived!');
        this.modalService.dismissAll();
        this.router.navigate(['/questionnaires/archived']);
      },
      err => alert('Server error! Questionnaire not archived!')
    );
  }

  /**
   * This method has not been implemented yet.
   * This will be removed in future version.
   * @param deadline new deadline of the questionnaire
   */
  changeDeadline(deadline: Date) {
    //TODO: Change deadline
  }
}

