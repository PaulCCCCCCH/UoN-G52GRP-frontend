import { Component, OnInit } from '@angular/core';

/**
 * @module thing
 * This is the About page that can be accessed from nav-bar
 * and when respondents submit their forms. The page does not
 * require a controller.
 *
 * @author Meng Wu
 */

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
