import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./features/layout/layout.component";

const routes: Routes = [
  {path:'', pathMatch:'full', component: LayoutComponent},
  {path: 'layout', component: LayoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
