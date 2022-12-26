import AbstractProvider from "./AbstractProvider";
import {Nature} from "../interfaces/providers";
import {Nature as NatureShowdown} from "../../../sim/dex-data";

export default class NatureProvider extends AbstractProvider<Nature> {
	private makeObject(rawNature: NatureShowdown): Nature {
		const nature: Nature = {name: rawNature.name, usageName: rawNature.id};
		if (rawNature.minus) {
			nature[rawNature.minus] = -1;
		}
		if (rawNature.plus) {
			nature[rawNature.plus] = 1;
		}

		return nature;
	}


	jsonOutputFileName(): string {
		return "natures.json";
	}

	provideData(): Nature[] {
		return this.dex.natures.all().map((nature) => this.makeObject(nature));
	}

	private getNaturesFromShowdown(): readonly NatureShowdown[] {
		return this.dex.natures.all();
	}
}
