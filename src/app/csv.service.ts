import {Injectable} from '@angular/core';
import {IInvestingCasesWithValues} from "./task1/task1.models";

@Injectable()
export class CsvService {

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


  public getInvestingCasesFromCSV(content: string): IInvestingCasesWithValues {
    let data: Array<number[]> = this.parseOpenedCsvFile(content);
    let investingCasesWithValues: IInvestingCasesWithValues = {cases: [], data: []};
    debugger;
    for (let i = 0; i < data.length; i++) {
      investingCasesWithValues.cases[i] = data[i][0];
      investingCasesWithValues.data[i] = data[i];
      investingCasesWithValues.data[i].splice(0, 1);
    }
    return investingCasesWithValues;
  }
}
