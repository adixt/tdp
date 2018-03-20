import {Injectable} from "@angular/core";


@Injectable()
export class Task1Service {
  private data: Array<number[]> = [
    [0.5, 0.6, 0.4, 0.5],
    [0.1, 0.7, 0.4, 0.7],
    [0.8, 0.2, 0.5, 0.5],
    [0.1, 0.8, 0.5, 0.7]];

  private cases: number[] = [50, 100, 150, 200];

  public correctArrayNumber = -1;

  constructor() {
  }

  public get getData(): Array<number[]> {
    return this.data;
  }

  public set setData(data: Array<number[]>) {
    if (data && data.length > 0 && data[0].length > 0) {
      this.data = data;
    }
  }

  public get getCases(): number[] {
    return this.cases;
  }

  public set setCases(cases: number[]) {
    if (cases && cases.length > 0) {
      this.cases = cases;
    }
  }



}
