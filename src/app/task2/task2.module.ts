import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Task2Component} from './task2.component';
import {Task2Service} from './task2.service';
import {Task2RoutingModule} from './task2-routing.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    Task2RoutingModule
  ],
  declarations: [Task2Component],
  exports: [Task2Component],
  providers: [Task2Service]
})
export class Task2Module {
}
