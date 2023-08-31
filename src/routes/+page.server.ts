import type { PageServerLoad } from './$types';

interface Item {
	name: string;
	description: string;
	colloq: string;
	plaintext: string;
	into: string[];
	image: {
		full: string;
		sprite: string;
		group: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
	gold: {
		base: number;
		purchasable: boolean;
		total: number;
		sell: number;
	};
	tags: string[];
	maps: {
		'11': boolean;
		'12': boolean;
		'21': boolean;
		'22': boolean;
		'30': boolean;
	};
	stats: {
		[key: string]: number;
	};
}

interface Tree {
	header: string;
	tags: string[];
}

export const load: PageServerLoad = async ({ params }) => {
	const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(
		(res) => res.json()
	);
	const version = versions[0];

	const items = await fetch(
		`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`
	).then((res) => res.json());

	const itemsArray = [];
	for (const key in items.data) {
		const item = items.data[key] as Item;
		if (item.gold.purchasable == false && item.gold.total == 0) continue;
		if (item.maps['30'] == true || item.maps['11'] == false) continue;
		if (key == '4403') {
			console.log(item);
		}
		item.image.full = `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
		itemsArray.push(item);
	}
	const filters = [];
	for (const key in items.tree) {
		const tree = items.tree[key] as Tree;
		filters.push(tree);
	}
	return {
		patch: version,
		items: itemsArray,
		filters: filters
	};
};
