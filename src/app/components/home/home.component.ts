import { Component, OnInit,  } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit() {
  }

  goToCreateFromScratchPage() {
    this.router.navigate(['/questionnaire/create']);
    this.modalService.dismissAll();
  }

  goToDraftPage() {
    this.router.navigate(['/questionnaires']);
    this.modalService.dismissAll();
  }

}
