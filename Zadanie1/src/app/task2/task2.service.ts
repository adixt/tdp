import {Injectable} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';


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


  private static reduceMatrix(data: Array<number[]>): Array<number[]> {
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

              // take the column
              let column: number[] = data.map((value) => {
                return value[i];
              });
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
    console.log(minArray);
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

    console.log(maxArray);
    let minMax = Math.min(...maxArray);

    return maxMin === minMax;
  }

  public resolve(data: Array<number[]>) {
    let isSaddlePoint = Task2Service.isSaddlePoint(data);
    alert('isSaddlePoint: ' + isSaddlePoint);
    if (!isSaddlePoint) {
      data = Task2Service.reduceMatrix(data);
    }
    return data;
  }

}
