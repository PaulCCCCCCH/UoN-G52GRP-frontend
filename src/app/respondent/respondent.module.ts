import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionnaireDashboardComponent} from './questionnaire-dashboard/questionnaire-dashboard.component';
import {QuestionnaireFillComponent} from './questionnaire-fill/questionnaire-fill.component';
import {QuestionnaireSubmitComponent} from './questionnaire-submit/questionnaire-submit.component';
import {QuestionnaireSubmitConfirmComponent} from './questionnaire-submit-confirm/questionnaire-submit-confirm.component';
import {FormsModule} from '@angular/forms';


const respondentRoutes: Routes = [
  { path: 'response/dash/:ticket', component: QuestionnaireDashboardComponent, data: { title: 'Dashboard' }},
  { path: 'response/fill/:ticket', component: QuestionnaireFillComponent, data: { title: 'Questionnaire' }},
  { path: 'response/submit/confirm/:ticket', component: QuestionnaireSubmitConfirmComponent, data: { title: 'Submitting' }},
  { path: 'response/submit/success/:ticket', component: QuestionnaireSubmitComponent, data: { title: 'Submitted' }},
  { path: '', redirectTo: 'error', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    QuestionnaireDashboardComponent,
    QuestionnaireFillComponent,
    QuestionnaireSubmitComponent,
    QuestionnaireSubmitConfirmComponent,
  ],
  imports: [
    RouterModule.forChild(
      respondentRoutes
    ),
    FormsModule,
    CommonModule,
  ]

})

export class RespondentModule { }
