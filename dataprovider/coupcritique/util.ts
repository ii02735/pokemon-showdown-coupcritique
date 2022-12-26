import {BasicEffect} from "../../sim/dex-data";

export default class Util {
	public static isStandard(object: BasicEffect, gen: number|null = null, otherCondition = true): boolean {
		return otherCondition && !object?.isNonstandard ||
			object.isNonstandard === "Gigantamax" || // Keep Gmax forms
			object.isNonstandard === "Unobtainable" ||
			(!!gen && gen === 9 && (object.isNonstandard === "Past" || object.isNonstandard === "Future"));
	}

	public static range(start: number, end: number): number[] {
		return Array(end - start + 1).fill(0).map((_, idx) => start + idx);
	}
}
