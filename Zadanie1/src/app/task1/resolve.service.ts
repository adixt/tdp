import {Injectable} from "@angular/core";

export interface IResult {
  arrayNumber: number;
  value: number;
}

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

    for (let i = 0; i < data.length; i++) {
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

    for (let i = 0; i < data.length; i++) {
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
    
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
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
    let result: IResult = null;
    let maxFromColumnArray: number[] = Object.assign([], data[0]);
    let resultArray: IResult[] = [];

    // init empty structure for answers
    for (let i = 0; i < data.length; i++) {
      resultArray[i] = {arrayNumber: null, value: null};
    }

    // finding the max value from each column
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        maxFromColumnArray[j] = maxFromColumnArray[j] < data[i][j] ? data[i][j] : maxFromColumnArray[j];
      }
    }

    // finding the resultArray
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (resultArray[i].value < maxFromColumnArray[j] - data[i][j]) {
          resultArray[i].value = maxFromColumnArray[j] - data[i][j];
          resultArray[i].arrayNumber = i;
        }
      }
    }

    // searching for the min in resultArray
    for (let i = 0; i < resultArray.length; i++) {
      if (!result) {
        result = resultArray[i];
        continue;
      }

      result = resultArray[i].value < result.value ? resultArray[i] : result;
    }
    return result.arrayNumber;
  }

}
