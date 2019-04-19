import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseService} from '../../../services/response/response.service';

@Component({
  selector: 'app-questionnaire-dashboard',
  templateUrl: './questionnaire-dashboard.component.html',
  styleUrls: ['./questionnaire-dashboard.component.scss']
})
export class QuestionnaireDashboardComponent implements OnInit {

  private ticket = this.route.snapshot.paramMap.get('ticket');
  private title: string;
  private deadline: string;
  private description: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService
  ) { }

  ngOnInit() {
    this.responseService.getForm(this.ticket).subscribe(
      res => {
        const data = JSON.parse(res.data);
        console.log(data);
        this.title = data.title;
        this.deadline = new Date(data.deadline).toUTCString();
        this.description = data.description;
      },
      err => {
        alert('Server error! Failed to retrieve form.');
        this.router.navigate(['/error']);
      });
  }

  toFillPage() {
    this.router.navigate(['response/fill/' + this.ticket]);
  }

}
