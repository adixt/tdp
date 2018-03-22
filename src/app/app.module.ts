import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {Task1Module} from "./task1/task1.module";
import {Task2Module} from './task2/task2.module';
import {CsvService} from './csv.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routing } from './app.routing';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    routing
  ],
  providers: [CsvService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
