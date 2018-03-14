import {Injectable} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {Task} from 'protractor/built/taskScheduler';
require('yasmij');

declare var YASMIJ: any;

@Injectable()
export class Task2Service {
  // private data: Array<number[]> = [
  //   [-4, 6, 6],
  //   [8, 3, 3],
  //   [-5, 4, 5]
  // ];

  // private data: Array<number[]> = [
  //   [1, 2, 2],
  //   [1, 1, 2],
  //   [1, 1, 1],
  //   [2, 1, 0]
  // ];

  private modulo = 0;

  private data: Array<number[]> = [
    [1, 1, 1, 2, 2],
    [2, 1, 1, 1, 2],
    [2, 2, 1, 1, 1],
    [2, 2, 2, 1, 0]
  ];

  public get getData(): Array<number[]> {
    return this.data;
  }

  public set setData(data: Array<number[]>) {
    if (data && data.length > 0 && data[0].length > 0) {
      this.data = data;
    }
  }

  constructor() {
  }


  private static reduceMatrix(dataToReduce: Array<number[]>): Array<number[]> {
    let data = JSON.parse(JSON.stringify(dataToReduce));
    let rowsToReduce: Set<number[]> = new Set();
    let columnIndexesToReduce: Set<number> = new Set();

    // find rows to reduce
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (i !== j) {
          let shouldBeReduced = false;
          for (let k = 0; k < data[j].length; k++) {
            // All k in [i][k] must be <= [j][k] and one must be <, so
            if (data[i][k] > data[j][k]) {
              break;
            }
            if (data[i][k] < data[j][k]) {
              shouldBeReduced = true;
            }
            if (k === data[j].length - 1 && shouldBeReduced) {
              rowsToReduce.add(data[i]);
            }
          }
        }
      }
    }

    // reduce rows
    rowsToReduce.forEach((val) => {
      let indexToRemove = data.indexOf(val);
      data.splice(indexToRemove, 1);
    });

    // find columns to reduce
    for (let i = 0; i < data[0].length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (i !== j) {
          let shouldBeReduced = false;
          for (let k = 0; k < data.length; k++) {
            // All k in [k][i] must be >= [j][k] and one must be >, so
            if (data[k][i] < data[k][j]) {
              break;
            }
            if (data[k][i] > data[k][j]) {
              shouldBeReduced = true;
            }
            if (k === data.length - 1 && shouldBeReduced) {
              columnIndexesToReduce.add(i);
            }
          }
        }
      }
    }

    // reduce columns
    for (let row of data) {
      let tmpColumnIndexesToReduce = Array.from(columnIndexesToReduce.values());
      for (let columnIndexToReduce of tmpColumnIndexesToReduce) {
        row.splice(columnIndexToReduce, 1);
        for (let i = 0; i < tmpColumnIndexesToReduce.length; i++) {
          // after removing smaller index, all others must be decreased
          if (columnIndexToReduce < tmpColumnIndexesToReduce[i]) {
            tmpColumnIndexesToReduce[i]--;
          }
        }
      }
    }


    return data;
  }

  private static isSaddlePoint(data: Array<number[]>): boolean {
    let minArray = [],
      maxArray = [];

    // from each row take min
    // then take Max from min values
    for (let row of data) {
      minArray.push(Math.min(...row));
    }

    let maxMin = Math.max(...minArray);

    // from each column take max
    // then take Min from max values
    let column = [];
    for (let i = 0; i < data[0].length; i++) {
      for (let row of data) {
        column.push(row[i]);
      }
      maxArray.push(Math.max(...column));
    }

    let minMax = Math.min(...maxArray);

    return maxMin === minMax;
  }

  private static findSmallestValueInData(data: Array<number[]>): number {
    let minValueInData = data[0][0];
    for (let row of data) {
      let tmp = Math.min(...row);
      if (tmp < minValueInData) {
        minValueInData = tmp;
      }
    }
    return minValueInData;
  }

  private static addModuloOfSmallestValueIfSmallerThanZero(dataToAdd: Array<number[]>): { data: Array<number[]>, moduloAdded: number } {
    let data = JSON.parse(JSON.stringify(dataToAdd));
    let minValueInData = Task2Service.findSmallestValueInData(data);
    if (minValueInData < 0) {
      minValueInData = Math.abs(minValueInData);
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          data[i][j] += minValueInData;
        }
      }
    }
    return {data: data, moduloAdded: minValueInData};
  }


  public resolve(data: Array<number[]>) {
    let isSaddlePoint = Task2Service.isSaddlePoint(data);
    if (!isSaddlePoint) {
      data = Task2Service.reduceMatrix(data);
      let dataWithModulo: { data: Array<number[]>, moduloAdded: number } = Task2Service.addModuloOfSmallestValueIfSmallerThanZero(data);
      this.setData = dataWithModulo.data;
      this.modulo = dataWithModulo.moduloAdded;
      let input = {
        type: "maximize",
        objective: "",
        constraints: []
      };

      let output = YASMIJ.solve(input);
    }
  }

}
