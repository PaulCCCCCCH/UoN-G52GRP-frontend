import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { AdministratorModule } from './administrator/administrator.module';
import { RespondentModule } from './respondent/respondent.module';

/**
 *
 */

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: './administrator/administrator.module#AdministratorModule'
  },
  {
    path: 'response',
    loadChildren: './respondent/respondent.module#RespondentModule'
  },


    // About page
  { path: 'about', component: AboutComponent, data: { title: 'about' }},

  // All other pages leads to error
  { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'}}, //Needs to be last since it will match every url
  { path: 'error', component: PageNotFoundComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
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
    AdministratorModule,
    RespondentModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
