
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Task1Component} from './task1.component';

const routes: Routes = [
  {
    path: '',
    component: Task1Component
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Task1RoutingModule { }
