import { Direction } from 'generate-maze-ts';
import { FinderProcessor, random } from 'smartpathfinders';

const map = [Direction.top, Direction.right, Direction.bottom, Direction.left];
const finderProcessor: FinderProcessor = (finder, tickIndex) => {
  console.log(
    `Tick #${tickIndex} [${finder.relativePosition.rx} ${finder.relativePosition.ry}]`
  );
  const direction = map[random(0, 4)];
  return direction;
};

export default finderProcessor;
