import { randomInt, drawRectContext, drawImageContext } from "./helperFunc.js";
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

export default function Pipe(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.width = PIPE_WIDTH;
  this.height = PIPE_HEIGHT;
  this.speed = 5;
  this.increaseScore = true;

  if (this.direction === "upFaced") {
    this.draw = () => {
      drawImageContext(
        CTX,
        upFacedPipeIMG,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };
  } else {
    this.draw = () => {
      drawImageContext(
        CTX,
        downFacedPipeIMG,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };
  }
  this.move = () => {
    this.x -= this.speed;
  };

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
