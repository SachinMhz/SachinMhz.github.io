export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function checkLeft(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width;
}
export function checkRight(obj1, obj2) {
  return obj1.x + obj1.width > obj2.x;
}
export function checkTop(obj1, obj2) {
  return obj1.y < obj2.y + obj2.height;
}
export function checkBottom(obj1, obj2) {
  return obj1.y + obj1.height > obj2.y;
}

export function drawImageContext(ctx, img, x, y, width, height) {
  ctx.beginPath();
  ctx.drawImage(img, x, y, width, height);
  ctx.stroke();
  ctx.closePath();
}

export function drawRectContext(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// return true if the rectangle and bird are colliding
export function isCollided2(bird, rect) {
  var distX = Math.abs(bird.x - rect.x - rect.width / 2);
  var distY = Math.abs(bird.y - rect.y - rect.height / 2);

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

export function isCollided(bird, rect) {
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
