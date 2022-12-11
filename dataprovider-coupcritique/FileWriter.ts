import AbstractProvider from "./providers/AbstractProvider";
import * as fs from "fs";

export default class FileWriter<T> {
	public constructor(private destination: string, private provider: AbstractProvider<T>) {
	}


	public writeFile(): void {
		fs.writeFileSync(`${this.destination}/${this.provider.jsonOutputFileName()}`, JSON.stringify(this.provider.provideData()));
	}
}
