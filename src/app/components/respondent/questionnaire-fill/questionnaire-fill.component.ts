import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnaire-fill',
  templateUrl: './questionnaire-fill.component.html',
  styleUrls: ['./questionnaire-fill.component.scss']
})
export class QuestionnaireFillComponent {
  selected = '';
  out = '';
  onAddPost() {
      this.selected = this.out;
    }
}
