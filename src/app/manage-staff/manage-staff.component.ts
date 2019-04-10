import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Staff} from '../../classes/staff';
import {StaffService} from '../services/staff/staff.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {

  private selectedStaff: Staff;
  private staffList: Staff[];
  private companyId = this.route.snapshot.paramMap.get('id');

  private newStaffId: string;

  constructor(
    private modalService: NgbModal,
    private staffService: StaffService,
    private route: ActivatedRoute
  ) {}

  openWindow(content, selectedStaff: Staff) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
    this.selectedStaff = selectedStaff;
  }

  ngOnInit() {
    this.staffService.getStaff(this.companyId).subscribe(res => {
      this.staffList = res.data;
    });
  }

  submit() {
    if (this.selectedStaff === null) {
      this.staffService.addStaff(this.companyId, this.newStaffId).subscribe(
        r => console.log(r)
      );
    }
  }

  addStaff() {
    this.staffService.addStaff(this.companyId, this.newStaffId).subscribe(
      res => {
        alert('Successfully added a new staff to the company!');
      },
      err => {
        if (err.status === 405) {
          alert('Failed. Staff by this id does not exist!');
        } else {
          alert('Failed. Server error.');
        }
      }
    );
  }


}
