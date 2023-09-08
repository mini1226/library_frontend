import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./features/layout/layout.component";
import {AllAuthorsComponent} from "./features/all-authors/all-authors.component";
import {CreateBooksComponent} from "./features/create-books/create-books.component";
import {CreateAuthorsComponent} from "./features/create-authors/create-authors.component";
import {AboutComponent} from "./features/about/about.component";
import {UpdateBooksComponent} from "./features/update-books/update-books.component";
import {UpdateAuthorsComponent} from "./features/update-authors/update-authors.component";
import {ViewAuthorsComponent} from "./features/view-authors/view-authors.component";
import {ViewBooksComponent} from "./features/view-books/view-books.component";

const routes: Routes = [
  {path:'', pathMatch:'full', component: LayoutComponent},
  {path: 'all-books', component: LayoutComponent},
  {path: 'create-books', component: CreateBooksComponent},
  {path: 'about', component: AboutComponent},
  {path: 'update-books', component: UpdateBooksComponent},
  {path: 'all-authors', component: AllAuthorsComponent},
  {path: 'create-authors', component: CreateAuthorsComponent},
  {path: 'update-authors', component: UpdateAuthorsComponent},
  {path: 'view-authors', component: ViewAuthorsComponent},
  {path: 'view-books', component: ViewBooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
