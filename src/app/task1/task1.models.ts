export interface IInvestingCasesWithValues {
  cases: number[];
  data: Array<number[]>;
}

export enum AlgorithmEnums {
  Optimistic = 1,
  Walds = 2,
  Hurvic = 3,
  Laplaces = 4,
  Savages = 5

}
