import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title = "Angular World";
  public subtitle = "Teoria podejmowania decyzji";
  public authors = "Adam Dziomdziora & Rafał Matuszewski";
  public date = "Sobota, 10:30";
}
