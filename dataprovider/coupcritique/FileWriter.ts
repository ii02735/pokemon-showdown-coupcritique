import AbstractProvider from "./providers/AbstractProvider";
import * as fs from "fs";

export default class FileWriter {
	public constructor(private destination: string) {
	}


	public writeFile<T>(provider: AbstractProvider<T>): void {
		fs.writeFileSync(`${this.destination}/${provider.jsonOutputFileName()}`, JSON.stringify(provider.provideData()));
	}
}
