import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
   * Get array of emails from string.
   * Remove any duplicated emails.
    */
  parseEmails() {
    if (!this.inputEmails) {
      return;
    }
    const list = this.inputEmails.split(/[\s,]+/);
    const trimmed = []
    list.forEach(s => trimmed.push(s.trim()));

    const parsed = [];
    trimmed.map((e, i) => !parsed.includes(e) && parsed.push(e));
    this.inputEmailList = parsed;
    this.emitter.emit(this.inputEmailList);
  }

  showEmails() {
    this.parseEmails();
    alert(this.inputEmailList);
  }

  openWindow(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }
}
