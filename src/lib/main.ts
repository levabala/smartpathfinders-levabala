import { generate } from 'generate-maze-ts';
import { printMaze } from 'smartpathfinders';

const maze1 = generate(10, 10);

const lines = printMaze(maze1);
const str = lines.join('\n');

console.log(str);

export default 11;
