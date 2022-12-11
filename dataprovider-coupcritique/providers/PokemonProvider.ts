import AbstractProvider from "./AbstractProvider";
import {Pokemon} from "../interfaces/providers";
import Util from "../util";
import {Species as PokemonShowdown, SpeciesAbility as AbilityShowdown} from "../../sim/dex-species";

export default class PokemonProvider extends AbstractProvider<Pokemon> {
	private readonly pokemonCollection: Pokemon[] = [];

	private makeObject(rawPokemon: PokemonShowdown, gen: number): Pokemon {
		this.cleaningAbilities(rawPokemon.abilities, gen);

		return {
			pokedex: rawPokemon.num,
			usageName: rawPokemon.id,
			name: rawPokemon.name,
			type_1: rawPokemon.types[0],
			type_2: rawPokemon.types[1] ?? undefined,
			...rawPokemon.baseStats,
			weight: rawPokemon.weighthg,
			baseForm: rawPokemon.changesFrom ?? (rawPokemon.baseSpecies !== rawPokemon.name && rawPokemon.baseSpecies.length > 0 ? rawPokemon.baseSpecies : undefined),
			ability_1: rawPokemon.abilities["0"],
			ability_2: rawPokemon.abilities["1"] || rawPokemon.abilities["S"],
			ability_hidden: rawPokemon.abilities["H"],
			gen,
		};
	}

	jsonOutputFileName(): string {
		return "pokemons.json";
	}

	provideData(): Pokemon[] {
		for (let gen = 1; gen <= this.lastGen; gen++) {
			const pokemonsFromShowdown: PokemonShowdown[] = this.getPokemonFromShowdown(gen);

			for (const pokemonFromShowdown of pokemonsFromShowdown) {
				this.pokemonCollection.push(this.makeObject(pokemonFromShowdown, gen));
				this.addCosmeticFormes(pokemonFromShowdown, gen);
			}
		}

		return this.pokemonCollection;
	}

	/**
	 * Sometimes abilities are not put in the pokemon's data with the correct gen
	 */
	private cleaningAbilities(abilitiesFromPokemon: AbilityShowdown, gen: number): void {
		if (gen < 5) {
			delete abilitiesFromPokemon["H"];
		}
		if (gen < 3) {
			delete abilitiesFromPokemon["0"];
			delete abilitiesFromPokemon["1"];
		}
		for (const abilityClassifier of ["0", "1", "H", "S"]) {
			const index = abilityClassifier as keyof AbilityShowdown;
			if (!(abilityClassifier in abilitiesFromPokemon)) {
				delete abilitiesFromPokemon[index];
				continue;
			}
			const abilityFromShowdown: Ability = this.dex.mod(`gen${gen}`).abilities.get(abilitiesFromPokemon[index]);
			if (!abilityFromShowdown.exists) {
				delete abilitiesFromPokemon[index];
			}
		}
	}

	private validPokemon(rawPokemon: PokemonShowdown, gen: number): boolean {
		// Is existant Pokémon ? Is a non totem form outside 7th gen ?
		return rawPokemon.num > 0 && !(rawPokemon.forme && /.*Totem/.test(rawPokemon.forme) && gen !== 7);
	}

	private getPokemonFromShowdown(gen: number): PokemonShowdown[] {
		// Is existant Pokémon ? Is a non totem forme outside 7th gen ?
		return this.dex.mod(`gen${gen}`).species.all().filter((rawPokemon) => Util.isStandard(rawPokemon, gen, this.validPokemon(rawPokemon, gen)));
	}

	private addCosmeticFormes(rawPokemon: PokemonShowdown, gen: number): void {
		if (rawPokemon.cosmeticFormes) {
			rawPokemon.cosmeticFormes.forEach((cosmeticFormName) =>
				this.pokemonCollection.push(this.makeObject(this.dex.mod(`gen${gen}`).species.get(cosmeticFormName), gen)));
		}
	}
}
