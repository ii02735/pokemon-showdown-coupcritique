/**
 * Those interfaces represent the data structure
 * that will be used for coupcritique database
 */
export interface Pokemon {
	pokedex: number;
	usageName: string;
	name: string;
	type_1: string;
	type_2?: string;
	hp: number;
	def: number;
	atk: number;
	spa: number;
	spd: number;
	spe: number;
	weight: number;
	baseForm?: string;
	prevo?: string;
	ability_1?: string;
	ability_2?: string;
	ability_hidden?: string;
	gen: number;
}

export interface Ability {
	usageName: string,
	name: string,
	gen: number
}

export interface Item {
	usageName: string,
	name: string,
	description: string,
	gen: number
}

export interface Move {
	usageName: string;
	name: string;
	category: string;
	description: string;
	shortDescription: string;
	power: number;
	pp: number;
	accuracy: number|boolean; // boolean in case of status move
	type: string;
	gen: number;
}

export interface Nature {
	name: string;
	usageName: string;
	atk?: number;
	def?: number;
	spa?: number;
	spe?: number;
	spd?: number;
}
