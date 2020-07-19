import { CANDY_COLOR } from './constants.js';

//returns random integer excluding max value
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//return random color value
export function getRandomColor() {
  let candiesColor = CANDY_COLOR;
  return candiesColor[randomInt(0, candiesColor.length)];
}

//draw an image to context
export function drawImageContext(ctx, img, x, y, width, height) {
  ctx.beginPath();
  ctx.drawImage(img, x, y, width, height);
  ctx.stroke();
  ctx.closePath();
}

/** finds out if the direction of the mouse moved */
export function isDragLimit(mouse, candy) {
  //mouse inside the selected candy boundary
  if (
    mouse.x >= candy.realX &&
    mouse.x <= candy.realX + candy.width &&
    mouse.y >= candy.realY &&
    mouse.y <= candy.realY + candy.height
  ) {

    return 'center';
  }
  //mouse outside the self boundary to the right side
  else if (
    mouse.x > candy.realX + candy.width &&
    mouse.x < candy.realX + candy.width * 2 &&
    mouse.y > candy.realY &&
    mouse.y < candy.realY + candy.height
  ) {

    return 'right';
  }
  //mouse outside the self boundary to the left side
  else if (
    mouse.x < candy.realX &&
    mouse.x > candy.realX - candy.width &&
    mouse.y > candy.realY &&
    mouse.y < candy.realY + candy.height
  ) {

    return 'left';
  }
  //mouse outside the self boundary to the above
  else if (
    mouse.x > candy.realX &&
    mouse.x < candy.realX + candy.width &&
    mouse.y > candy.realY - candy.height &&
    mouse.y < candy.realY
  ) {

    return 'up';
  }
  //mouse outside the self boundary to the below
  else if (
    mouse.x > candy.realX &&
    mouse.x <= candy.realX + candy.width &&
    mouse.y > candy.realY + candy.height &&
    mouse.y < candy.realY + candy.height * 2
  ) {

    return 'down';
  }

  return false;
}

/**  returns if the point is inside or outside a given rectangular object */
export function isPointInsideRect(point, rect) {
  //mouse position inside the selected candy
  if (
    point.x > rect.x &&
    point.x < rect.x + rect.width &&
    point.y > rect.y &&
    point.y < rect.y + rect.height
  ) {

    return true;
  }

  return false;
}
 /** swaps element of 2d array */
export function swapArray(array, row1, col1, row2, col2) {
  let temp = array[row1][col1];
  array[row1][col1] = array[row2][col2];
  array[row2][col2] = temp;
}

// responsible to get Image from path
export function getImage(path) {
  let image = new Image();
  image.src = path;

  return image;
}

// responsible to get audio from path
export function getAudio(path) {
  let audio = new Audio();
  audio.src = path;

  return audio;
}
// responsible to play audio
export function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
