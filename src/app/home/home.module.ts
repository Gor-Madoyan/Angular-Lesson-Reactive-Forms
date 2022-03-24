import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {AutheticationModule} from "../authentication/authetication.module";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class HomeModule { }
