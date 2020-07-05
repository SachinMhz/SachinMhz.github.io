import { CANVAS, CTX } from "./constants.js";
import { drawRectContext } from "./helperFunc.js";

export default function Candy(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;

  this.draw = () => {
    drawRectContext(CTX, this.x, this.y, 60, 60);
  };

  this.mouseClick = (mouseX, mouseY) => {
    if (
      mouseX > this.x &&
      mouseX < this.x + 60 &&
      mouseY > this.y &&
      mouseY < this.y + 60
    ) {
      console.log(this.x, this.y);
    }
  };
}
