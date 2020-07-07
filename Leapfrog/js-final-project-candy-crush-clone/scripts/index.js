import { CANVAS, CTX } from "./constants.js";
import Game from "./game.js";
import Candy from "./candy.js";
import {
  isPointInsideRect,
  isDragLimit,
  getRandomColor,
  sortCandies,
  swapArray,
} from "./helperFunc.js";

var game = new Game();

function init() {
  let id = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let color = getRandomColor();
      //params gameObject, xPos, yPos, color, id
      var candy = new Candy(game, j * 60, i * 60, color, id);
      id++;
      game.candies.push(candy);
    }
  }
}

init();

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  checkThreeRow();
  checkColumnForThree();
  //moveDown();  //uncomment for move down
  game.candies.forEach((candy) => {

    candy.draw();
  });
  requestAnimationFrame(draw);
}


draw();

function checkThreeRow() {
  for (let i = 0; i < game.candies.length - 2; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let color = game.candies[i].color;
    const notValid = [
      8,
      9,
      18,
      19,
      28,
      29,
      38,
      39,
      48,
      49,
      58,
      59,
      69,
      69,
      78,
      79,
      88,
      89,
      98,
      99,
    ];
    if (notValid.includes(i)) continue;

    if (rowOfThree.every((index) => game.candies[index].color === color)) {
      rowOfThree.forEach((index) => {
        game.candies[index].color = "black";
        game.candies[index].moveAboveCandy = true;
      });
    }
  }
}

function checkColumnForThree() {
  for (let i = 0; i < 80; i++) {
    let columnOfThree = [i, i + 10, i + 10 * 2];
    let color = game.candies[i].color;

    if (columnOfThree.every((index) => game.candies[index].color === color)) {
      columnOfThree.forEach((index) => {
        game.candies[index].color = "black";
      });
    }
  }
}

function moveDown() {
  for (let i = 0; i < 90; i++) {
    if (game.candies[i + 10].moveAboveCandy) {
      swapArray(game.candies, i, i + 10);
    }
  }
}

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
  for (let i = 0; i < game.candies.length; i++) {
    if (game.candies[i].isDragging && isDragLimit(mouse, game.candies[i])) {
      if (!isDragLimit(mouse, game.candies[i])) {
        game.candies[i].x = game.candies[i].realX;
        game.candies[i].y = game.candies[i].realY;
        game.candies[i].isDragging = false;
      } else {
        game.candies[i].dragDirection = isDragLimit(mouse, game.candies[i]);
        game.candies[i].x = mouse.x - game.candies[i].width / 2;
        game.candies[i].y = mouse.y - game.candies[i].height / 2;
        if (game.candies[i].dragDirection === "right") {
          swapArray(game.candies, i, i + 1);
        } else if (game.candies[i].dragDirection === "left") {
          swapArray(game.candies, i, i - 1);
        } else if (game.candies[i].dragDirection === "up") {
          swapArray(game.candies, i, i - 10);
        } else if (game.candies[i].dragDirection === "down") {
          swapArray(game.candies, i, i + 10);
        }
      }
    }
  }
});

CANVAS.addEventListener("mouseup", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };
  for (let i = 0; i < 100; i++) {
    if (isPointInsideRect(mouse, game.candies[i])) {
      game.candies[i].isDragging = false;
      game.candies[i].zIndex = 0;
      game.candies[i].x = game.candies[i].realX;
      game.candies[i].y = game.candies[i].realY;
    }
  }
});
