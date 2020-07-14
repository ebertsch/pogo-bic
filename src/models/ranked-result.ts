import { PrimalType } from "./primal-type";

export interface RankedResult {
  name: string;
  form: PrimalType;
  type: PrimalType;
  rank: number;
  qm: string;
  qmType: PrimalType;
  cm: string;
  cmType: PrimalType;
}
