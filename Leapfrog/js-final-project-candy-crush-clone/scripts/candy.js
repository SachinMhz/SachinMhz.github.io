import { CANVAS, CTX, CANDY_HEIGHT, CANDY_WIDTH } from "./constants.js";
import { drawRectContext } from "./helperFunc.js";

export default function Candy(game, x, y, color, id) {
  this.game = game;
  this.realX = x;
  this.realY = y;
  this.x = x;
  this.y = y;
  this.id = id;
  this.width = CANDY_WIDTH;
  this.height = CANDY_HEIGHT;
  this.color = color;
  this.detail = "x:" + this.x + ", y:" + this.y;
  this.isDragging = false;
  this.zIndex = 0;

  this.draw = () => {
    drawRectContext(CTX, this.x, this.y, this.width, this.height, this.color);
  };

}
