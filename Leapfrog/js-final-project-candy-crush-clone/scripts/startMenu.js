import {
  CTX,
  CANVAS,
  START_BG,
  PLAY_BTN_SELECTED,
  PLAY_BTN,
} from './constants.js';
import { drawImageContext } from './helperFunc.js';

export default function StartMenu(game) {
  this.game = game;
  this.isSelected = false;
  this.playBtn = { x: 225, y: 375, width: 150, height: 50 };

  this.draw = () => {
    // background
    drawImageContext(CTX, START_BG, 0, 0, CANVAS.width, CANVAS.height);
    // play button
    if (!this.isSelected) {
      drawImageContext(
        CTX,
        PLAY_BTN,
        this.playBtn.x,
        this.playBtn.y,
        this.playBtn.width,
        this.playBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        PLAY_BTN_SELECTED,
        this.playBtn.x,
        this.playBtn.y,
        this.playBtn.width,
        this.playBtn.height
      );
    }
  };
}
