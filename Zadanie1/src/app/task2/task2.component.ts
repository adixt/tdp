import {Component, OnInit} from '@angular/core';
import {Task2Service} from './task2.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit {
  public get data(): Array<number[]> {
    return this.task2Service.getData;
  }

  constructor(private task2Service: Task2Service) {
  }

  public resolve() {
    this.task2Service.resolve(this.data);
  }

  ngOnInit() {
  }

}
