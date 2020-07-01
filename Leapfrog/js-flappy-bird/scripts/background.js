import { randomInt, drawRectContext, drawImageContext } from "./helperFunc.js";
import {
  CANVAS,
  CTX,
  WALL_HEIGHT,
  WALL_WIDTH,
  GAP_LIMIT,
  addBackground,
  getBackgroundList,
  removeBackground,
} from "./constants.js";

var bgIMG = new Image();
bgIMG.src = "./images/bg.png";
var upFacedWallIMG = new Image();
upFacedWallIMG.src = "./images/upFacedWall.png";
var downFacedWallIMG = new Image();
downFacedWallIMG.src = "./images/downFacedWall.png";

export default function Background(x, y, width, height, img) {
  this.x = x;
  this.x2 = CANVAS.width - 5;
  this.y = y;
  this.width = width;
  this.height = height;
  this.imageType = img;
  this.speed = 1;

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

  this.move = () => {
    this.x -= this.speed;
    this.x2 -= this.speed;
  };

  this.checkBoundary = () => {
    if (this.x + this.width < 0) {
      removeBackground(this);
      let background = new Background(0, 0, CANVAS.width, CANVAS.height);
      addBackground(background);
    }
  };
}

