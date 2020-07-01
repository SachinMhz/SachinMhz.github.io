import { getImage } from "./helperFunc.js";

export const CANVAS = document.getElementById("canvas");
CANVAS.height = 600;
CANVAS.width = 400;
CANVAS.style.border = "1px solid black";

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

export const bird1_IMG = getImage("./images/bird1.png");
export const bird2_IMG = getImage("./images/bird2.png");
export const upFacedPipeIMG = getImage("./images/upFaced.png");
export const downFacedPipeIMG = getImage("./images/downFaced.png");
export const bgIMG = getImage("./images/bg.png");
export var upFacedWallIMG = getImage("./images/upFacedWall.png");
export var downFacedWallIMG = getImage("./images/downFacedWall.png");
export var logoIMG = getImage("./images/logo.png");
export var readyIMG = getImage("./images/getReady.png");
export var startIMG = getImage("./images/start.png");
export var gameOverIMG = getImage("./images/gameOver.png");
export var scoreBoardIMG = getImage("./images/scoreBoard.png");
export var playBtnIMG = getImage("./images/playBtn.png");

var pipeList = [];
var backgroundList = [];
var wallList = [];

var isPlaying = false;
var isGameOver = false;
var isFrameRunning = true;
var isStartGame = true;


export function addPipe(pipe) {
  pipeList.push(pipe);
}
export function getPipeList() {
  return pipeList;
}
export function removePipe(unwantedPipe) {
  pipeList = pipeList.filter((pipe) => {
    return pipe != unwantedPipe;
  });
}
export function clearPipes() {
  pipeList = [];
}


export function addWall(wall) {
  wallList.push(wall);
}
export function getWallList() {
  return wallList;
}
export function clearWalls() {
  wallList = [];
}
export function removeWall(unwantedWall) {
  wallList = wallList.filter((wall) => {
    return wall != unwantedWall;
  });
}


export function addBackground(background) {
  backgroundList.push(background);
}
export function getBackgroundList() {
  return backgroundList;
}
export function removeBackground(unwantedBackground) {
  backgroundList = backgroundList.filter((background) => {
    return background != unwantedBackground;
  });
}

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
