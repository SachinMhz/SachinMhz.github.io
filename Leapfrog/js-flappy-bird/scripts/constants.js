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

export const bird1_IMG = new Image();
bird1_IMG.src = "./images/bird1.png";

export const bird2_IMG = new Image();
bird2_IMG.src = "./images/bird2.png";

export const upFacedPipeIMG = new Image();
upFacedPipeIMG.src = "./images/upFaced.png";
export const downFacedPipeIMG = new Image();
downFacedPipeIMG.src = "./images/downFaced.png";

export const bgIMG = new Image();
bgIMG.src = "./images/bg.png";
export var upFacedWallIMG = new Image();
upFacedWallIMG.src = "./images/upFacedWall.png";
export var downFacedWallIMG = new Image();
downFacedWallIMG.src = "./images/downFacedWall.png";

var isPlaying = true;
var pipeList = [];

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

var wallList = [];

export function addWall(wall) {
  wallList.push(wall);
}
export function getWallList() {
  return wallList;
}

export function removeWall(unwantedWall) {
  wallList = wallList.filter((wall) => {
    return wall != unwantedWall;
  });
}

var backgroundList = [];

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

export function getGameState() {
  return isPlaying;
}
export function startGame() {
  isPlaying = true;
}
export function gameOver() {
  console.log("gave over");
  isPlaying = false;
}
