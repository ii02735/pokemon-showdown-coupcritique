import {Dex} from "../../sim";
import PokemonProvider from "./providers/PokemonProvider";
import FileWriter from "./FileWriter";
import MoveProvider from "./providers/MoveProvider";
import AbilityProvider from "./providers/AbilityProvider";
import ItemProvider from "./providers/ItemProvider";
import NatureProvider from "./providers/NatureProvider";

(function (): void {
	const dexInstance: ModdedDex = Dex;
	const LAST_GEN = 9;
	const outputDirectory = "./dataprovider/coupcritique/json";
	const writer = new FileWriter(outputDirectory);
	writer.writeFile(new PokemonProvider(dexInstance, LAST_GEN));
	writer.writeFile(new MoveProvider(dexInstance, LAST_GEN));
	writer.writeFile(new AbilityProvider(dexInstance, LAST_GEN));
	writer.writeFile(new ItemProvider(dexInstance, LAST_GEN));
	writer.writeFile(new NatureProvider(dexInstance, LAST_GEN));
})();
