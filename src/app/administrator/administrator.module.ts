import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../services/auth/auth-guard.service';
import {HomeComponent} from './home/home.component';
import {ManageStaffComponent} from './manage-staff/manage-staff.component';
import {ViewClientsComponent} from './view-clients/view-clients.component';
import {AssignComponent} from './assign/assign.component';
import {ResponseListComponent} from './response-list/response-list.component';
import {ViewResponseSetComponent} from './view-response-set/view-response-set.component';
import {EditQuestionnaireComponent} from './edit-questionnaire/edit-questionnaire.component';
import {ViewQuestionnaireComponent} from './view-questionnaire/view-questionnaire.component';
import {ViewOverallComponent} from './view-overall/view-overall.component';
import {ListQuestionnaireComponent} from './list-questionnaire/list-questionnaire.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {SetDeadlineComponent} from './set-deadline/set-deadline.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptorService} from '../services/auth/auth-interceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';


const administratorRoutes: Routes = [
  { path: '', canActivate: [AuthGuardService], children: [
      { path: 'admin', component: HomeComponent},
      { path: 'admin/manage-staff/:id', component: ManageStaffComponent},
      { path: 'admin/view-clients', component: ViewClientsComponent},
      { path: 'admin/home', component: HomeComponent, data: { title: 'Home' }},
      { path: 'admin/assign', component: AssignComponent},
      { path: 'admin/view-response-list/:id', component: ResponseListComponent},
      { path: 'admin/view-response-set/:qid/:uid', component: ViewResponseSetComponent},
      { path: 'admin/questionnaire/edit/:id', component: EditQuestionnaireComponent },
      { path: 'admin/questionnaire/create', component: EditQuestionnaireComponent },
      { path: 'admin/questionnaire/view/:status/:id', component: ViewQuestionnaireComponent},
      { path: 'admin/questionnaire/view-overall/:status/:id', component: ViewOverallComponent},
      { path: 'admin/questionnaires', component: ListQuestionnaireComponent},
      { path: 'admin/questionnaires/:status', component: ListQuestionnaireComponent},
    ]},

  // Home page
  { path: 'admin/', component: HomeComponent },
  { path: '', redirectTo: 'admin/', pathMatch: 'full'},

  // Login page
  { path: 'admin/login', component: LoginComponent, data: { title: 'Login' }},

  // Reset password pages
  { path: 'admin/forgot-password', component: ForgotPasswordComponent},
  { path: 'admin/reset-password', component: ResetPasswordComponent},

];


@NgModule({
  declarations: [
    ViewQuestionnaireComponent,
    ListQuestionnaireComponent,
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
  ],
  imports: [
    RouterModule.forChild(
      administratorRoutes,
    ),
    CommonModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
})
export class AdministratorModule { }
