import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { DemoService } from './services/demo.service';
import { InfoComponent } from './components/info/info.component';
import { NavComponent } from './components/core/nav/nav.component';

const appRoutes: Routes = [
  { path: 'info', component: InfoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    InfoComponent,
    NavComponent
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
