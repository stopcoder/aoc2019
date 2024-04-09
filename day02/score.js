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

	let numbers;

	for await (const line of rl) {
		numbers = line.split(",").map((c) => parseInt(c));
	}

	numbers[1] = 12;
	numbers[2] = 2;

	console.log(numbers);

	let pos = 0;

	while (numbers[pos] !== 99) {
		if (numbers[pos] === 1) {
			numbers[numbers[pos + 3]] = numbers[numbers[pos + 1]] + numbers[numbers[pos + 2]];
		} else if (numbers[pos] === 2) {
			numbers[numbers[pos + 3]] = numbers[numbers[pos + 1]] * numbers[numbers[pos + 2]];
		} else {
			console.error("should not happen");
		}
		pos += 4;
	}

	console.log(numbers[0]);
}

processLineByLine();
