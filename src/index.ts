import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import {
  PokemonSpecies,
  BestPerTypeRanking,
  RankedResult,
  CommandFlags,
} from "./models";
import {
  map,
  filter,
} from "ramda";
import { sortByRank, capitalize } from "./utlities";
import { GoHubClient } from "./go-hub-clint";

class PogoBic extends Command {
  static description =
    "Returns the best move set for a pokemon based upon its attack type options";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    form: flags.string({
      char: "f",
      description:
        "specifies a form for the given Pokemon.(Black, White, Armored, etc.)",
      exclusive: ["alolan", "galarian"],
      parse: capitalize,
    }),
    alolan: flags.boolean({
      char: "a",
      description: "use the Alolan form for the given Pokemon",
      exclusive: ["form", "galarian"],
    }),
    galarian: flags.boolean({
      char: "g",
      description: "use the Galarian form for the given Pokemon",
      exclusive: ["form", "alolan"],
    }),
  };

  static args = [{ name: "pokemon", required: true, parse: capitalize }];

  async run() {
    const { args, flags } = this.parse(PogoBic);
    const pokemonSpecies = args.pokemon;
    const form = this.getPokemonForm(flags);

    const { pokemon, typeRankings } = await this.fetchData(
      pokemonSpecies,
      form
    );
    const movesets = this.processRankings(typeRankings);

    this.displayRankings(pokemon, form, movesets);
  }

  private getPokemonFormString(species: string, form: string) {
    const formString = !!form ? ` (${form})` : "";
    return `${species}${formString}`;
  }

  private getPokemonForm(flags: CommandFlags) {
    if (flags.alolan) {
      return "Alola";
    } else if (flags.galarian) {
      return "Galarian";
    } else if (flags.form) {
      return flags.form;
    }
    return "";
  }

  private async fetchData(speciesName: any, form: string) {
    const client = new GoHubClient();
    cli.action.start("fetching data");

    const pokemon = await client.getPokemon(speciesName, form);

    if (!pokemon) {
      cli.action.stop(
        `Unable to find pokemon: ${this.getPokemonFormString(
          speciesName,
          form
        )}`
      );
      this.exit();
    }
    pokemon.moveTypes = await client.getPokemonMoveTypes(pokemon);

    const typeRankings = await client.getPokemonTypeRatings(pokemon);
    cli.action.stop();
    return { typeRankings, pokemon };
  }

  private processRankings(rankings: BestPerTypeRanking[]) {
    const cleanRankings = filter((a) => a.rank != 0, rankings);
    const bestMovesets = sortByRank(cleanRankings);
    const movesets = map<BestPerTypeRanking, RankedResult>(
      (a) => ({
        name: a.pokemon.name,
        form: a.pokemon.form,
        type: a.type,
        rank: a.rank,
        qm: a.pokemon.qm,
        qmType: a.pokemon.qm_type,
        cm: a.pokemon.cm,
        cmType: a.pokemon.cm_type,
      }),
      bestMovesets
    );
    return movesets;
  }

  private displayRankings(
    pokemon: PokemonSpecies,
    form: string,
    movesets: RankedResult[]
  ) {
    console.log(`Name: ${pokemon.name}`);

    if (!!form) {
      console.log(`Form: ${form}`);
    }

    if (!movesets || movesets.length === 0) {
      console.log("No moves determined to be best in class.");
    } else {
      cli.table(movesets, {
        rank: {
          minWidth: 7,
        },
        type: {
          minWidth: 10,
        },
        qm: {
          minWidth: 25,
          header: "Quick Move",
          get: (row: RankedResult) => `${row.qm} (${row.qmType})`,
        },
        cm: {
          minWidth: 25,
          header: "Charge Move",
          get: (row: RankedResult) => `${row.cm} (${row.cmType})`,
        },
      });
    }
  }
}

export = PogoBic;
