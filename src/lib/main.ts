// importing dependencies
import { usleep } from 'sleep';
import { createFinder, createRoom, mazeToStrings, runSimulation, WholeTickCallback } from 'smartpathfinders';

import randomFinderProcessor from './finders/randomFinder';

// using console for simple string output
console.log('Start Simulation');

// finders creating
const finder1 = createFinder({ id: 0 });
const finder2 = createFinder({ id: 1 });
const finder3 = createFinder({ id: 2 });
const room = createRoom(20, 10, [
  { finder: finder1, position: { x: 3, y: 5 } },
  { finder: finder2, position: { x: 1, y: 2 } },
  { finder: finder3, position: { x: 4, y: 7 } }
]);

// callback for every tick end
const wholeTickCallback: WholeTickCallback = currentRoom => {
  console.log(
    // function for transforming maze to string[]
    mazeToStrings(
      currentRoom.maze,
      currentRoom.finishPoint,
      currentRoom.positions
    ).join('\n')
  );

  // just sleep the process for 0.1sec
  /* tslint:disable-next-line*/
  usleep(0.1 * 10 ** 6);
};

// starting simulation
const simulationResult = runSimulation({
  finderProcessor: randomFinderProcessor,
  maxTicksCount: 50,
  room,
  wholeTickCallback
});

// printing setup
console.log(simulationResult);

// export smth to make the file visible for index.ts which is modules aggregator
export default 0;
