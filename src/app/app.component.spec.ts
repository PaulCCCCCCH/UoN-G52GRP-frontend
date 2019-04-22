import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ViewQuestionnaireComponent} from './components/view-questionnaire/view-questionnaire.component';
import {QuestionnaireDashboardComponent} from './components/respondent/questionnaire-dashboard/questionnaire-dashboard.component';
import {QuestionnaireFillComponent} from './components/respondent/questionnaire-fill/questionnaire-fill.component';
import {QuestionnaireSubmitComponent} from './components/respondent/questionnaire-submit/questionnaire-submit.component';
import {ListQuestionnaireComponent} from './components/list-questionnaire/list-questionnaire.component';
import {QuestionnaireSubmitConfirmComponent} from './components/respondent/questionnaire-submit-confirm/questionnaire-submit-confirm.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AssignComponent} from './components/assign/assign.component';
import {ResponseListComponent} from './components/response-list/response-list.component';
import {ViewResponseSetComponent} from './components/view-response-set/view-response-set.component';
import {ManageStaffComponent} from './components/manage-staff/manage-staff.component';
import {ViewClientsComponent} from './components/view-clients/view-clients.component';
import {ViewOverallComponent} from './components/view-overall/view-overall.component';
import {EditQuestionnaireComponent} from './components/edit-questionnaire/edit-questionnaire.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {SetDeadlineComponent} from './components/set-deadline/set-deadline.component';
import {AboutComponent} from './components/about/about.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
      ],
      declarations: [
        AppComponent,
        NavComponent,
        PageNotFoundComponent,
        ViewQuestionnaireComponent,
        QuestionnaireDashboardComponent,
        QuestionnaireFillComponent,
        QuestionnaireSubmitComponent,
        ListQuestionnaireComponent,
        QuestionnaireSubmitConfirmComponent,
        LoginComponent,
        HomeComponent,
        AssignComponent,
        ResponseListComponent,
        ViewResponseSetComponent,
        ManageStaffComponent,
        ViewClientsComponent,
        ViewOverallComponent,
        EditQuestionnaireComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SetDeadlineComponent,
        AboutComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to frontend!');
  });
});
