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
	const fileStream = fs.createReadStream(filename);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const lines = [];

	for await (const line of rl) {
		let r = 0, c = 0;
		const parts = [];
		line.split(",").forEach((s) => {
			const direction = s.substring(0, 1);
			const steps = parseInt(s.substring(1));

			if (direction === "R") {
				parts.push([r, [c, c + steps]]);
				c += steps;
			} else if (direction === "L") {
				parts.push([r, [c - steps, c]]);
				c -= steps;
			} else if (direction === "U") {
				parts.push([[r, r + steps], c]);
				r += steps;
			} else if (direction === "D") {
				parts.push([[r - steps, r], c]);
				r -= steps;
			}
		});

		lines.push(parts);
	}

	const intersections = [];

	for (let i = 0; i < lines[0].length; i++) {
		const part1 = lines[0][i];
		for (let j = 0; j < lines[1].length; j++) {
			const part2 = lines[1][j];
			if (Array.isArray(part1[0]) && !Array.isArray(part2[0])) {
				if (part2[0] >= part1[0][0] && part2[0] <= part1[0][1]
					&& part1[1] >= part2[1][0] && part1[1] <= part2[1][1]) {
					intersections.push([part2[0], part1[1]]);
				}
			} else if (!Array.isArray(part1[0]) && Array.isArray(part2[0])) {
				if (part1[0] >= part2[0][0] && part1[0] <= part2[0][1]
					&& part2[1] >= part1[1][0] && part2[1] <= part1[1][1]) {
					intersections.push([part1[0], part2[1]]);
				}
			}
		}
	}

	console.log(intersections);

	let min = Number.MAX_SAFE_INTEGER;
	for (const [r, c] of intersections) {
		min = Math.min(min, Math.abs(r) + Math.abs(c));
	}

	console.log(min);
}

processLineByLine();
