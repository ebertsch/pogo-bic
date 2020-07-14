import { PrimalType } from './primal-type';

export interface PokemonSpecies {
  id: number;
  name: string;
  form: string;
  moveTypes: PrimalType[];
}
