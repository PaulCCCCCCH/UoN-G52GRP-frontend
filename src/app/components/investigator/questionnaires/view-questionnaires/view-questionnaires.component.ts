import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-questionnaires',
  templateUrl: './view-questionnaires.component.html',
  styleUrls: ['./view-questionnaires.component.scss']
})
export class ViewQuestionnairesComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
