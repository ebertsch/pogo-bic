import { sortBy, prop, findIndex, propEq } from 'ramda';
const tdo = prop('TDO');
const rank = prop('rank');
const matchPokemonId = propEq('id');

export const sortByTDO = sortBy(tdo);
export const sortByRank = sortBy(rank);
export const getPositionById = <T extends { id: number }>(pokemonId: number, data: T[]) => findIndex(matchPokemonId(pokemonId), data);

export const capitalize = (value: string) => {
    return typeof value !== 'string' ? '' : value.charAt(0).toUpperCase() + value.slice(1)
  }