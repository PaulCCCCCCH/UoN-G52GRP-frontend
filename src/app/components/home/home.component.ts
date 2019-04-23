import {Component, OnInit,} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

/**
 * The homepage of the front-end system. It consists of links to
 * different pages.
 * @author Mohsin Warraich
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {
  }

  /**
   * Open a ng-template with the given tag
   */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit() {
  }

  /**
   * Navigates to create questionnaire page. Used by a button.
   */
  goToCreateFromScratchPage() {
    this.router.navigate(['/questionnaire/create']);
    this.modalService.dismissAll();
  }

  /**
   * Navigates to create questionnaire page. Used by a button.
   */
  goToDraftPage() {
    this.router.navigate(['/questionnaires']);
    this.modalService.dismissAll();
  }

}
