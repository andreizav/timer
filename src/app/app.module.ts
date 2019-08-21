import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.cmp';
import { ListItemComponent } from './listItem/listItem.cmp';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AngularFontAwesomeModule ],
  declarations: [ AppComponent, ClockComponent, ListItemComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
