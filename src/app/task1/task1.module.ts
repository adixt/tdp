import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Task1Component} from "./task1.component";
import {MatButtonModule, MatDialogModule, MatIconModule, MatTableModule} from "@angular/material";
import {Task1Service} from "./task1.service";
import {FormsModule} from "@angular/forms";
import {Task1RoutingModule} from './task1-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
    Task1RoutingModule
  ],
  declarations: [
    Task1Component],
  providers: [Task1Service],
  exports: [Task1Component]
})
export class Task1Module {
}
