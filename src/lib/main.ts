/* tslint:disable:no-expression-statement no-if-statement no-let*/
import { Direction } from 'generate-maze-ts';
import {
  createFinder,
  createRoom,
  exploredMapToMaze,
  mazeToStrings,
  p2d,
  Result,
  sumDeltas,
  tryMoveFinder,
} from 'smartpathfinders';

const keypress = require('keypress');

const finder = createFinder({ id: 0 });
let room = createRoom(10, [{ finder, position: { x: 0, y: 0 } }], 'myseed');
let result: Result;

console.log(mazeToStrings(room.maze, room.positions).join('\n'));
console.log();
console.log(finder.exploredMap);

keypress(process.stdin);

function move(direction: Direction): void {
  [result, room] = tryMoveFinder(room, room.finders[0], direction);

  console.log(mazeToStrings(room.maze, room.positions).join('\n'));
  console.log(result);

  const knownBoxes = room.finders[0].exploredMap.reduce(
    (acc, val) => acc + val.reduce((acc2, val2) => acc2 + (val2 ? 1 : 0), 0),
    0
  );
  console.log({ knownBoxes });
  // console.log(exploredMapToStrings(room.finders[0].exploredMap).join('\n'));
  console.log(
    mazeToStrings(
      exploredMapToMaze(
        room.finders[0].exploredMap,
        sumDeltas(room.finders[0].exploredMapOffset, p2d(room.positions[0])),
        room.maze
      )
    ).join('\n')
  );
}

process.stdin.on(
  'keypress',
  (
    _,
    key: {
      name: string;
      ctrl: boolean;
      meta: boolean;
      shift: boolean;
      sequence: string;
      code: string;
    }
  ) => {
    if (key && key.ctrl && key.name === 'c') process.stdin.pause();

    switch (key.name) {
      case 'up':
        move(Direction.top);
        break;
      case 'right':
        move(Direction.right);
        break;
      case 'down':
        move(Direction.bottom);
        break;
      case 'left':
        move(Direction.left);
        break;
    }
  }
);

if (process.stdin.setRawMode) process.stdin.setRawMode(true);
process.stdin.resume();

export default 0;
