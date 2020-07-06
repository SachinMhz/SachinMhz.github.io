//returns random integer excluding max value
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//return random color value
export function getRandomColor() {
  let candiesColor = ["red", "blue", "green", "purple", "yellow", "orange"];
  return candiesColor[randomInt(0, candiesColor.length)];
}

//draw an image to context
export function drawImageContext(ctx, img, x, y, width, height) {
  ctx.beginPath();
  ctx.drawImage(img, x, y, width, height);
  ctx.stroke();
  ctx.closePath();
}

//draw rect to the context
export function drawRectContext(ctx, x, y, width, height, color) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

export function sortCandies(array) {
  var result = array.sort(function (a, b) {
    if (a.zIndex < b.zIndex) {
      return -1;
    }
    if (a.zIndex > b.zIndex) {
      return 1;
    }
    return 0;
  });
  return result;
}

export function isDragLimit(mouse, candy) {
  if (
    mouse.x > candy.realX - candy.width / 2 - 10 &&
    mouse.x < candy.realX + candy.width * 1.5 + 10 &&
    mouse.y > candy.realY - candy.height / 2 - 10 &&
    mouse.y < candy.realY + candy.height * 1.5 + 10
  ) {
    return true;
  }
  return false;
}
export function isPointInsideRect(point, rect) {
  //console.log(point, rect.x, rect.y);
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
