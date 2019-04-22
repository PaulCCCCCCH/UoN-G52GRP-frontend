import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * This is a component for assigning respondents to a
 * questionnaire
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  inputEmails: string;
  @Output() private emitter = new EventEmitter<string[]>();
  private inputEmailList: string[];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.inputEmailList = [];
  }

  /**
   * Converts current string of emails into array of strings
   * Any duplicated emails will be removed
   * @emits the parsed list of emails
    */
  parseEmails() {
    if (!this.inputEmails) {
      return;
    }
    const list = this.inputEmails.split(/[\s,]+/);
    const trimmed = [];
    list.forEach(s => trimmed.push(s.trim()));

    const parsed = [];
    trimmed.map((e, i) => !parsed.includes(e) && parsed.push(e));
    this.inputEmailList = parsed;
    this.emitter.emit(this.inputEmailList);
  }

  /**
   * Parses the emails and show the parsed list on the screen.
   */
  showEmails() {
    this.parseEmails();
    alert(this.inputEmailList);
  }

  /**
   * Opens a pop-up window with given tag.
   * @param content the tag of the pop-up window
   */
  openWindow(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }
}
