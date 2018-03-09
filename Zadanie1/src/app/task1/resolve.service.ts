import {Injectable} from "@angular/core";

@Injectable()
export class ResolveService {
  public static kryteriumOptymistyczne(data: number[][]): number {
    let arrayNumber: number = null;
    let minimaxValue: number = null;
    let maxValue: number = null;

    for (let i = 0; i < data.length; i++) {
      maxValue = Math.max(...data[i]);
      if (maxValue > minimaxValue) {
        arrayNumber = i;
        minimaxValue = maxValue;
      }
    }
    return arrayNumber;
  }

  public static kryteriumWalda(data: number[][]): number {
    let arrayNumber: number = null;
    let minimaxValue: number = null;
    let minValue: number = null;

    for (let i = 0, matrixLength = data.length; i < matrixLength; i++) {
      minValue = Math.min(...data[i]);
      if (minValue > minimaxValue) {
        arrayNumber = i;
        minimaxValue = minValue;
      }
    }
    return arrayNumber;
  }

  public static kryteriumHurwicza(data: number[][], carefullLvl: number): number {
    let arrayNumber: number = null;
    let value: number = null;
    let tmpValue: number = null;
    for (let i = 0, matrixLength = data.length; i < matrixLength; i++) {
      tmpValue = (Math.min(...data[i]) * carefullLvl) + (Math.max(...data[i]) * (1 - carefullLvl));
      if (tmpValue > value) {
        arrayNumber = i;
        value = tmpValue;
      }
    }
    return arrayNumber;
  }

  public static kryteriumBayesaLaplacea(data: number[][]): number {
    let arrayNumber: number = null;
    let value: number = null;
    let tmpValue: number = null;
    for (let i = 0, matrixLength = data.length; i < matrixLength; i++) {
      for (let j = 0, arrayLength = data[i].length; j < arrayLength; j++) {
        tmpValue = tmpValue + data[i][j] * (1 / (j + 2));
      }
      if (tmpValue > value) {
        arrayNumber = i;
        value = tmpValue;
      }
      tmpValue = null;
    }
    return arrayNumber;
  }

  public static kryteriumSavagea(data: number[][]): number {
    let result = null,
      maxFromArray = Object.assign([], data[0]),
      resultArray = new Array(data.length);
    let ResultConstructor = function () {
      this.arrayNumber = null;
      this.value = null;
    };

    // cuz fill() method make copy of obj :C
    // resultArray.fill(new ResultConstructor());
    for (let i = 0, length = resultArray.length; i < length; i++) {
      resultArray[i] = new ResultConstructor();
    }


    // finding the max value from col
    for (let i = 0, matrixLength = data.length; i < matrixLength; i++) {
      for (let j = 0, arrayLength = data[i].length; j < arrayLength; j++) {
        maxFromArray[j] = maxFromArray[j] < data[i][j] ? data[i][j] : maxFromArray[j];
      }
    }
    // finding the resultArray
    for (let i = 0, matrixLength = data.length; i < matrixLength; i++) {
      for (let j = 0, arrayLength = data[i].length; j < arrayLength; j++) {
        if (resultArray[i].value < maxFromArray[j] - data[i][j]) {
          resultArray[i].value = maxFromArray[j] - data[i][j];
          resultArray[i].arrayNumber = i;
        }
      }
    }
    // searching for the answer!
    for (let i = 0, arrayLength = resultArray.length; i < arrayLength; i++) {
      result = resultArray[i].value > result ? resultArray[i] : result;
    }
    return result.arrayNumber;
  }

}
