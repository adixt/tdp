import {Component, OnInit} from '@angular/core';
import {Task2Service} from './task2.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component {
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

  constructor(private task2Service: Task2Service) {
  }

  public resolve() {
    this.task2Service.resolve(this.data);
  }

}
