import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import { AssignService }  from '../assign.service';



@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent {
  Email: String;

  constructor(private assignService:AssignService) { }
  getEmail(): void {
    this.assignService.getemail(this.Email)
    .subscribe(heroes => this.Email= this.Email);
  }

 

}
