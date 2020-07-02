import { randomInt, drawImageContext } from "./helperFunc.js";
import {
  CANVAS,
  CTX,
  PIPE_HEIGHT,
  PIPE_WIDTH,
  GAP_LIMIT,
  addPipe,
  getPipeList,
  upFacedPipeIMG,
  downFacedPipeIMG,
  removePipe,
} from "./constants.js";

/** Declares Pipe to draw and move the pipe objects
 * @param x x coordinate in canvas space
 * @param y y coordinate in canvas space
 * @param direction direction of the pipe to be faced
 */
export default function Pipe(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.width = PIPE_WIDTH;
  this.height = PIPE_HEIGHT;
  this.speed = 5;
  this.increaseScore = true;

  //draw pipe object to the canvas
  this.draw = () => {
    if (this.direction === "upFaced") {
      drawImageContext(
        CTX,
        upFacedPipeIMG,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      drawImageContext(
        CTX,
        downFacedPipeIMG,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  };

  //to move pipes in x direction
  this.move = () => {
    this.x -= this.speed;
  };

  //to reset the position of pipes after pipe is over he canvas
  this.checkBoundary = () => {
    let pipeList = getPipeList();
    for (let i = 0; i < pipeList.length; i = i + 2) {
      if (pipeList[i].x + pipeList[i].width < 0) {
        removePipe(pipeList[i]);
        removePipe(pipeList[i + 1]);
        let yPos = randomInt(-PIPE_HEIGHT, -100);
        let pipe1 = new Pipe(CANVAS.width, yPos, "downFaced");
        let pipe2 = new Pipe(CANVAS.width, yPos + GAP_LIMIT, "upFaced");
        addPipe(pipe1);
        addPipe(pipe2);
      }
    }
  };
}
