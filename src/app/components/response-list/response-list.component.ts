import { Component, OnInit } from '@angular/core';
import {GetResponseService} from '../../services/getResponse/get-response.service';
import {ResponseSet} from '../../../classes/responseSet';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {

  private responses = {};
  private id = this.route.snapshot.paramMap.get('id');

  constructor(
    private responseService: GetResponseService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.responseService.getResponseSets(this.id).subscribe(
      res => this.responses = res.data
    );
  }

}
