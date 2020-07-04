//returns random integer excluding max value
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//draw an image to context
export function drawImageContext(ctx, img, x, y, width, height) {
  ctx.beginPath();
  ctx.drawImage(img, x, y, width, height);
  ctx.stroke();
  ctx.closePath();
}

//draw rect to the context
export function drawRectContext(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// check collision between circle and rectangle
//return true if the rectangle and bird are colliding
export function isCollided(bird, rect) {
  let birdX = bird.x + bird.width / 2;
  let birdY = bird.y + bird.height / 2;
  var distX = Math.abs(birdX - rect.x - rect.width / 2);
  var distY = Math.abs(birdY - rect.y - rect.height / 2);

  if (distX > rect.width / 2 + bird.radius) {
    return false;
  }
  if (distY > rect.height / 2 + bird.radius) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.height / 2) {
    return true;
  }

  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= bird.radius * bird.radius;
}

// checks rectangular collision between two rectangular objects//
export function isCollided2(bird, rect) {
  if (
    bird.x < rect.x + rect.width &&
    bird.x + bird.width > rect.x &&
    bird.y < rect.y + rect.height &&
    bird.y + bird.height > rect.y
  ) {
    return true;
  } else {
    return false;
  }
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
