import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AngularFontAwesomeModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
