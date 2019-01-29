import { Component, OnInit } from '@angular/core';
import { PAGES } from '../pages';
import { Page } from '../../classes/page';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  pages: Page[];
  constructor() { }

  ngOnInit() {
    this.pages = PAGES;
  }

}
