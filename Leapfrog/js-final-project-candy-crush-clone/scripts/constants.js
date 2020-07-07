import { getImage, getAudio } from "./helperFunc.js";

//creating canvas
export const CANVAS = document.getElementById("canvas");
CANVAS.height = 600;
CANVAS.width = 600;
//CANVAS.style.border = "1px solid black";

// constants used in the game
export const CTX = CANVAS.getContext("2d");
export const CANDY_WIDTH = 60;
export const CANDY_HEIGHT = 60;

//declaring image constants
export const BLUE = getImage("./images/blue-candy.png");
export const GREEN = getImage("./images/green-candy.png");
export const RED = getImage("./images/red-candy.png");
export const YELLOW = getImage("./images/yellow-candy.png");
export const PURPLE = getImage("./images/purple-candy.png");
export const ORANGE = getImage("./images/orange-candy.png");

//get audio files
// export const pointAudio = getAudio("./audios/point.mp3");
