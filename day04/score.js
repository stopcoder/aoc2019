import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import permutation from "./permutation.js";

const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;
const filename = "input";

/*
const arr = [1, 2, 3, 4, 5];
const que = new PriorityQueue(
    // initialize the incoming arr, the complexity of doing so is O(n)
    arr,
    // this will create a small root heap, the default is a large root heap
    (x, y) => x - y
);
console.log(que.pop());
*/

/*
const graph = {
	a: {b: 10, c: 100, d: 1},
	b: {c: 10},
	d: {b: 1, e: 1},
	e: {f: 1},
	f: {c: 1},
	g: {b: 1}
};
// All paths from 'a'
const paths = single_source_shortest_paths(graph, 'a');
console.log(paths);
*/

async function processLineByLine() {
	const input = "273025-767253";
	const range = input.split("-").map((s) => parseInt(s));

	let count = 0;
	for (let num = range[0]; num < range[1]; num++) {
		const digits = (num + "").split("").map((c) => parseInt(c));

		let repeat = false;
		let increase = true;


		for (let i = 0; i < digits.length - 1; i++) {
			if (digits[i + 1] < digits[i]) {
				increase = false;
			}
			if (digits[i + 1] === digits[i]) {
				repeat = true;
			}

			if (!increase) {
				break;
			}
		}

		if (repeat && increase) {
			count++;
		}
	}

	console.log(count);
}

processLineByLine();
