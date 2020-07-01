import { CTX, WALL_HEIGHT, WALL_WIDTH } from "./constants.js";

export default function Wall(x, y) {
  this.x = x;
  this.y = y;
  this.width = WALL_WIDTH;
  this.height = WALL_HEIGHT;
  this.speed = 5;

  this.draw = () => {
    CTX.beginPath();
    CTX.rect(this.x, this.y, this.width, this.height);
    CTX.fillStyle = "black";
    CTX.fill();
    CTX.closePath();
  };
}
