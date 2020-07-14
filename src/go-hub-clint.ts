import got from "got/dist/source";
import {
  PokemonSpecies,
  MoveType,
  PrimalType,
  PokemonWithMoveset,
  BestPerTypeRanking,
} from "./models";
import { find, propEq, uniq, reduce, append, both, reverse, map } from "ramda";
import { sortByTDO, getPositionById } from "./utlities";

export class GoHubClient {
  async getPokemon(pokemonSpecies: string, form: string) {
    const pokemonResults = await got(
      `https://db.pokemongohub.net/api/pokemon/with-filter/minimal-identifiers/${pokemonSpecies}`
    ).json<PokemonSpecies[]>();
    const results = find(
      both(propEq("name", pokemonSpecies), propEq("form", form||null)),
      pokemonResults
    );

    return results;
  }

  async getPokemonMoveTypes(pokemon: PokemonSpecies) {
    const moves = await got(
      `https://db.pokemongohub.net/api/moves/with-pokemon/${pokemon.id}?form=${pokemon.form||''}`
    ).json<MoveType[]>();
    const moveTypes = uniq(
      reduce<MoveType, PrimalType[]>((a, c) => append(c.type, a), [], moves)
    );

    return moveTypes;
  }

  private async getBestPerType(type: PrimalType) {
    const bestPerTypeResults = reverse(
      sortByTDO(
        await got(
          `https://db.pokemongohub.net/api/calculator/best-per-type/${type}`
        ).json<PokemonWithMoveset[]>()
      )
    );
    return bestPerTypeResults;
  }

  async getPokemonTypeRatings(pokemon: PokemonSpecies) {
    const rankings = await Promise.all(
        map(async (type: PrimalType) => {
          const bestPerTypeResults = await this.getBestPerType(type)
          const rank = getPositionById(pokemon.id, bestPerTypeResults);
          return <BestPerTypeRanking>{
            rank: rank + 1,
            type,
            pokemon: bestPerTypeResults[rank],
          };
        }, pokemon.moveTypes)
      );
    
      return rankings;
  }
}
