import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from "@angular/material/input";
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALH-QMkp5mwRUbHY00m66i3aF5ZD3V5Vg'
    }),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
