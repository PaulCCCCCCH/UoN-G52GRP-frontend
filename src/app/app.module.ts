import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { DemoService } from './services/demo.service';
import { InfoComponent } from './components/info/info.component';
import { NavComponent } from './components/core/nav/nav.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { QListComponent } from './components/q-list/q-list.component';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './index/index.component';
import { ViewQuestionnaireComponent } from './components/view-questionnaire/view-questionnaire.component';
import { QuestionnaireDashboardComponent } from './components/respondent/questionnaire-dashboard/questionnaire-dashboard.component';
import { QuestionnaireFillComponent } from './components/respondent/questionnaire-fill/questionnaire-fill.component';
import { QuestionnaireSubmitComponent } from './components/respondent/questionnaire-submit/questionnaire-submit.component';
import { EditQuestionnaireComponent } from './components/investigator/questionnaires/edit-questionnaire/edit-questionnaire.component';

const appRoutes: Routes = [
  // Main
  { path: 'index', component: IndexComponent},
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  // Functionality
  { path: 'q-list', component: QListComponent},
  { path: 'view-questionnaire/:id', component: ViewQuestionnaireComponent},
  // END
  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'}} //Needs to be last since it will match every url

  // Others
  { path: 'info', component: InfoComponent, data: { title: 'info' }},

  //Respondant Routes
  { path: 'response/dash', component: QuestionnaireDashboardComponent, data: { title: 'Dashboard' }},
  { path: 'response/complete', component: QuestionnaireFillComponent, data: { title: 'Questionnaire' }},
  { path: 'response/submit', component: QuestionnaireSubmitComponent, data: { title: 'Submitted' }},

  //Invesigator Routes
  { path: 'questionnaire/edit', component: EditQuestionnaireComponent, data: { title: 'Dashboard' }},

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
    QListComponent,
    CardComponent,
    IndexComponent,
    ViewQuestionnaireComponent,
    PageNotFoundComponent,
    QuestionnaireDashboardComponent,
    QuestionnaireFillComponent,
    QuestionnaireSubmitComponent,
    EditQuestionnaireComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
