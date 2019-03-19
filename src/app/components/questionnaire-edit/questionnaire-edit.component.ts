import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Question} from '../../../classes/question';
import {GetQuestionService} from '../../services/getQuestion/get-question.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questionnaire-edit',
  templateUrl: './questionnaire-edit.component.html',
  styleUrls: ['./questionnaire-edit.component.scss']
})
export class QuestionnaireEditComponent implements OnInit {

  private questions: Question[];

  // Alert
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  messageShowTimeMs = 2000;

  // Helper fields
  private from: number;
  private to: number;


  constructor(private _location: Location,
              private questionService: GetQuestionService,
              private modalService: NgbModal) {
    this.questions = [];
    this.from = 0;
    this.to = 0;
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(this.messageShowTimeMs)
    ).subscribe(() => this.successMessage = null);


    this.questionService.getQuestion(1111).subscribe(
      question => this.questions.push(question[0])
    );
    this.questionService.getQuestion(2222).subscribe(
      question => this.questions.push(question[0])
    );
  }

  backClicked() {
    this._location.back();
  }

  addQuestion(typeCode: number) {
    this.questions.push(new Question(typeCode));
    this._success.next(`Successfully added a question`);
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  setIndex() {
    if (Number.isInteger(this.to) && this.to > 0 && this.to <= this.questions.length) {
      const temp = this.questions[this.from];
      const target = this.to - 1;
      this.questions.splice(this.from, 1);
      this.questions.splice(target, 0, temp);
    } else {
      alert('Invalid index');
    }
  }

  openChangeIndex(content, index: number) {
    this.from = index;
    this.modalService.open(content, { centered: true });
  }

  addChoice(question: Question) {
    question.choices.push('Input text here');
  }

  removeChoice(question: Question, choiceIndex: number) {
    question.choices.splice(choiceIndex, 1);
  }

}
