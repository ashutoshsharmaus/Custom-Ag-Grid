import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgAdvanceGridComponent } from './ns-ag-library/ng-advance-grid/ng-advance-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NgAdvanceGridComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
