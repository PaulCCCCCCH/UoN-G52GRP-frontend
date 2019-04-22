import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Staff} from '../../classes/staff';
import {StaffService} from '../services/staff/staff.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user/user.service';
import {ClientService} from '../services/client/client.service';


@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {

  private selectedStaff: Staff;
  private staffList: Staff[];
  private userList: Staff[];
  private companyId = this.route.snapshot.paramMap.get('id');
  private companyName: string;
  private addedStaff: Staff[];

  private isNewStaff: boolean[];

  constructor(
    private modalService: NgbModal,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
  ) {}

  openWindow(content, selectedStaff: Staff) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
    this.selectedStaff = selectedStaff;
  }

  ngOnInit() {
    this.clientService.getClient(this.companyId).subscribe(res => {
      this.companyName = res.data.name;
    })
    this.staffService.getStaff(this.companyId).subscribe(res => {
      this.staffList = res.data;
      this.userService.getUsers().subscribe( res => {
        this.userList = res.data;
        this.isNewStaff = [];
        this.userList.forEach(user => this.isNewStaff.push(false));
      });
    });

  }

  addStaff() {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.isNewStaff[i]) {
        this.staffService.addStaff(this.companyId, this.userList[i]._id).subscribe(
          res => {
            this.refresh()
          }
        );
      }
    }
  }

  removeStaff() {
    this.staffService.removeStaff(this.companyId, this.selectedStaff._id).subscribe(
      res => {
        alert('Successfully deleted staff')
        this.refresh();
      },
      err => alert('Server error!')
    );
  }

  submit() {
    this.staffService.addStaff(this.companyId, '').subscribe(
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

  refresh() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

}
