import {
  CANVAS,
  CTX,
  GAP_LIMIT,
  PIPE_HEIGHT,
  WALL_HEIGHT,
  getPipeList,
  addPipe,
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
  clearWalls,
  clearPipes,
} from "./constants.js";
import { randomInt } from "./helperFunc.js";
import Bird from "./bird.js";
import Pipe from "./pipes.js";
import Background from "./background.js";
import Wall from "./wall.js";
import StartScreen from "./startScreen.js";
import GameOver from "./gameOverScreen.js";

//declare game object variable
var bird;
var startScreen;
var gameOver;

/** Initialize all drawable game objects
 */
function init() {
  bird = new Bird();
  bird.draw();
  startScreen = new StartScreen();
  gameOver = new GameOver();

  let yPos = randomInt(-PIPE_HEIGHT, -100); //random pipe Y-position
  let pipe1 = new Pipe(CANVAS.width, yPos, "downFaced");
  let pipe2 = new Pipe(CANVAS.width, yPos + GAP_LIMIT, "upFaced");
  addPipe(pipe1);
  addPipe(pipe2);

  let wallTop = new Wall(0, 0);
  let wallDown = new Wall(0, CANVAS.height - WALL_HEIGHT);
  addWall(wallTop);
  addWall(wallDown);

  let background = new Background(0, 0, CANVAS.width, CANVAS.height);
  addBackground(background);
}

/**
 * Draws entire game object to the canvas and repeat itself using requestAnimationFrame
 */
function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  //will show startMenu Screen
  if (isStartState()) {
    startScreen.draw();
  }

  //will show playable gameScreen
  if (isPlayingState()) {
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
    //draw score text to the screen
    CTX.font = "60px Arial";
    CTX.fillStyle = "black";
    CTX.fillText(bird.score, CANVAS.width / 2 - 15, CANVAS.height / 3);

    //will show gameOver Screen
    if (isGameOverState()) {
      gameOver.draw();
      CTX.font = "40px Arial";
      CTX.fillStyle = "black";
      CTX.fillText(bird.score, 280, 315);
      CTX.fillText(localStorage.getItem("highScore"), 280, 385);
    }
  }
  if (isFrameState()) requestAnimationFrame(draw);
}

init();
draw();

/**
 * Handles mouse clicks events in the canvas
 */
CANVAS.addEventListener("click", function (event) {
  let x = event.clientX;
  let y = event.clientY;

  //while in game clicks to flap bird
  if (isPlayingState()) {
    bird.moveUp();
  }
  //while in start Screen , click to start game
  else if (isStartState()) {
    resetStartState();
    setPlaying();
  }
  //while in gameOver Screen , click to button to reset and start game again
  else if (isGameOverState()) {
    if (
      x > CANVAS.width / 2 + 50 &&
      x < CANVAS.width / 2 + 150 &&
      y < 550 &&
      y > 500
    ) {
      //resetting game variables
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
