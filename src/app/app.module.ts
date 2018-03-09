import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {Task1Module} from "./task1/task1.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Task1Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
