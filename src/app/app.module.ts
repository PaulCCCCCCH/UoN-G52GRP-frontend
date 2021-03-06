import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { DemoService } from './services/demo.service';
import { InfoComponent } from './components/info/info.component';
import { NavComponent } from './components/core/nav/nav.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { QuestionnaireDashboardComponent } from './components/respondent/questionnaire-dashboard/questionnaire-dashboard.component';
import { QuestionnaireFillComponent } from './components/respondent/questionnaire-fill/questionnaire-fill.component';
import { QuestionnaireSubmitComponent } from './components/respondent/questionnaire-submit/questionnaire-submit.component';

import { QuestionnaireEditComponent } from './components/questionnaire-edit/questionnaire-edit.component';
import { QListComponent } from './components/q-list/q-list.component';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './index/index.component';
import { ViewQuestionnaireComponent } from './components/view-questionnaire/view-questionnaire.component';
import { ViewQuestionnairesComponent } from './components/investigator/questionnaires/view-questionnaires/view-questionnaires.component';
import { QuestionnaireSubmitConfirmComponent } from './components/respondent/questionnaire-submit-confirm/questionnaire-submit-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AssignComponent } from './assign/assign.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ViewResponseSetComponent } from './components/view-response-set/view-response-set.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { ViewClientsComponent } from './components/view-clients/view-clients.component';
import { ViewOverallComponent } from './components/view-overall/view-overall.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertService } from './services/alert/alert.service';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

const appRoutes: Routes = [
  // Main
  { path: '', component: HomeComponent },
  { path: 'index', redirectTo: 'index', pathMatch: 'full'},
  // Functionality
  { path: 'q-list', component: QListComponent},
  { path: 'view-questionnaire/:id', component: ViewQuestionnaireComponent},
  { path: 'assign', component: AssignComponent},
  { path: 'view-response-list/:id', component: ResponseListComponent},
  { path: 'view-response-set/:qid/:uid', component: ViewResponseSetComponent},
  { path: 'manage-staff', component: ManageStaffComponent },
  { path: 'view-clients', component: ViewClientsComponent },
  { path: 'view-questionnaire/:id/view-overall', component: ViewOverallComponent },

  // Others
  { path: 'info', component: InfoComponent, data: { title: 'info' }},

  //Respondant Routes
  { path: 'response/dash', component: QuestionnaireDashboardComponent, data: { title: 'Dashboard' }},
  { path: 'response/complete/:formId', component: QuestionnaireFillComponent, data: { title: 'Questionnaire' }},
  { path: 'response/submit/confirm', component: QuestionnaireSubmitConfirmComponent, data: { title: 'Submitting' }},
  { path: 'response/submit/success', component: QuestionnaireSubmitComponent, data: { title: 'Submitted' }},

  //Invesigator Routes
  { path: 'login', component: LoginComponent, data: { title: 'Login' }},
  { path: 'home', component: HomeComponent, data: { title: 'Home' }},
  { path: 'questionnaires/:id', component: ViewQuestionnairesComponent, data: { title: 'Questionnaires' }},
  { path: 'questionnaire-edit', component: QuestionnaireEditComponent },
  // Others
  { path: 'info', component: InfoComponent, data: { title: 'info' }},
  //END
  { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'}} //Needs to be last since it will match every url
];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    InfoComponent,
    NavComponent,
    PageNotFoundComponent,
    ViewQuestionnaireComponent,
    QuestionnaireDashboardComponent,
    QuestionnaireFillComponent,
    QuestionnaireSubmitComponent,
    QListComponent,
    CardComponent,
    IndexComponent,
    ViewQuestionnairesComponent,
    QuestionnaireSubmitConfirmComponent,
    LoginComponent,
    HomeComponent,
    AssignComponent,
    ResponseListComponent,
    ViewResponseSetComponent,
    ManageStaffComponent,
    ViewClientsComponent,
    ViewOverallComponent,
    QuestionnaireEditComponent,
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
    DemoService,
    AlertService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
