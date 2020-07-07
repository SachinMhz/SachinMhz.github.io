import { CANVAS, CTX, CANDY_HEIGHT, CANDY_WIDTH } from "./constants.js";
import { drawRectContext, getRandomColor, swapArray } from "./helperFunc.js";

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
  this.isDragging = false;
  this.zIndex = 0;
  this.dragDirection = "center";
  this.moveAboveCandy = false;

  this.draw = () => {
    drawRectContext(CTX, this.x, this.y, this.width, this.height, this.color);
  };

  // this.moveDown = () => {
  //   if (this.isMoveDown) {
  //     this.y = +60;
  //     this.realY += 60;
  //     this.isMoveDown = false;
  //   }
  // };

  // this.destroyed = () => {
  //   if (this.isDestroyed) {
  //     //this.isDestroyed = false;
  //     if (this.game.candies[this.id - 10]) {
  //       swapArray(
  //         this.game.candies,
  //         this.game.candies[this.id].id,
  //         this.game.candies[this.id - 10].id
  //       );
  //     }
  //   }
  // };
}
