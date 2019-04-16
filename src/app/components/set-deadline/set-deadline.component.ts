import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-set-deadline',
  templateUrl: './set-deadline.component.html',
  styleUrls: ['./set-deadline.component.scss']
})
export class SetDeadlineComponent implements OnInit {

  private selectedDate;
  @Output() emitter = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
    this.selectedDate = new Date();
  }

  onDateChange() {
    console.log(this.selectedDate);
    const ngbDate = this.selectedDate;
    const date = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    console.log(date);
    this.emitter.emit(date);
  }



}
