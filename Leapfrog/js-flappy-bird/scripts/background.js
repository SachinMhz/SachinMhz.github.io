import { drawImageContext } from "./helperFunc.js";
import {
  CANVAS,
  CTX,
  WALL_HEIGHT,
  WALL_WIDTH,
  addBackground,
  clearBackground,
  bgIMG,
  upFacedWallIMG,
  downFacedWallIMG,
} from "./constants.js";

/** Declares Background to draw and move the background objects
 * @param x x coordinate in canvas space
 * @param y y coordinate in canvas space
 * @param width width of the object
 * @param height height of the object
 */
export default function Background(x, y, width, height) {
  this.x = x;
  this.x2 = CANVAS.width - 5;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 1;

  /* responsible to draw wall background to canvas*/
  this.draw = () => {
    drawImageContext(CTX, bgIMG, this.x, 0, CANVAS.width, CANVAS.height);
    drawImageContext(
      CTX,
      upFacedWallIMG,
      this.x,
      CANVAS.height - WALL_HEIGHT,
      WALL_WIDTH,
      WALL_HEIGHT
    );
    drawImageContext(CTX, downFacedWallIMG, this.x, 0, WALL_WIDTH, WALL_HEIGHT);

    drawImageContext(CTX, bgIMG, this.x2, 0, CANVAS.width, CANVAS.height);
    drawImageContext(
      CTX,
      upFacedWallIMG,
      this.x2,
      CANVAS.height - WALL_HEIGHT,
      WALL_WIDTH,
      WALL_HEIGHT
    );
    drawImageContext(
      CTX,
      downFacedWallIMG,
      this.x2,
      0,
      WALL_WIDTH,
      WALL_HEIGHT
    );
  };

  //responsible to move the objects in x-direction
  this.move = () => {
    this.x -= this.speed;
    this.x2 -= this.speed;
  };

  //responsible to draw object again if it goes out of the canvas
  this.checkBoundary = () => {
    if (this.x + this.width < 0) {
      clearBackground();
      let background = new Background(0, 0, CANVAS.width, CANVAS.height);
      addBackground(background);
    }
  };
}
