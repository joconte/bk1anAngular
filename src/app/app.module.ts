import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  exports: [
  MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
