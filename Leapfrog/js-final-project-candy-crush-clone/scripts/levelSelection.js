import {
  CTX,
  CANVAS,
  LEVEL_BG,
  LEVEL_1,
  LEVEL_1_SELECTED,
  LEVEL_2,
  LEVEL_2_SELECTED,
  LEVEL_3,
  LEVEL_3_SELECTED,
  LEVEL_4,
  LEVEL_4_SELECTED,
  LEVEL_5,
  LEVEL_5_SELECTED,
  BACK,
  BACK_SELECTED,
} from "./constants.js";
import { drawImageContext } from "./helperFunc.js";

export default function LevelSelection(game) {
  this.game = game;
  this.backSelected = false;
  this.oneSelected = false;
  this.twoSelected = false;
  this.threeSelected = false;
  this.fourSelected = false;
  this.fiveSelected = false;
  this.backBtn = { x: 10, y: 10, width: 125, height: 40 };
  this.oneBtn = { x: 300, y: 490, width: 75, height: 75 };
  this.twoBtn = { x: 490, y: 300, width: 75, height: 75 };
  this.threeBtn = { x: 200, y: 200, width: 75, height: 75 };
  this.fourBtn = { x: 300, y: 50, width: 75, height: 75 };
  this.fiveBtn = { x: 475, y: 100, width: 75, height: 75 };

  this.draw = () => {
    // background
    drawImageContext(CTX, LEVEL_BG, 0, 0, CANVAS.width, CANVAS.height);
    //back button
    if (!this.backSelected) {
      drawImageContext(
        CTX,
        BACK,
        this.backBtn.x,
        this.backBtn.y,
        this.backBtn.width,
        this.backBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        BACK_SELECTED,
        this.backBtn.x,
        this.backBtn.y,
        this.backBtn.width,
        this.backBtn.height
      );
    }

    //back button
    if (!this.oneSelected) {
      drawImageContext(
        CTX,
        LEVEL_1,
        this.oneBtn.x,
        this.oneBtn.y,
        this.oneBtn.width,
        this.oneBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        LEVEL_1_SELECTED,
        this.oneBtn.x,
        this.oneBtn.y,
        this.oneBtn.width,
        this.oneBtn.height
      );
    }

    //back button
    if (!this.twoSelected) {
      drawImageContext(
        CTX,
        LEVEL_2,
        this.twoBtn.x,
        this.twoBtn.y,
        this.twoBtn.width,
        this.twoBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        LEVEL_2_SELECTED,
        this.twoBtn.x,
        this.twoBtn.y,
        this.twoBtn.width,
        this.twoBtn.height
      );
    }

    //back button
    if (!this.threeSelected) {
      drawImageContext(
        CTX,
        LEVEL_3,
        this.threeBtn.x,
        this.threeBtn.y,
        this.threeBtn.width,
        this.threeBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        LEVEL_3_SELECTED,
        this.threeBtn.x,
        this.threeBtn.y,
        this.threeBtn.width,
        this.threeBtn.height
      );
    }

    //back button
    if (!this.fourSelected) {
      drawImageContext(
        CTX,
        LEVEL_4,
        this.fourBtn.x,
        this.fourBtn.y,
        this.fourBtn.width,
        this.fourBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        LEVEL_4_SELECTED,
        this.fourBtn.x,
        this.fourBtn.y,
        this.fourBtn.width,
        this.fourBtn.height
      );
    }

    //back button
    if (!this.fiveSelected) {
      drawImageContext(
        CTX,
        LEVEL_5,
        this.fiveBtn.x,
        this.fiveBtn.y,
        this.fiveBtn.width,
        this.fiveBtn.height
      );
    } else {
      drawImageContext(
        CTX,
        LEVEL_5_SELECTED,
        this.fiveBtn.x,
        this.fiveBtn.y,
        this.fiveBtn.width,
        this.fiveBtn.height
      );
    }
  };
}
