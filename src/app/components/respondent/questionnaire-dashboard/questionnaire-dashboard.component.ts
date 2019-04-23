import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseService} from '../../../services/response/response.service';

/**
 * This is the page where a respondent will land when
 * clicking the link sent to the email.
 * Information about the questionnaire will be shown,
 * and the respondent can proceed by clicking a button.
 *
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-questionnaire-dashboard',
  templateUrl: './questionnaire-dashboard.component.html',
  styleUrls: ['./questionnaire-dashboard.component.scss']
})
export class QuestionnaireDashboardComponent implements OnInit {
  /**
   * The unique ticket of the 'respondent-questionnaire' pair
   * from the url.
   */
  private ticket = this.route.snapshot.paramMap.get('ticket');

  /**
   * Current questionnaire title.
   */
  private title: string;

  /**
   * Current questionnaire deadline.
   */
  private deadline: string;

  /**
   * Current questionnaire description.
   */
  private description: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService
  ) {
  }

  /**
   * Initializes the page by retrieving corresponding questionnaire
   * from the back end.
   */
  ngOnInit() {
    this.responseService.getForm(this.ticket).subscribe(
      res => {
        const data = JSON.parse(res.data);
        console.log(data);
        this.title = data.title;
        this.deadline = new Date(data.deadline).toUTCString();
        this.description = data.description;
      },
      err => {
        alert('Server error! Failed to retrieve form.');
        this.router.navigate(['/error']);
      });
  }

  /**
   * Used by the button leading to fill-out page.
   */
  toFillPage() {
    this.router.navigate(['response/fill/' + this.ticket]);
  }

}
