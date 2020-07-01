import { drawRectContext, isCollided, drawImageContext } from "./helperFunc.js";
import {
  CTX,
  BIRD_RADIUS,
  BIRD_X_POS,
  BIRD_Y_POS,
  BIRD_HEIGHT,
  BIRD_WIDTH,
  ANIMATION_RATE,
  getPipeList,
  gameOver,
  bird1_IMG,
  bird2_IMG,
  getWallList,
} from "./constants.js";

export default function Bird() {
  this.x = BIRD_X_POS;
  this.y = BIRD_Y_POS;
  this.radius = BIRD_RADIUS;
  this.width = BIRD_WIDTH;
  this.height = BIRD_HEIGHT;
  this.jumpForce = this.radius * 2;
  this.gravity = 0;
  this.frame = 0;
  this.normalImg = true;
  this.score = 0;

  this.draw = () => {
    if (this.normalImg) {
      drawImageContext(CTX, bird1_IMG, this.x, this.y, this.width, this.height);
    } else {
      drawImageContext(CTX, bird2_IMG, this.x, this.y, this.width, this.height);
    }
  };
  this.moveUp = () => {
    this.gravity = 0;
    this.y -= this.jumpForce;
  };

  this.actGravity = () => {
    this.y += this.gravity;
    this.gravity += 0.3;
    this.frame += 1;
    if (this.frame > ANIMATION_RATE) {
      this.normalImg = !this.normalImg;
      this.frame = 0;
    }
  };

  this.checkCollision = () => {
    let pipeList = getPipeList();
    pipeList.forEach((pipe) => {
      if (this.x > pipe.x + pipe.width && pipe.increaseScore) {
        pipe.increaseScore = false;
        this.score += 0.5;
      }
      if (isCollided(this, pipe)) {
        gameOver();
      }
    });

    let wallList = getWallList();
    wallList.forEach((wall) => {
      if (isCollided(this, wall)) {
        gameOver();
      }
    });
  };
}
