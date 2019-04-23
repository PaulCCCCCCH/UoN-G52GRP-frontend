import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ViewQuestionnaireComponent} from './administrator/view-questionnaire/view-questionnaire.component';
import {QuestionnaireDashboardComponent} from './respondent/questionnaire-dashboard/questionnaire-dashboard.component';
import {QuestionnaireFillComponent} from './respondent/questionnaire-fill/questionnaire-fill.component';
import {QuestionnaireSubmitComponent} from './respondent/questionnaire-submit/questionnaire-submit.component';
import {ListQuestionnaireComponent} from './administrator/list-questionnaire/list-questionnaire.component';
import {QuestionnaireSubmitConfirmComponent} from './respondent/questionnaire-submit-confirm/questionnaire-submit-confirm.component';
import {LoginComponent} from './administrator/login/login.component';
import {HomeComponent} from './administrator/home/home.component';
import {AssignComponent} from './administrator/assign/assign.component';
import {ResponseListComponent} from './administrator/response-list/response-list.component';
import {ViewResponseSetComponent} from './administrator/view-response-set/view-response-set.component';
import {ManageStaffComponent} from './administrator/manage-staff/manage-staff.component';
import {ViewClientsComponent} from './administrator/view-clients/view-clients.component';
import {ViewOverallComponent} from './administrator/view-overall/view-overall.component';
import {EditQuestionnaireComponent} from './administrator/edit-questionnaire/edit-questionnaire.component';
import {ForgotPasswordComponent} from './administrator/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './administrator/reset-password/reset-password.component';
import {SetDeadlineComponent} from './administrator/set-deadline/set-deadline.component';
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
