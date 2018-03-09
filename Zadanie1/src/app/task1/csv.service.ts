import { Injectable } from '@angular/core';
import {IInvestingCasesWithValues} from "./task1.models";

@Injectable()
export class CsvService {

  constructor() { }
  public parseOpenedCsvFile(content: string): IInvestingCasesWithValues {
    console.log("csv content", content);

    let investingCasesWithValues: IInvestingCasesWithValues = {cases: [], data: []};
    let stringLines = content.split("\r\n");

    for (let i = 0; i < stringLines.length; i++) {
      let parsedNumericLine = stringLines[i]
        .split(",")
        .map((item: string) => {
          return Number(item);
        });
      investingCasesWithValues.data.push(parsedNumericLine);
    }
    for (let i = 0; i < investingCasesWithValues.data.length; i++) {
      investingCasesWithValues.cases[i] = investingCasesWithValues.data[i][0];
      investingCasesWithValues.data[i].splice(0, 1);
    }
    return investingCasesWithValues;
  }
}
