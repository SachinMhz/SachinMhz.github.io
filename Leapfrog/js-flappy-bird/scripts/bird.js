import { isCollided, drawImageContext } from "./helperFunc.js";
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

/** Declares bird to draw and move and
 * check collision with other game objects in the canvas
 */

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

  //draw bird object to the canvas
  this.draw = () => {
    //to give illusion of bird moving;
    //this.normalImg-> true  meaning flapDown image and false meaning flapUp image
    if (this.normalImg) {
      drawImageContext(CTX, bird1_IMG, this.x, this.y, this.width, this.height);
    } else {
      drawImageContext(CTX, bird2_IMG, this.x, this.y, this.width, this.height);
    }
  };

  //to move bird object up when mouse is clicked
  this.moveUp = () => {
    this.gravity = 0;
    this.y -= this.jumpForce;
  };

  //continuously shift y-pos of bird down to achieve gravity effect
  this.actGravity = () => {
    this.y += this.gravity;
    this.gravity += 0.3;
    this.frame += 1; //for changing the image for animation
    if (this.frame > ANIMATION_RATE) {
      this.normalImg = !this.normalImg;
      this.frame = 0;
    }
  };

  //checks collision between bird and other game object like pipe and walls
  this.checkCollision = () => {
    let pipeList = getPipeList();
    pipeList.forEach((pipe) => {
      //increasing score when bird passes the pipe
      if (this.x > pipe.x + pipe.width && pipe.increaseScore) {
        pipe.increaseScore = false;
        this.score += 0.5; //two pipes so increment by 1/2
        if (this.score > localStorage.getItem("highScore")) {
          localStorage.setItem("highScore", this.score);
        }
      }
      //when bird collide with pipe
      if (isCollided(this, pipe)) {
        gameOver();
      }
    });

    let wallList = getWallList();
    wallList.forEach((wall) => {
      //when bird collide with walls
      if (isCollided(this, wall)) {
        gameOver();
      }
    });
  };
}
