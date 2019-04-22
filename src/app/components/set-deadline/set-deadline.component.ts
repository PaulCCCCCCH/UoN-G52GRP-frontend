import {Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * A component used to set the deadline of a questionnaire.
 * It emits the deadline as a Date object.
 *
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-set-deadline',
  templateUrl: './set-deadline.component.html',
  styleUrls: ['./set-deadline.component.scss']
})
export class SetDeadlineComponent implements OnInit {

  /**
   * Bound dynamically to the input of the 'Datepicker' element
   * using [(ngModal)] field.
   */
  private selectedDate;

  /**
   * Emitter that emits current selected date as a Date object so that
   * paretn component can use.
    */
  @Output() emitter = new EventEmitter<Date>();

  constructor() { }

  /**
   * Initializes the component
   */
  ngOnInit() {
    this.selectedDate = new Date();
  }

  /**
   * Parses the date received from 'Datepicker' and emits the result.
   * Triggered whenever the input of the Datepicker changes.
   */
  onDateChange() {
    console.log(this.selectedDate);
    const ngbDate = this.selectedDate;
    const date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    console.log(date);
    this.emitter.emit(date);
  }



}
