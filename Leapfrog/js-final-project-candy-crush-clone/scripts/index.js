import { CANVAS, CTX } from "./constants.js";
import {
  isPointInsideRect,
  isDragLimit,
  swapArray,
  sortCandies,
} from "./helperFunc.js";
import Game from "./game.js";
import Rules from "./rules.js";

var game = new Game();
var rules = new Rules(game);

function init() {
  game.createBoard();
  game.changeCandiesList();
  game.createCandiesBackground();
}
init();

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  game.candies = sortCandies(game.candies);
  game.candyBackground.forEach((bg) => {
    bg.draw();
  });
  rules.checkFiveRow();
  rules.checkFiveColumn();
  rules.checkFourRow();
  rules.checkFourColumn();
  rules.checkThreeRow();
  rules.checkThreeColumn();
  rules.moveDown();
  game.candies.forEach((candiesRow) => {
    candiesRow.forEach((candy) => {
      candy.draw();
    });
  });
  requestAnimationFrame(draw);
}
draw();

CANVAS.addEventListener("mousedown", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };
  game.candies.forEach((candyList) => {
    candyList.forEach((candy) => {
      if (isPointInsideRect(mouse, candy)) {
        candy.isDraggable = true;
        candy.zIndex = 1;
        game.draggedCandy.row = Math.floor(candy.id / game.col);
        game.draggedCandy.col = candy.id % game.row;
      }
    });
  });
});

CANVAS.addEventListener("mousemove", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };

  game.candies.forEach((candyList) => {
    candyList.forEach((candy) => {
      if (candy.isDraggable && isDragLimit(mouse, candy)) {
        candy.x = mouse.x - candy.width / 2;
        candy.y = mouse.y - candy.height / 2;

        let direction = isDragLimit(mouse, candy);
        let row = Math.floor(candy.id / game.row);
        let col = candy.id % game.col;

        if (direction === "right") {
          swapArray(game.board, row, col, row, col + 1);
          game.replacedCandy.row = row;
          game.replacedCandy.col = col + 1;
          game.changeCandiesList();
        } else if (direction === "left") {
          swapArray(game.board, row, col, row, col - 1);
          game.replacedCandy.row = row;
          game.replacedCandy.col = col - 1;
          game.changeCandiesList();
        } else if (direction === "up") {
          swapArray(game.board, row, col, row - 1, col);
          game.replacedCandy.row = row - 1;
          game.replacedCandy.col = col;
          game.changeCandiesList();
        } else if (direction === "down") {
          swapArray(game.board, row, col, row + 1, col);
          game.replacedCandy.row = row + 1;
          game.replacedCandy.col = col;
          game.changeCandiesList();
        }
      } else {
        candy.x = candy.realX;
        candy.y = candy.realY;
      }
    });
  });
});

CANVAS.addEventListener("mouseup", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };
  game.candies.forEach((candyList) => {
    candyList.forEach((candy) => {
      candy.isDraggable = false;
      candy.zIndex = 0;
    });
  });
});
