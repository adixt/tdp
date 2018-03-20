import {Injectable} from '@angular/core';
import * as YASMIJ from 'yasmij';

@Injectable()
export class Task2Service {
  // private data: Array<number[]> = [
  //   [-4, 6, 6],
  //   [8, 3, 3],
  //   [-5, 4, 5]
  // ];

  private data: Array<number[]> = [
    [0.2 , 0.3, 0.3],
    [0.5, 0.1, 0],
    [0.1, 0.2, 0.3]
  ];


  // private data: Array<number[]> = [
  //   [-1, 7],
  //   [435, 5],
  //   [5, 9]
  // ];


  // private data: Array<number[]> = [
  //   [1, 3, 5, 8],
  //   [-2, 4, 3, 5],
  //     [7, -1, 1, 0]
  // ];

  private modulo = 0;

  //  private data: Array<number[]> = [
  //   [1, 1, 1, 2, 2],
  //   [2, 1, 1, 1, 2],
  //   [2, 2, 1, 1, 1],
  //   [2, 2, 2, 1, 0]
  // ];

  public get getData(): Array<number[]> {
    return this.data;
  }

  public set setData(data: Array<number[]>) {
    if (data && data.length > 0 && data[0].length > 0) {
      this.data = data;
    }
  }

  public answerA = {};
  public answerB = {};
  public winSizeA: number;
  public winSizeB: number;

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

  private static isSaddlePoint(data: Array<number[]>) {
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

    return {isSaddlePoint: maxMin === minMax, minMax: minMax};
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

  private static calculateResponseForPlayerB(data: Array<number[]>, modulo: number) {
    let constraintsArray = [];

    for (let i = 0; i < data.length; i++) {
      let constraint = "";
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] !== 0) {
          if (j === data[i].length - 1) {
            constraint = constraint + data[i][j] + "y" + (j + 1);
          } else {
            constraint = constraint + data[i][j] + "y" + (j + 1) + " + ";
          }
        }
      }
      if (constraint[constraint.length - 2] === '+') {
        constraint = constraint.slice(0, -2);
      }
      constraint = constraint + " <= 1";
      // console.log(constraint);
      constraintsArray.push(constraint);
    }

    let objective = null;
    let varsInResp = [];
    for (let i = 0; i < data.length; i++) {
      varsInResp.push("y" + (i + 1));
      objective = objective ? objective + " + " + "y" + (i + 1) : "y1";
    }

    // console.log(constraintsArray);
    // console.log(objective);
    debugger;
    let input = {
      type: "maximize",
      objective: objective,
      constraints: constraintsArray
    };

    let output = YASMIJ.solve(input);
    // console.log('output' + JSON.stringify(output, null, 2));
    // console.log('output' + output);
    // console.log('varsInResp' + varsInResp);
    let tmp = 0;
    for (let x of varsInResp) {
      // console.log('res:' + output.result[x]);
      tmp += output.result[x] ? output.result[x] : 0;
    }
    // console.log('vraw' + 1 / tmp);
    let v = (Math.round((1 / tmp) * 100)) / 100;
    // console.log('vv:' + v);


    for (let x of varsInResp) {
      output.result[x] = output.result[x] * v;
      // console.log(output.result[x]);
    }
    // console.log(output.result);
    let playerB = output.result;
    let playerBV = v - modulo;

    return {answer: playerB, winSize: playerBV};
  }

  private static calculateResponseForPlayerA(data: Array<number[]>, modulo: number) {
    let constraintsArray2 = [];

    for (let i = 0, length = data[0].length; i < length; i++) {
      let tmpConstaraint2 = "";
      for (let j = 0, lengthInner = data.length; j < lengthInner; j++) {
        if (data[j][i] !== 0) {
          if (j === 0) {
            tmpConstaraint2 = tmpConstaraint2 + data[j][i] + "x1" + " + ";
          } else {
            if (j === lengthInner - 1) {
              tmpConstaraint2 = tmpConstaraint2 + data[j][i] + "x" + (j + 1);
            } else {
              tmpConstaraint2 = tmpConstaraint2 + data[j][i] + "x" + (j + 1) + " + ";
            }
          }
        }
      }

      if (tmpConstaraint2[tmpConstaraint2.length - 2] === '+') {
        tmpConstaraint2 = tmpConstaraint2.slice(0, -2);
      }
      tmpConstaraint2 = tmpConstaraint2 + " <= 1";
      // console.log(tmpConstaraint2);
      constraintsArray2.push(tmpConstaraint2);
    }

    let varsInResp2 = [];
    let objective2 = null;
    for (let i = 0, lengthInner = data[0].length; i < lengthInner; i++) {
      varsInResp2.push("x" + (i + 1));
      objective2 = objective2 ? objective2 + " + " + "x" + (i + 1) : "x1";
    }

    // console.log(constraintsArray2);
    // console.log(objective2);
    debugger;
    let input2 = {
      type: "minimize",
      objective: objective2,
      constraints: constraintsArray2
    };

    let output2 = YASMIJ.solve(input2);
    alert(output2);
    // console.log(JSON.stringify(output2, null, 2));
    // console.log(output2);
    // console.log(varsInResp2);
    let tmp = 0;
    for (let x of varsInResp2) {
      // console.log('res2' + output2.result[x]);
      tmp += output2.result[x] ? output2.result[x] : 0;
    }

    // console.log(1 / tmp);
    debugger;
    let v2 = (Math.round((1 / tmp) * 100)) / 100;
    // console.log('v2 ' + v2);


    for (let x of varsInResp2) {
      output2.result[x] = output2.result[x] * v2;
      // console.log(output2.result[x]);
    }

    return {answer: output2.result, winSize: v2 - modulo};
  }


  public resolve(data: Array<number[]>) {
    let saddleResult = Task2Service.isSaddlePoint(data);
    if (!saddleResult.isSaddlePoint) {

      let dataReducedWithModulo = Task2Service.addModuloOfSmallestValueIfSmallerThanZero(data);
      this.setData = dataReducedWithModulo.data;
      this.modulo = dataReducedWithModulo.moduloAdded;
      this.setData = Task2Service.reduceMatrix(this.getData);


      let responseB = Task2Service.calculateResponseForPlayerB(this.getData, this.modulo);
      let responseA = Task2Service.calculateResponseForPlayerA(this.getData, this.modulo);
      this.answerB = responseB.answer;
      this.winSizeB = responseB.winSize;
      this.answerA = responseA.answer;
      this.winSizeA = responseA.winSize;
    } else {
      this.answerB = 'SADDLE POINT!';
      this.winSizeB = saddleResult.minMax;
      this.answerA = 'SADDLE POINT!';
      this.winSizeA = saddleResult.minMax;
    }
  }

}
