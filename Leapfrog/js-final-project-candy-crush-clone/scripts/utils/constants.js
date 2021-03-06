import { getImage } from './helperFunc.js';

//creating canvas
export const CANVAS = document.getElementById('canvas');
CANVAS.height = 600;
CANVAS.width = 600;

// constants used in the game
export const CTX = CANVAS.getContext('2d');
export const CANDY_WIDTH = 60;
export const CANDY_HEIGHT = 60;
export const CANDY_POINT = 10;
export const CANDY_COLOR = ['r', 'b', 'g', 'p', 'y', 'o'];
export const GAME_ROW = 10;
export const GAME_COL = 10;
export const NO_OF_MOVES = 40;

//declaring image constants
export const BLUE = getImage('./images/blue-candy.png');
export const BLUE_ROW = getImage('./images/blue-row.png');
export const BLUE_COL = getImage('./images/blue-col.png');
export const BLUE_PACKET = getImage('./images/blue-packet.png');
export const BLUE_PE = getImage('./images/blue-packet-explode.png');

export const GREEN = getImage('./images/green-candy.png');
export const GREEN_ROW = getImage('./images/green-row.png');
export const GREEN_COL = getImage('./images/green-col.png');
export const GREEN_PACKET = getImage('./images/green-packet.png');
export const GREEN_PE = getImage('./images/green-packet-explode.png');

export const RED = getImage('./images/red-candy.png');
export const RED_ROW = getImage('./images/red-row.png');
export const RED_COL = getImage('./images/red-col.png');
export const RED_PACKET = getImage('./images/red-packet.png');
export const RED_PE = getImage('./images/red-packet-explode.png');

export const YELLOW = getImage('./images/yellow-candy.png');
export const YELLOW_ROW = getImage('./images/yellow-row.png');
export const YELLOW_COL = getImage('./images/yellow-col.png');
export const YELLOW_PACKET = getImage('./images/yellow-packet.png');
export const YELLOW_PE = getImage('./images/yellow-packet-explode.png');

export const PURPLE = getImage('./images/purple-candy.png');
export const PURPLE_ROW = getImage('./images/purple-row.png');
export const PURPLE_COL = getImage('./images/purple-col.png');
export const PURPLE_PACKET = getImage('./images/purple-packet.png');
export const PURPLE_PE = getImage('./images/purple-packet-explode.png');

export const ORANGE = getImage('./images/orange-candy.png');
export const ORANGE_ROW = getImage('./images/orange-row.png');
export const ORANGE_COL = getImage('./images/orange-col.png');
export const ORANGE_PACKET = getImage('./images/orange-packet.png');
export const ORANGE_PE = getImage('./images/orange-packet-explode.png');

//special candy images
export const NO_CANDY = getImage('./images/noBG.png');
export const COLOR_BOMB = getImage('./images/color-bomb.png');
export const BG_1 = getImage('./images/candyBG.png');
export const BG_SELECTED = getImage('./images/candyBG-selected.png');

//background images
export const START_BG = getImage('./images/startBG.png');
export const LEVEL_BG = getImage('./images/levelBG.png');
export const GAME_OVER_BG = getImage('./images/gameOverBG.png');
export const GAME_COMPLETE_BG = getImage('./images/gameCompleteBG.png');

//button images
export const LEVEL_1 = getImage('./images/level1.png');
export const LEVEL_2 = getImage('./images/level2.png');
export const LEVEL_3 = getImage('./images/level3.png');
export const LEVEL_4 = getImage('./images/level4.png');
export const LEVEL_5 = getImage('./images/level5.png');
export const LEVEL_1_SELECTED = getImage('./images/level1-selected.png');
export const LEVEL_2_SELECTED = getImage('./images/level2-selected.png');
export const LEVEL_3_SELECTED = getImage('./images/level3-selected.png');
export const LEVEL_4_SELECTED = getImage('./images/level4-selected.png');
export const LEVEL_5_SELECTED = getImage('./images/level5-selected.png');

export const PLAY_BTN = getImage('./images/playBtn.png');
export const PLAY_BTN_SELECTED = getImage('./images/playBtn-selected.png');
export const RETRY = getImage('./images/retryBtn.png');
export const RETRY_SELECTED = getImage('./images/retryBtn-selected.png');
export const NEXT = getImage('./images/nextBtn.png');
export const NEXT_SELECTED = getImage('./images/nextBtn-selected.png');
export const MENU = getImage('./images/menuBtn.png');
export const MENU_SELECTED = getImage('./images/menuBtn-selected.png');
export const BACK = getImage('./images/back.png');
export const BACK_SELECTED = getImage('./images/back-selected.png');
