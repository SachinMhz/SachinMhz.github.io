import { randomInt, drawRectContext, drawImageContext } from "./helperFunc.js";
import {
  CANVAS,
  CTX,
  WALL_HEIGHT,
  WALL_WIDTH,
  logoIMG,
  downFacedWallIMG,
  upFacedWallIMG,
  gameOverIMG,
  playBtnIMG,
  scoreBoardIMG,
} from "./constants.js";

var bgIMG = new Image();
bgIMG.src = "./images/bg.png";

export default function GameOver() {
  this.draw = () => {
    // drawImageContext(CTX, bgIMG, 0, 0, CANVAS.width, CANVAS.height);
    // drawImageContext(
    //   CTX,
    //   upFacedWallIMG,
    //   0,
    //   CANVAS.height - WALL_HEIGHT,
    //   WALL_WIDTH,
    //   WALL_HEIGHT
    // );
    // drawImageContext(CTX, downFacedWallIMG, 0, 0, WALL_WIDTH, WALL_HEIGHT);
    drawImageContext(CTX, gameOverIMG, CANVAS.width / 2 - 100, 100, 200, 50);
    drawImageContext(CTX, scoreBoardIMG, CANVAS.width / 2 - 150, 225, 300, 200);
    drawImageContext(CTX, playBtnIMG, CANVAS.width / 2 - 50, 500, 100, 50);
  };
}
