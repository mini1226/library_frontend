import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AllBooksComponent } from './all-books/all-books.component';
import { CreateBooksComponent } from './create-books/create-books.component';
import { AllAuthoursComponent } from './all-authours/all-authours.component';
import { CreateAuthoursComponent } from './create-authours/create-authours.component';
import { UpdateBooksComponent } from './update-books/update-books.component';
import { UpdateAuthoursComponent } from './update-authours/update-authours.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    AllBooksComponent,
    CreateBooksComponent,
    AllAuthoursComponent,
    CreateAuthoursComponent,
    UpdateBooksComponent,
    UpdateAuthoursComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
