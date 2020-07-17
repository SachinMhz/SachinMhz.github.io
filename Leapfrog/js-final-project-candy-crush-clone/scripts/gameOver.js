import {
  CTX,
  CANVAS,
  GAME_OVER_BG,
  RETRY,
  MENU,
  MENU_SELECTED,
  RETRY_SELECTED,
  BACK,
} from "./constants.js";
import { drawImageContext } from "./helperFunc.js";

export default function GameOver(game, score) {
  this.game = game;
  this.score = score;
  this.retrySelected = false;
  this.menuSelected = false;
  this.menuBtn = { x: 75, y: 475, width: 200, height: 75 };
  this.retryBtn = { x: 325, y: 475, width: 200, height: 75 };

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
  };
}
