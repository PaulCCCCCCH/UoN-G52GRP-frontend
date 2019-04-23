import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Staff} from '../../../classes/staff';
import {StaffService} from '../../services/staff/staff.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {ClientService} from '../../services/client/client.service';


/**
 * This page shows a list of staff in the company. It also
 * provides some utilities for staff management.
 *
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {

  /**
   * The staff that the user is currently dealing with.
   */
  private selectedStaff: Staff;

  /**
   * The list of all staff in the company.
   */
  private staffList: Staff[];

  /**
   * The list of all users in the system
   */
  private userList: Staff[];

  /**
   * The id of the company
   */
  private companyId = this.route.snapshot.paramMap.get('id');

  /**
   * The name of the company
   */
  private companyName: string;

  /**
   * An array of boolean values.
   * isNewStaff[i] == True means the user has selected
   * this.userList[i] to add to the list of the staff
   * in the company
   */
  private isNewStaff: boolean[];

  constructor(
    private modalService: NgbModal,
    private staffService: StaffService,
    private route: ActivatedRoute,
    private userService: UserService,
    private clientService: ClientService,
  ) {
  }

  /**
   * Open the modal with the given tag and set staff in
   * the argument to be the 'selected staff'.
   *
   * @param content the tag of the modal to be opened
   * @param selectedStaff the staffthat the user is operating on
   *
   */
  openWindow(content, selectedStaff: Staff) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
    this.selectedStaff = selectedStaff;
  }

  /**
   * Initializes the page by getting the list of staff in the company
   * as well as the list of all users in the system.
   */
  ngOnInit() {
    this.clientService.getClient(this.companyId).subscribe(res => {
      this.companyName = res.data.name;
    });
    this.staffService.getStaff(this.companyId).subscribe(res => {
      this.staffList = res.data;
      this.userService.getUsers().subscribe(res => {
        this.userList = res.data;
        this.isNewStaff = [];
        this.userList.forEach(user => this.isNewStaff.push(false));
      });
    });

  }

  /**
   * Adds current selected list of users to the company staff list.
   */
  addStaff() {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.isNewStaff[i]) {
        this.staffService.addStaff(this.companyId, this.userList[i]._id).subscribe(
          res => {
            this.refresh();
          }
        );
      }
    }
  }

  /**
   * Remove a staff from the company
   */
  removeStaff() {
    this.staffService.removeStaff(this.companyId, this.selectedStaff._id).subscribe(
      res => {
        alert('Successfully deleted staff');
        this.refresh();
      },
      err => alert('Server error!')
    );
  }

  /**
   * Please use [[this.addStaff]] instead
   */
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

  /**
   * Refresh the page.
   */
  refresh() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

}
