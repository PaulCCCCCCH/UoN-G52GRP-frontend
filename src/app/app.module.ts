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
import { EditQuestionnaireComponent } from './components/investigator/questionnaires/edit-questionnaire/edit-questionnaire.component';
import { QListComponent } from './components/q-list/q-list.component';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './index/index.component';
import { ViewQuestionnaireComponent } from './components/view-questionnaire/view-questionnaire.component';
import { ViewQuestionnairesComponent } from './components/investigator/questionnaires/view-questionnaires/view-questionnaires.component';
import { QuestionnaireSubmitConfirmComponent } from './components/respondent/questionnaire-submit-confirm/questionnaire-submit-confirm.component';
import { AssignComponent } from './assign/assign.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { ViewResponseSetComponent } from './components/view-response-set/view-response-set.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';

const appRoutes: Routes = [
  // Main
  { path: '', component: IndexComponent},
  { path: 'index', redirectTo: 'index', pathMatch: 'full'},
  // Functionality
  { path: 'q-list', component: QListComponent},
  { path: 'view-questionnaire/:id', component: ViewQuestionnaireComponent},
  { path: 'assign', component: AssignComponent},
  { path: 'view-response-list/:id', component: ResponseListComponent},
  { path: 'view-response-set/:qid/:uid', component: ViewResponseSetComponent},
  { path: 'manage-staff', component:ManageStaffComponent },

  // Others
  { path: 'info', component: InfoComponent, data: { title: 'info' }},

  //Respondant Routes
  { path: 'response/dash', component: QuestionnaireDashboardComponent, data: { title: 'Dashboard' }},
  { path: 'response/complete', component: QuestionnaireFillComponent, data: { title: 'Questionnaire' }},
  { path: 'response/submit/confirm', component: QuestionnaireSubmitConfirmComponent, data: { title: 'Submitting' }},
  { path: 'response/submit/success', component: QuestionnaireSubmitComponent, data: { title: 'Submitted' }},

  //Invesigator Routes
  { path: 'questionnaire/edit', component: EditQuestionnaireComponent, data: { title: 'Edit Questionnaire' }},
  { path: 'questionnaires', component: ViewQuestionnairesComponent, data: { title: 'Questionnaires' }},
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
    EditQuestionnaireComponent,
    QListComponent,
    CardComponent,
    IndexComponent,
    ViewQuestionnairesComponent,
    QuestionnaireSubmitConfirmComponent,
    AssignComponent,
    ResponseListComponent,
    ViewResponseSetComponent,
    ManageStaffComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [DemoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
