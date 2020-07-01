import { randomInt, drawRectContext, drawImageContext } from "./helperFunc.js";
import {
  CANVAS,
  CTX,
  WALL_HEIGHT,
  WALL_WIDTH,
  logoIMG,
  downFacedWallIMG,
  upFacedWallIMG,
  readyIMG,
  startIMG,
} from "./constants.js";

var bgIMG = new Image();
bgIMG.src = "./images/bg.png";

export default function StartScreen() {
  this.draw = () => {
    drawImageContext(CTX, bgIMG, 0, 0, CANVAS.width, CANVAS.height);
    drawImageContext(
      CTX,
      upFacedWallIMG,
      0,
      CANVAS.height - WALL_HEIGHT,
      WALL_WIDTH,
      WALL_HEIGHT
    );
    drawImageContext(CTX, downFacedWallIMG, 0, 0, WALL_WIDTH, WALL_HEIGHT);
    drawImageContext(CTX, logoIMG, CANVAS.width / 2 - 100, 100, 200, 50);
    drawImageContext(CTX, readyIMG, CANVAS.width / 2 - 100, 200, 200, 50);
    drawImageContext(CTX, startIMG, CANVAS.width / 2 - 100, 300, 200, 200);
  };
}
