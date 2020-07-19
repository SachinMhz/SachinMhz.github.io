import {
  CTX,
  CANVAS,
  GAME_OVER_BG,
  RETRY,
  MENU,
  MENU_SELECTED,
  RETRY_SELECTED,
} from '../utils/constants.js';
import { drawImageContext } from '../utils/helperFunc.js';

/** A class for showing game complete screen
 * @param game : complete game object,
 * @param score : score object for showing score in canvas
 */
export default function GameOver(game, score) {
  this.game = game;
  this.score = score;
  this.retrySelected = false;
  this.menuSelected = false;
  this.menuBtn = { x: 75, y: 475, width: 200, height: 75 };
  this.retryBtn = { x: 325, y: 475, width: 200, height: 75 };

  /** draws the background and button to the screen */
  this.draw = () => {
    // background
    drawImageContext(CTX, GAME_OVER_BG, 0, 0, CANVAS.width, CANVAS.height);
    //back button
    if (!this.retrySelected) {
      drawImageContext(
        CTX,
        RETRY,
        this.retryBtn.x,
        this.retryBtn.y,
        this.retryBtn.width,
        this.retryBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        RETRY_SELECTED,
        this.retryBtn.x,
        this.retryBtn.y,
        this.retryBtn.width,
        this.retryBtn.height
      );
    }

    if (!this.menuSelected) {
      drawImageContext(
        CTX,
        MENU,
        this.menuBtn.x,
        this.menuBtn.y,
        this.menuBtn.width,
        this.menuBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        MENU_SELECTED,
        this.menuBtn.x,
        this.menuBtn.y,
        this.menuBtn.width,
        this.retryBtn.height
      );
    }
    
    // display score and highScore text in the canvas
    CTX.font = '30px Arial';
    CTX.fillStyle = 'blue';
    CTX.fillText(score.score, 400, 365);
    CTX.fillText(score.highScore, 400, 415);

    // display  game level information text in the canvas
    CTX.font = '55px Arial';
    CTX.fillStyle = '#682b71';
    CTX.fillText(game.level, 375, 65);
  };
}
