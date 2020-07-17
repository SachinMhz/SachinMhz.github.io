import {
  CTX,
  CANVAS,
  START_BG,
  PLAY_BTN_SELECTED,
  PLAY_BTN,
} from "./constants.js";
import { drawImageContext } from "./helperFunc.js";

export default function StartMenu(game) {
  this.game = game;
  this.isSelected = false;
  this.playBtn = { x: 225, y: 375, width: 150, height: 50 };

  this.draw = () => {
    // background
    drawImageContext(CTX, START_BG, 0, 0, CANVAS.width, CANVAS.height);
    //button
    if (!this.isSelected) {
      drawImageContext(
        CTX,
        PLAY_BTN,
        225, //CANVAS.width - btnWidth / 2,
        375, //CANVAS.height - btnHeight / 2,
        150,
        50
      );
    }
    //volume button
    else {
      drawImageContext(
        CTX,
        PLAY_BTN_SELECTED,
        225, //CANVAS.width - btnWidth / 2,
        375, //CANVAS.height - btnHeight / 2,
        150,
        50
      );
    }
  };
}
