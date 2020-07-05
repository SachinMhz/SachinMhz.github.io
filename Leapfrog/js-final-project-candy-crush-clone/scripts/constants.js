import { getImage, getAudio } from "./helperFunc.js";

//creating canvas
export const CANVAS = document.getElementById("canvas");
CANVAS.height = 600;
CANVAS.width = 600;
//CANVAS.style.border = "1px solid black";

// constants used in the game
export const CTX = CANVAS.getContext("2d");

//declaring image constants
//export const bird1_IMG = getImage("./images/bird1.png");

//get audio files
// export const pointAudio = getAudio("./audios/point.mp3");
