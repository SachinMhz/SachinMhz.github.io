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
export const CANDY_POINT = 10;
export const CANDY_COLOR = ["r", "b", "g", "p", "y", "o"];

//declaring image constants
export const BLUE = getImage("./images/blue-candy.png");
export const BLUE_ROW = getImage("./images/blue-row.png");
export const BLUE_COL = getImage("./images/blue-col.png");
export const BLUE_PACKET = getImage("./images/blue-packet.png");
export const BLUE_SELECTED = getImage("./images/blue-selected.png");

export const GREEN = getImage("./images/green-candy.png");
export const GREEN_ROW = getImage("./images/green-row.png");
export const GREEN_COL = getImage("./images/green-col.png");
export const GREEN_PACKET = getImage("./images/green-packet.png");
export const GREEN_SELECTED = getImage("./images/green-selected.png");

export const RED = getImage("./images/red-candy.png");
export const RED_ROW = getImage("./images/red-row.png");
export const RED_COL = getImage("./images/red-col.png");
export const RED_PACKET = getImage("./images/red-packet.png");
export const RED_SELECTED = getImage("./images/red-selected.png");

export const YELLOW = getImage("./images/yellow-candy.png");
export const YELLOW_ROW = getImage("./images/yellow-row.png");
export const YELLOW_COL = getImage("./images/yellow-col.png");
export const YELLOW_PACKET = getImage("./images/yellow-packet.png");
export const YELLOW_SELECTED = getImage("./images/yellow-selected.png");

export const PURPLE = getImage("./images/purple-candy.png");
export const PURPLE_ROW = getImage("./images/purple-row.png");
export const PURPLE_COL = getImage("./images/purple-col.png");
export const PURPLE_PACKET = getImage("./images/purple-packet.png");
export const PURPLE_SELECTED = getImage("./images/purple-selected.png");

export const ORANGE = getImage("./images/orange-candy.png");
export const ORANGE_ROW = getImage("./images/orange-row.png");
export const ORANGE_COL = getImage("./images/orange-col.png");
export const ORANGE_PACKET = getImage("./images/orange-packet.png");
export const ORANGE_SELECTED = getImage("./images/orange-selected.png");

export const NO_CANDY = getImage("./images/noBG.png");

export const COLOR_BOMB = getImage("./images/color-bomb.png");

export const BG_1 = getImage("./images/bg1.png");
export const BG_SELECTED = getImage("./images/bg1-selected.png");
export const BG_2 = getImage("./images/bg2.png");
export const BG_3 = getImage("./images/bg3.png");
export const BG_4 = getImage("./images/bg4.png");

