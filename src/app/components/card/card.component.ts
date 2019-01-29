import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../../page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() toPage: Page;
  constructor() { }

  ngOnInit() { }

}
