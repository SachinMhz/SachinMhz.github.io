import {
  CANVAS,
  CTX,
  GAP_LIMIT,
  PIPE_HEIGHT,
  WALL_HEIGHT,
  WALL_WIDTH,
  getPipeList,
  addPipe,
  removePipe,
  addBackground,
  getBackgroundList,
  addWall,
  getWallList,
  isPlayingState,
  isFrameState,
  isGameOverState,
  setPlaying,
  isStartState,
  resetStartState,
  setFrame,
  resetGameOverState,
  removeWall,
  clearWalls,
  clearPipes,
  BIRD_X_POS,
  BIRD_Y_POS,
} from "./constants.js";
import Bird from "./bird.js";
import Pipe from "./pipes.js";
import { randomInt } from "./helperFunc.js";
import Background from "./background.js";
import Wall from "./wall.js";
import StartScreen from "./startScreen.js";
import GameOver from "./gameOverScreen.js";

var bird;
var startScreen;
var gameOver;

function init() {
  bird = new Bird();
  bird.draw();
  startScreen = new StartScreen();
  gameOver = new GameOver();
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
  if (isStartState()) {
    startScreen.draw();
  }
  if (isPlayingState()) {
    console.log("insde is playing");
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
    CTX.fillText(bird.score, CANVAS.width / 2 - 15, CANVAS.height / 3);
    if (isGameOverState()) {
      gameOver.draw();
      CTX.font = "40px Arial";
      CTX.fillStyle = "black";
      CTX.fillText(bird.score, 280, 315);
      CTX.fillText(bird.score, 280, 385);
    }
  }
  //console.log("running");
  if (isFrameState()) requestAnimationFrame(draw);
}
init();
draw();

document.addEventListener("keyup", (e) => {
  if (e.key === " ") bird.moveUp();
});

CANVAS.addEventListener("click", function (event) {
  let x = event.clientX;
  let y = event.clientY;
  if (isPlayingState()) {
    bird.moveUp();
  } else if (isStartState()) {
    resetStartState();
    setPlaying();
  } else if (isGameOverState()) {
    if (x > 255 && x < 355 && y < 555 && y > 505) {
      resetGameOverState();
      setPlaying();
      setFrame();
      clearWalls();
      clearPipes();
      init();
      draw();
    }
  }
});
