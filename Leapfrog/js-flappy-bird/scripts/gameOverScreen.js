import { drawImageContext } from "./helperFunc.js";
import {
  CANVAS,
  CTX,
  gameOverIMG,
  playBtnIMG,
  scoreBoardIMG,
} from "./constants.js";

/** Declares GameOver to draw gameOver objects on canvas
 */
export default function GameOver() {
  this.draw = () => {
    drawImageContext(CTX, gameOverIMG, CANVAS.width / 2 - 100, 100, 200, 50);
    drawImageContext(CTX, scoreBoardIMG, CANVAS.width / 2 - 150, 225, 300, 200);
    drawImageContext(CTX, playBtnIMG, CANVAS.width / 2 - 50, 500, 100, 50);
  };
}
