import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { DemoService } from './services/demo.service';
import { InfoComponent } from './components/info/info.component';
import { NavComponent } from './components/core/nav/nav.component';
import { QuestionairesComponent } from './components/management/questionaires.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { QListComponent } from './components/q-list/q-list.component';
import { CardComponent } from './components/card/card.component';
import { IndexComponent } from './index/index.component';
import { ViewQuestionnaireComponent } from './components/view-questionnaire/view-questionnaire.component';

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
];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    InfoComponent,
    NavComponent,
    QuestionairesComponent,
    PageNotFoundComponent,
    QListComponent,
    CardComponent,
    IndexComponent,
    ViewQuestionnaireComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
