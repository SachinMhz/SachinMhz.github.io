import { CANVAS, CTX } from "./constants.js";
import Game from "./game.js";
import Candy from "./candy.js";
import {
  isPointInsideRect,
  isDragLimit,
  getRandomColor,
  sortCandies,
} from "./helperFunc.js";

var game = new Game();
console.log("game started");
function init() {
  let id = 0
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let color = getRandomColor();
      //params gameObject, xPos, yPos, color, id
      var candy = new Candy(game, j * 60, i * 60, color ,id);
      id++;
      game.candies.push(candy);
    }
  }
}

init();

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  game.candies = sortCandies(game.candies);
  game.candies.forEach((candy) => {
    candy.draw();
  });
  requestAnimationFrame(draw);
}

draw();

CANVAS.addEventListener("mousedown", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };

  game.candies.forEach((candy) => {
    if (isPointInsideRect(mouse, candy)) {
      candy.isDragging = true;
      candy.zIndex = 1;
    }
  });
});

CANVAS.addEventListener("mousemove", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };
  game.candies.forEach((candy) => {
    if (candy.isDragging) {
      if (!isDragLimit(mouse, candy)) {
        candy.x = candy.realX;
        candy.y = candy.realY;
        candy.isDragging = false;
      } else {
        candy.x = mouse.x - candy.width / 2;
        candy.y = mouse.y - candy.height / 2;
      }
    }
  });
});

CANVAS.addEventListener("mouseup", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };
  game.candies.forEach((candy) => {
    if (isPointInsideRect(mouse, candy)) {
      candy.isDragging = false;
      candy.zIndex = 0;
      candy.x = candy.realX;
      candy.y = candy.realY;
    }
  });
});
