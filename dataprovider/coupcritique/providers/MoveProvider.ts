import AbstractProvider from "./AbstractProvider";
import {Move as MoveShowdown} from "../../../sim/dex-moves";
import Util from "../util";
import {Move} from "../interfaces/providers";
export default class MoveProvider extends AbstractProvider<Move> {
	private readonly moveCollection: Move[] = [];

	private makeObject(rawMove: MoveShowdown): Move {
		return {
			usageName: this.isHiddenPower(rawMove) ? `HiddenPower${rawMove.type}`.toLowerCase() : rawMove.id,
			power: rawMove.basePower,
			description: rawMove.desc,
			shortDescription: rawMove.shortDesc,
			accuracy: rawMove.accuracy,
			category: rawMove.category,
			gen: rawMove.gen,
			name: this.isHiddenPower(rawMove) ? `Hidden Power [${rawMove.type}]` : rawMove.name,
			pp: rawMove.pp,
			type: rawMove.type,
		};
	}

	jsonOutputFileName(): string {
		return "moves.json";
	}

	provideData(): Move[] {
		for (let gen = 1; gen <= this.lastGen; gen++) {
			const movesFromShowdown = this.getMovesFromShowdown(gen);
			for (const moveFromShowdown of movesFromShowdown) {
				this.moveCollection.push(this.makeObject(moveFromShowdown));
			}
		}
		return this.moveCollection;
	}

	private getMovesFromShowdown(gen: number): readonly MoveShowdown[] {
		return this.dex.mod(`gen${gen}`).moves.all().filter((rawMove) => this.validMove(rawMove, gen));
	}

	// More processing for exceptional cases
	private isHiddenPower(rawMove: MoveShowdown): boolean {
		return /Hidden Power (\w+)/.test(rawMove.name);
	}

	private validMove(rawMove: MoveShowdown, gen: number): boolean {
		return Util.isStandard(rawMove, gen, rawMove.num > 0);
	}
}
