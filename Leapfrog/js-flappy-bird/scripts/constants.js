import { getImage } from "./helperFunc.js";

//creating canvas
export const CANVAS = document.getElementById("canvas");
CANVAS.height = 600;
CANVAS.width = 400;
CANVAS.style.border = "1px solid black";

// constants used in the game
export const CTX = CANVAS.getContext("2d");
export var GAME_SPEED = 5;
export const PIPE_WIDTH = 100;
export const PIPE_HEIGHT = 400;
export const WALL_WIDTH = CANVAS.width;
export const WALL_HEIGHT = 50;
export const GAP_LIMIT = PIPE_HEIGHT + 200;
export const BIRD_RADIUS = 25;
export const BIRD_X_POS = 50;
export const BIRD_Y_POS = 225;
export const BIRD_WIDTH = 70;
export const BIRD_HEIGHT = 50;
export const ANIMATION_RATE = 5;

//declaring image constants
export const bird1_IMG = getImage("./images/bird1.png");
export const bird2_IMG = getImage("./images/bird2.png");
export const upFacedPipeIMG = getImage("./images/upFaced.png");
export const downFacedPipeIMG = getImage("./images/downFaced.png");
export const bgIMG = getImage("./images/bg.png");
export const upFacedWallIMG = getImage("./images/upFacedWall.png");
export const downFacedWallIMG = getImage("./images/downFacedWall.png");
export const logoIMG = getImage("./images/logo.png");
export const readyIMG = getImage("./images/getReady.png");
export const startIMG = getImage("./images/start.png");
export const gameOverIMG = getImage("./images/gameOver.png");
export const scoreBoardIMG = getImage("./images/scoreBoard.png");
export const playBtnIMG = getImage("./images/playBtn.png");

//setting up list variables
var pipeList = [];
var backgroundList = [];
var wallList = [];

//setting up gameScreen variables
var isPlaying = false;
var isGameOver = false;
var isFrameRunning = true;
var isStartGame = true;

//to add pipe to the pipeList
export function addPipe(pipe) {
  pipeList.push(pipe);
}
//to return pipeList
export function getPipeList() {
  return pipeList;
}
//to remove unwanted pipe from pipeList
export function removePipe(unwantedPipe) {
  pipeList = pipeList.filter((pipe) => {
    return pipe != unwantedPipe;
  });
}
//to remove all pipe from the list
export function clearPipes() {
  pipeList = [];
}

//to add wall to wallList
export function addWall(wall) {
  wallList.push(wall);
}
//to return wallList
export function getWallList() {
  return wallList;
}
//to remove all wall objects from wallList
export function clearWalls() {
  wallList = [];
}

//to add background object to backgroundList
export function addBackground(background) {
  backgroundList.push(background);
}
//to return backgroundList
export function getBackgroundList() {
  return backgroundList;
}
//to remove all backGround from backgroundList
export function clearBackground() {
  backgroundList = [];
}

/** to go to GameOver Screen and stop animation
 */
export function gameOver() {
  isPlaying = false;
  isFrameRunning = false;
  isStartGame = false;
  isGameOver = true;
}

export function isPlayingState() {
  return isPlaying;
}
export function setPlaying() {
  isPlaying = true;
}
export function resetPlaying() {
  isPlaying = false;
}

export function isFrameState() {
  return isFrameRunning;
}
export function setFrame() {
  isFrameRunning = true;
}
export function resetFrame() {
  isFrameRunning = false;
}

export function isStartState() {
  return isStartGame;
}
export function setStartState() {
  isStartGame = true;
}
export function resetStartState() {
  isStartGame = false;
}

export function isGameOverState() {
  return isGameOver;
}
export function setGameOverState() {
  isGameOver = true;
}
export function resetGameOverState() {
  isGameOver = false;
}
