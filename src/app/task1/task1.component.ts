import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material";
import {Task1Service} from "./task1.service";
import {AlgorithmEnums, IInvestingCasesWithValues} from "./task1.models";
import {CsvService} from "../csv.service";
import {ResolveService} from "./resolve.service";

@Component({
  selector: "app-task1",
  templateUrl: "./task1.component.html",
  styleUrls: ["./task1.component.css"]
})
export class Task1Component {
  public isDataVisible = false;
  public isAnswerVisible = false;
  public isCarefullLvlVisible = false;
  public carefullLvl = 0.75;
  private usedAlgorithm: AlgorithmEnums = AlgorithmEnums.Optimistic;

  private get correctArrayNumber() {
    return this.task1Service.correctArrayNumber;
  }

  public get data(): Array<number[]> {
    return this.task1Service.getData;
  }

  public get cases(): number[] {
    return this.task1Service.getCases;
  }

  private getAlgorithmName(algorithms: AlgorithmEnums): string {
    switch (algorithms) {
      case AlgorithmEnums.Optimistic: {
        return "Optymistycznego";
      }
      case AlgorithmEnums.Walds: {
        return "Walda";
      }
      case AlgorithmEnums.Hurvic: {
        return "Hurwicza";
      }
      case AlgorithmEnums.Laplaces: {
        return "Pierre’a Simona de Laplace’a";
      }
      case AlgorithmEnums.Savages: {
        return "Savage'a";
      }
    }
  }

  public get getAnswer(): string {
    if (this.correctArrayNumber !== -1) {
      let algorythm = this.getAlgorithmName(this.usedAlgorithm);
      let variant = this.correctArrayNumber + 1;
      let value = this.cases[this.correctArrayNumber];
      let optimisticAnswer = `Z punktu widzenia kryterium ${algorythm}, ` +
        `najlepsza jest decyzja ${variant}, ` +
        `czyli wariant inwestycyjny o wysokośći ${value} tyś. zł.`;
      if (this.usedAlgorithm === AlgorithmEnums.Hurvic) {
        optimisticAnswer += ` Z użyciem współczynnika ostrożności ${this.carefullLvl}`;
      }
      this.isAnswerVisible = true;
      return optimisticAnswer;
    }
    this.isAnswerVisible = false;
    return null;
  }


  public toggleDataVisible() {
    this.isDataVisible = !this.isDataVisible;
  }

  constructor(private task1Service: Task1Service,
              private csvService: CsvService) {
  }

  public carefullLvlChanged(event) {
    this.isAnswerVisible = false;
  }

  public changeListener(event) {
    if (!event.target.files || event.target.files[0].length < 1) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (e: any) => {
      let content: string = e.target.result;
      let result: IInvestingCasesWithValues = this.csvService.getInvestingCasesFromCSV(content);
      this.task1Service.setData = result.data;
      this.task1Service.setCases = result.cases;
    };
    reader.readAsText(event.target.files[0]);
    this.isAnswerVisible = false;
  }

  public optimisticResolve() {
    this.isCarefullLvlVisible = false;
    this.task1Service.correctArrayNumber = ResolveService.kryteriumOptymistyczne(this.data);
    this.usedAlgorithm = AlgorithmEnums.Optimistic;
    this.isAnswerVisible = true;
  }

  public waldsResolve() {
    this.isCarefullLvlVisible = false;
    this.task1Service.correctArrayNumber = ResolveService.kryteriumWalda(this.data);
    this.usedAlgorithm = AlgorithmEnums.Walds;
    this.isAnswerVisible = true;
  }

  public hurvicResolve() {
    this.isCarefullLvlVisible = true;
    this.task1Service.correctArrayNumber = ResolveService.kryteriumHurwicza(this.data, this.carefullLvl);
    this.usedAlgorithm = AlgorithmEnums.Hurvic;
    this.isAnswerVisible = true;
  }

  public laplacesResolve() {
    this.isCarefullLvlVisible = false;
    this.task1Service.correctArrayNumber = ResolveService.kryteriumBayesaLaplacea(this.data);
    this.usedAlgorithm = AlgorithmEnums.Laplaces;
    this.isAnswerVisible = true;
  }

  public savagesResolve() {
    this.isCarefullLvlVisible = false;
    this.task1Service.correctArrayNumber = ResolveService.kryteriumSavagea(this.data);
    this.usedAlgorithm = AlgorithmEnums.Savages;
    this.isAnswerVisible = true;
  }


}
