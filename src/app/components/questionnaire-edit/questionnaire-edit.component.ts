import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Question} from '../../../classes/question';
import {GetQuestionService} from '../../services/getQuestion/get-question.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {Questionnaire} from '../../../classes/questionnaire';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-questionnaire-edit',
  templateUrl: './questionnaire-edit.component.html',
  styleUrls: ['./questionnaire-edit.component.scss'],
  providers: [NgbDropdownConfig]
})
export class QuestionnaireEditComponent implements OnInit {

  private questions: Question[];
  private questionnaire: Questionnaire;
  private questionnaireId: string;
  private inputTitle: string;
  private inputDescription: string;
  private emailList: string[];
  private deadline: Date;

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
              private modalService: NgbModal,
              private questionnaireService: QuestionnaireService,
              private route: ActivatedRoute,
              private router: Router,
              private config: NgbDropdownConfig
  ) {
    this.questions = [];
    this.from = 0;
    this.to = 0;
    this.config.placement = 'top-left';
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(this.messageShowTimeMs)
    ).subscribe(() => this.successMessage = null);

    this.questionnaireId = this.route.snapshot.paramMap.get('id');
    // TODO: edit draft given id.
    if (this.questionnaireId) {
      this.questionnaireService.getQuestionnaire(this.questionnaireId, '').subscribe(
        res => {
          this.questions = JSON.parse(res.data.form);
          this.inputTitle = res.data.title;
          this.inputDescription = res.data.description;
        }
      );
      return;
    }
  }

  backClicked() {
    this.router.navigate(['/questionnaires']);
  }

  addQuestion(typeCode: number) {
    const question = new Question(typeCode);
    if (question.typeCode === 2 || question.typeCode === 3) {
      question.choices = [];
    }
    this.questions.push(question);
    console.log(question);
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
    question.choices.push('');
  }

  removeChoice(question: Question, choiceIndex: number) {
    question.choices.splice(choiceIndex, 1);
  }

  openWindow(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  submit() {
    const id = this.questionnaireId;
    const form = JSON.stringify(this.questions);
    if (!id) {
      this.questionnaireService.postQuestionnaire(form, this.inputTitle, this.inputDescription).subscribe(
        res => {
          alert('Form saved!');
          this.questionnaireId = res.data._id;
          this.router.navigate(['/questionnaire/edit/' + this.questionnaireId]);
        },
        err => this.alertError(err)
      );
    } else {
      this.questionnaireService.updateQuestionnaire(this.questionnaireId, form, this.inputTitle, this.inputDescription).subscribe(
        res => alert('Form saved!'),
        err => this.alertError(err)
      );
    }
  }

  deleteQuestionnaire() {
    this.questionnaireService.deleteQuestionnaire(this.questionnaireId).subscribe(
      res => {
        alert('Successfully deleted questionnaire!');
        this.router.navigate(['questionnaires/']);
        this.modalService.dismissAll();
      },
      err => this.alertError(err)
    );
  }


  activate() {
    if (!this.questionnaireId) {
      alert('Please save the draft first!');
      return;
    }
    if (!this.questionnaireService.validateEmails(this.emailList)) {
      return;
    }
    this.questionnaireService.createActiveQuestionnaire(this.questionnaireId, this.inputTitle, this.inputDescription).subscribe(
      res => {
        const newId = res.data._id;
        this.questionnaireService.assignRespondents(newId, this.emailList).subscribe(
          () => {
            this.questionnaireService.activateQuestionnaire(newId, this.deadline).subscribe(
              () => {
                this.router.navigate(['/questionnaires/active']);
                alert('Questionnaire activated!');
                this.modalService.dismissAll();
              }
            );

          }
        );
      },
      err => this.alertError(err)
    );
  }

  checkValidity() {
    if (this.questionnaireService.validateEmails(this.emailList)) {
      alert('email addresses valid!');
    }
  }

  setDeadline(deadline) {
    console.log(deadline);
    this.deadline = deadline;
  }

  onListChange(emailList) {
    this.emailList = emailList;
  }

  alertError(err) {
    alert('Operation failed! Message from server: ' + err.error.err.message);
    console.log(err);
  }

  alertSave() {
    alert('Please save the draft first');
  }

  trackByFn(index: any, item: any) {
    return index;
  }


  // For debugging
  print(j: number, qc) {
    alert('Now editing ' + j);
    console.log(qc);
  }

}
