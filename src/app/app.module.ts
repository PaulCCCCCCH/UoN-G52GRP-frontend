import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuestionnaireDashboardComponent } from './components/respondent/questionnaire-dashboard/questionnaire-dashboard.component';
import { QuestionnaireFillComponent } from './components/respondent/questionnaire-fill/questionnaire-fill.component';
import { QuestionnaireSubmitComponent } from './components/respondent/questionnaire-submit/questionnaire-submit.component';
import { EditQuestionnaireComponent } from './components/edit-questionnaire/edit-questionnaire.component';
import { ListQuestionnaireComponent } from './components/list-questionnaire/list-questionnaire.component';
import { ViewQuestionnaireComponent } from './components/view-questionnaire/view-questionnaire.component';
import { QuestionnaireSubmitConfirmComponent } from './components/respondent/questionnaire-submit-confirm/questionnaire-submit-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AssignComponent } from './components/assign/assign.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ViewResponseSetComponent } from './components/view-response-set/view-response-set.component';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { ViewClientsComponent } from './components/view-clients/view-clients.component';
import { ViewOverallComponent } from './components/view-overall/view-overall.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService} from './services/auth/auth-interceptor.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SetDeadlineComponent } from './components/set-deadline/set-deadline.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
      { path: '', canActivate: [AuthGuardService], children: [
          { path: '', component: HomeComponent},
          { path: 'manage-staff/:id', component: ManageStaffComponent},
          { path: 'view-clients', component: ViewClientsComponent},
          { path: 'home', component: HomeComponent, data: { title: 'Home' }},

      ]},

  { path: 'login', component: LoginComponent, data: { title: 'Login' }},
  // Main
  { path: '', component: HomeComponent },
  // Functionality
  { path: 'assign', component: AssignComponent},
  { path: 'view-response-list/:id', component: ResponseListComponent},
  { path: 'view-response-set/:qid/:uid', component: ViewResponseSetComponent},

  { path: 'forgot-password',component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  // Others
  { path: 'about', component: AboutComponent, data: { title: 'about' }},

  //Respondant Routes
  { path: 'response/dash/:ticket', component: QuestionnaireDashboardComponent, data: { title: 'Dashboard' }},
  { path: 'response/fill/:ticket', component: QuestionnaireFillComponent, data: { title: 'Questionnaire' }},
  { path: 'response/submit/confirm/:ticket', component: QuestionnaireSubmitConfirmComponent, data: { title: 'Submitting' }},
  { path: 'response/submit/success/:ticket', component: QuestionnaireSubmitComponent, data: { title: 'Submitted' }},

  //Invesigator Routes
  { path: 'questionnaire/edit/:id', component: EditQuestionnaireComponent },
  { path: 'questionnaire/create', component: EditQuestionnaireComponent },
  { path: 'questionnaire/view/:status/:id', component: ViewQuestionnaireComponent},
  { path: 'questionnaire/view-overall/:status/:id', component: ViewOverallComponent},

  { path: 'questionnaires', component: ListQuestionnaireComponent},
  { path: 'questionnaires/:status', component: ListQuestionnaireComponent},

  // Others
  { path: 'about', component: AboutComponent, data: { title: 'about' }},
  //END
  { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'}}, //Needs to be last since it will match every url
  { path: 'error', component: PageNotFoundComponent},
];

@NgModule({
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
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SetDeadlineComponent,
    EditQuestionnaireComponent,
    AboutComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
