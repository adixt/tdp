import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Task1Component} from "./task1.component";
import {MatButtonModule, MatDialogModule, MatIconModule, MatTableModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Task1Service} from "./task1.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    FormsModule,
  ],
  declarations: [
    Task1Component],
  providers: [Task1Service],
  exports: [Task1Component]
})
export class Task1Module {
}
