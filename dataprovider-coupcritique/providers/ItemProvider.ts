import AbstractProvider from "./AbstractProvider";
import {Item as ItemShowdown} from "../../sim/dex-items";
import Util from "../util";
import {Item} from "../interfaces/providers";
export default class ItemProvider extends AbstractProvider<Item> {
	private readonly itemsCollection: Item[] = [];

	constructor(protected readonly dex: ModdedDex, protected readonly lastGen: number) {
		super(dex, lastGen);
		this.itemsCollection = Util.range(1, lastGen).map((gen) => ({
			name: "No Item",
			usageName: "noitem",
			description: "Pas d'objet tenu",
			gen,
		}));
	}

	private makeObject(rawItem: ItemShowdown): Item {
		return {
			usageName: rawItem.id,
			name: rawItem.name,
			description: rawItem.desc,
			gen: rawItem.gen,
		};
	}

	jsonOutputFileName(): string {
		return "items.json";
	}

	provideData(): Item[] {
		for (let gen = 1; gen <= this.lastGen; gen++) {
			const itemsFromShowdown = this.getItemsFromShowdown(gen);
			for (const itemFromShowdown of itemsFromShowdown) {
				this.itemsCollection.push(this.makeObject(itemFromShowdown));
			}
		}
		return this.itemsCollection;
	}

	private getItemsFromShowdown(gen: number): readonly ItemShowdown[] {
		return this.dex.mod(`gen${gen}`).items.all().filter((rawItem) => this.validItem(rawItem, gen));
	}

	private validItem(rawItem: ItemShowdown, gen: number): boolean {
		return Util.isStandard(rawItem, gen, rawItem.num > 0) && rawItem.name !== "No Item" && !/TR\d+/.test(rawItem.name);
	}
}
