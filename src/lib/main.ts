import { Direction } from 'generate-maze-ts';
import { usleep } from 'sleep';
import {
  createFinder,
  createRoom,
  FinderProcessor,
  mazeToStrings,
  random,
  runSimulation,
  WholeTickCallback,
} from 'smartpathfinders';

console.log('Start Simulation');

const finder1 = createFinder({ id: 0 });
const finder2 = createFinder({ id: 1 });
const finder3 = createFinder({ id: 2 });
const room = createRoom(20, 10, [
  { finder: finder1, position: { x: 3, y: 5 } },
  { finder: finder2, position: { x: 1, y: 2 } },
  { finder: finder3, position: { x: 4, y: 7 } }
]);

const map = [Direction.top, Direction.right, Direction.bottom, Direction.left];
const finderProcessor: FinderProcessor = (finder, tickIndex) => {
  console.log(
    `Tick #${tickIndex} [${finder.relativePosition.rx} ${finder.relativePosition.ry}]`
  );
  const direction = map[random(0, 4)];
  return direction;
};

const wholeTickCallback: WholeTickCallback = currentRoom => {
  console.log(
    mazeToStrings(
      currentRoom.maze,
      currentRoom.finishPoint,
      currentRoom.positions
    ).join('\n')
  );
  /* tslint:disable-next-line*/
  usleep(0.1 * 10 ** 6);
};

const simulationResult = runSimulation({
  finderProcessor,
  maxTicksCount: 50,
  room,
  wholeTickCallback
});

console.log(simulationResult);

export default 0;
