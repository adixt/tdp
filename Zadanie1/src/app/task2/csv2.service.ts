import {Injectable} from '@angular/core';
import {IInvestingCasesWithValues} from '../task1/task1.models';

@Injectable()
export class Csv2Service {

  constructor() {
  }

  public parseOpenedCsvFile(content: string): Array<number[]> {
    let matrixOfNumbers: Array<number[]> = [];
    let stringLines = content.split("\r\n");
    for (let i = 0; i < stringLines.length; i++) {
      let parsedNumericLine = stringLines[i]
        .split(",")
        .map((item: string) => {
          return Number(item);
        });
      matrixOfNumbers.push(parsedNumericLine);
    }
    return matrixOfNumbers;
  }
}
