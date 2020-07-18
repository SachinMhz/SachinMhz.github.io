import {
  CTX,
  CANVAS,
  GAME_COMPLETE_BG,
  NEXT,
  MENU,
  MENU_SELECTED,
  NEXT_SELECTED,
} from "./constants.js";
import { drawImageContext } from "./helperFunc.js";

export default function GameComplete(game, score) {
  this.game = game;
  this.score = score;
  this.nextSelected = false;
  this.menuSelected = false;
  this.menuBtn = { x: 75, y: 475, width: 200, height: 75 };
  this.nextBtn = { x: 325, y: 475, width: 200, height: 75 };

  this.draw = () => {
    // background
    drawImageContext(CTX, GAME_COMPLETE_BG, 0, 0, CANVAS.width, CANVAS.height);
    //back button
    if (!this.nextSelected) {
      drawImageContext(
        CTX,
        NEXT,
        this.nextBtn.x,
        this.nextBtn.y,
        this.nextBtn.width,
        this.nextBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        NEXT_SELECTED,
        this.nextBtn.x,
        this.nextBtn.y,
        this.nextBtn.width,
        this.nextBtn.height
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
        this.nextBtn.height
      );
    }

    CTX.font = "30px Arial";
    CTX.fillStyle = "blue";
    CTX.fillText(score.score, 400, 365);
    CTX.fillText(score.highScore, 400, 410);

    CTX.font = "55px Arial";
    CTX.fillStyle = "#682b71";
    CTX.fillText(game.level, 375, 65);
  };
}
