import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {Task1Module} from "./task1/task1.module";
import {Task2Module} from './task2/task2.module';
import {CsvService} from './csv.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Task1Module,
    Task2Module
  ],
  providers: [CsvService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
