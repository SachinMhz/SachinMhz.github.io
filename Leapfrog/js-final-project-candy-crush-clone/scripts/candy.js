import {
  CANVAS,
  CTX,
  CANDY_HEIGHT,
  CANDY_WIDTH,
  RED,
  BLUE,
  GREEN,
  YELLOW,
  ORANGE,
  PURPLE,
} from "./constants.js";
import {
  drawRectContext,
  getRandomColor,
  swapArray,
  drawImageContext,
} from "./helperFunc.js";

export default function Candy(game, x, y, color, id) {
  this.game = game;
  this.realX = x * CANDY_WIDTH;
  this.realY = y * CANDY_HEIGHT;
  this.x = x * CANDY_WIDTH;
  this.y = y * CANDY_HEIGHT;
  this.width = CANDY_WIDTH;
  this.height = CANDY_HEIGHT;
  this.color = color;
  this.id = id;
  this.isDragging = false;
  this.zIndex = 0;
  this.dragDirection = "center";
  this.moveAboveCandy = false;

  this.draw = () => {
    switch (this.color) {
      case "red":
        drawImageContext(CTX, RED, this.x, this.y, this.width, this.height);
        break;
      case "blue":
        drawImageContext(CTX, BLUE, this.x, this.y, this.width, this.height);
        break;
      case "green":
        drawImageContext(CTX, GREEN, this.x, this.y, this.width, this.height);
        break;
      case "yellow":
        drawImageContext(CTX, YELLOW, this.x, this.y, this.width, this.height);
        break;
      case "orange":
        drawImageContext(CTX, ORANGE, this.x, this.y, this.width, this.height);
        break;
      case "purple":
        drawImageContext(CTX, PURPLE, this.x, this.y, this.width, this.height);
        break;
      default:
        drawImageContext(CTX, PURPLE, this.x, this.y, this.width, this.height);
    }
    //drawRectContext(CTX, this.x, this.y, this.width, this.height, this.color);
  };
}

/*
switch (this.color) {
      case "red":
        drawImageContext(CTX, RED, this.x, this.y, this.width, this.height);
        break;
      case "blue":
        drawImageContext(CTX, BLUE, this.x, this.y, this.width, this.height);
        break;
      case "green":
        drawImageContext(CTX, GREEN, this.x, this.y, this.width, this.height);
        break;
      case "yellow":
        drawImageContext(CTX, YELLOW, this.x, this.y, this.width, this.height);
        break;
      case "orange":
        drawImageContext(CTX, ORANGE, this.x, this.y, this.width, this.height);
        break;
      case "purple":
        drawImageContext(CTX, PURPLE, this.x, this.y, this.width, this.height);
        break;
      default:
        drawImageContext(CTX, PURPLE, this.x, this.y, this.width, this.height);
    }

    */
