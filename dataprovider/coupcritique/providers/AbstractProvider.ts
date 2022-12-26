import {ModdedDex} from "../../../sim/dex";

export default abstract class AbstractProvider<T> {
	public constructor(protected readonly dex:ModdedDex, protected readonly lastGen:number) {

	}

	public abstract provideData(): T[];
	public abstract jsonOutputFileName(): string;
}
