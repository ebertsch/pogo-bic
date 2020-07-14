import { PokemonWithMoveset } from './pokemon-with-moveset';
import { PrimalType } from './primal-type';

export type BestPerTypeRanking = {
    rank: number;
    type: PrimalType;
    pokemon: PokemonWithMoveset;
}