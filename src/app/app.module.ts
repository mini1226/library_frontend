import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './features/layout/layout.component';
import { SidebarComponent } from './features/shared/sidebar/sidebar.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { AllAuthorsComponent } from './features/all-authors/all-authors.component';
import { CreateAuthorsComponent } from './features/create-authors/create-authors.component';
import { CreateBooksComponent } from './features/create-books/create-books.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from './features/about/about.component';
import { ViewBooksComponent } from './features/view-books/view-books.component';
import { ViewAuthorsComponent } from './features/view-authors/view-authors.component';
import { UpdateBooksComponent } from './features/update-books/update-books.component';
import { UpdateAuthorsComponent } from './features/update-authors/update-authors.component';
import {AlertModule} from "ngx-alerts";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    AllAuthorsComponent,
    CreateAuthorsComponent,
    CreateBooksComponent,
    AboutComponent,
    ViewBooksComponent,
    ViewAuthorsComponent,
    UpdateBooksComponent,
    UpdateAuthorsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top'}),

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
