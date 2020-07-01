import {
  CANVAS,
  CTX,
  GAP_LIMIT,
  PIPE_HEIGHT,
  WALL_HEIGHT,
  WALL_WIDTH,
  getPipeList,
  addPipe,
  getGameState,
  addBackground,
  getBackgroundList,
  addWall,
  getWallList,
} from "./constants.js";
import Bird from "./bird.js";
import Pipe from "./pipes.js";
import { randomInt } from "./helperFunc.js";
import Background from "./background.js";
import Wall from "./wall.js";

var bird = new Bird();
bird.draw();

function init() {
  let yPos = randomInt(-PIPE_HEIGHT, -100);
  let pipe1 = new Pipe(CANVAS.width, yPos, "downFaced");
  let pipe2 = new Pipe(CANVAS.width, yPos + GAP_LIMIT, "upFaced");
  addPipe(pipe1);
  addPipe(pipe2);
  let wallTop = new Wall(0, 0);
  let wallDown = new Wall(0, CANVAS.height - WALL_HEIGHT);
  addWall(wallTop);
  addWall(wallDown);
  let background = new Background(0, 0, CANVAS.width, CANVAS.height, "bg");
  addBackground(background);
}

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  getWallList().forEach((wall) => {
    wall.draw();
  });
  getBackgroundList().forEach((background) => {
    background.draw();
    background.move();
    background.checkBoundary();
  });
  getPipeList().forEach((pipe) => {
    pipe.draw();
    pipe.move();
    pipe.checkBoundary();
  });
  bird.draw();
  bird.actGravity();
  bird.checkCollision();
  CTX.font = "60px Arial";
  CTX.fillStyle = "black";
  CTX.fillText(bird.score, CANVAS.width / 2, CANVAS.height / 3);
  if (getGameState()) requestAnimationFrame(draw);
}
init();
draw();

document.addEventListener("keyup", (e) => {
  if (e.key === " ") bird.moveUp();
});
