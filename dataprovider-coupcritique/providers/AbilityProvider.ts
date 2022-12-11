import AbstractProvider from "./AbstractProvider";
import {Ability as AbilityShowdown} from "../../sim/dex-abilities";
import Util from "../util";
import {Ability} from "../interfaces/providers";
export default class AbilityProvider extends AbstractProvider<Ability> {
	private readonly abilityCollection: Ability[] = [];

	constructor(protected readonly dex: ModdedDex, protected readonly lastGen: number) {
		super(dex, lastGen);
		this.abilityCollection = Util.range(1, lastGen).map((gen) => ({
			name: "No Ability",
			usageName: "noability",
			gen,
		}));
	}

	private makeObject(rawAbility: AbilityShowdown): Ability {
		return {
			usageName: rawAbility.id,
			name: rawAbility.name,
			gen: rawAbility.gen,
		};
	}

	jsonOutputFileName(): string {
		return "abilities.json";
	}

	provideData(): Ability[] {
		for (let gen = 1; gen <= this.lastGen; gen++) {
			const abilitiesFromShowdown = this.getAbilitiesFromShowdown(gen);
			for (const abilityFromShowdown of abilitiesFromShowdown) {
				this.abilityCollection.push(this.makeObject(abilityFromShowdown));
			}
		}
		return this.abilityCollection;
	}

	private getAbilitiesFromShowdown(gen: number): readonly AbilityShowdown[] {
		return this.dex.mod(`gen${gen}`).abilities.all().filter((rawAbility) => this.validAbility(rawAbility, gen));
	}

	private validAbility(rawAbility: AbilityShowdown, gen: number): boolean {
		return Util.isStandard(rawAbility, gen, rawAbility.gen > 0);
	}
}
