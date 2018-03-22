import {Component, OnInit, ViewChild} from '@angular/core';
import {Task2Service} from './task2.service';
import {IInvestingCasesWithValues} from '../task1/task1.models';
import {CsvService} from '../csv.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component {
  public get isAnswerVisible() {
    return this.task2Service.answerA != null ;
  }


  @ViewChild('myInput') myInputVariable: any;

  public get data(): Array<number[]> {
    return this.task2Service.getData;
  }

  public get answerA() {
    return JSON.stringify(this.task2Service.answerA, null, 2);
  }

  public get answerB() {
    return JSON.stringify(this.task2Service.answerB, null, 2);
  }

  public get winSizeA() {
    return this.task2Service.winSizeA;
  }

  public get winSizeB() {
    return this.task2Service.winSizeB;
  }

  constructor(private task2Service: Task2Service, private csvService: CsvService) {
  }

  public changeListener(event) {
    if (!event.target.files || event.target.files[0].length < 1) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (e: any) => {
      let content: string = e.target.result;
      let data = this.csvService.parseOpenedCsvFile(content);
      this.task2Service.setData = data;
      this.myInputVariable.nativeElement.value = "";

    };
    reader.readAsText(event.target.files[0]);
  }

  public resolve() {
    this.task2Service.resolve(this.data);
  }

}
