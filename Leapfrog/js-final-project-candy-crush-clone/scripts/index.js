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
import { randomInt } from "./helperFunc.js";
import Background from "./candyBG.js";

var game = new Game();
var map = [];
var candyBackground = [];
for (let i = 0; i < 10; i++) {
  let row = [];
  for (let j = 0; j < 10; j++) {
    row.push(randomInt(1, 6));
  }
  map.push(row);
}

function changeCandiesList() {
  game.candies = [];
  let id = 0;
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      //params gameObject, xPos, yPos, color, id
      let color = null;
      switch (map[i][j]) {
        case 1:
          color = "red";
          break;
        case 2:
          color = "blue";
          break;
        case 3:
          color = "green";
          break;
        case 4:
          color = "yellow";
          break;
        case 5:
          color = "orange";
          break;
        default:
          color = "black";
      }
      var candy = new Candy(game, j, i, color, id);
      row.push(candy);
      id++;
    }
    game.candies.push(row);
  }
}
changeCandiesList();
function init() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      candyBackground.push(new Background(j, i, "bg1"));
    }
  }
}
init();
function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  candyBackground.forEach((bg) => {
    bg.draw();
  });
  checkThreeRow();
  checkThreeColumn();
  moveDown();
  game.candies.forEach((candiesRow) => {
    candiesRow.forEach((candy) => {
      candy.draw();
    });
  });
  requestAnimationFrame(draw);
}
draw();

function checkThreeRow() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length - 2; j++) {
      let rowOfThree = [j, j + 1, j + 2];
      let value = map[i][j];
      if (rowOfThree.every((index) => map[i][index] === value)) {
        rowOfThree.forEach((index) => {
          map[i][index] = 0;
          changeCandiesList();
        });
      }
    }
  }
}

function checkThreeColumn() {
  for (let i = 0; i < map.length - 2; i++) {
    for (let j = 0; j < map.length; j++) {
      let columnOfThree = [i, i + 1, i + 2];
      let value = map[i][j];
      if (columnOfThree.every((index) => map[index][j] === value)) {
        columnOfThree.forEach((index) => {
          map[index][j] = 0;
          changeCandiesList();
        });
      }
    }
  }
}

function moveDown() {
  for (let row = map.length - 2; row >= 0; row--) {
    for (let col = map[0].length; col >= 0; col--) {
      if (map[row + 1][col] === 0) {
        swapArray(map, row + 1, col, row, col);
        changeCandiesList();
      }
      if (map[0][col] === 0) {
        map[row][col] = randomInt(1, 6);
        changeCandiesList();
      }
    }
  }
}

CANVAS.addEventListener("mousedown", (e) => {
  var mouse = {
    x: e.offsetX,
    y: e.offsetY,
  };
  game.candies.forEach((candyList) => {
    candyList.forEach((candy) => {
      if (isPointInsideRect(mouse, candy)) {
        candy.isDraggable = true;
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
        let row = Math.floor(candy.id / 10);
        let col = candy.id % 10;

        if (direction === "right") {
          swapArray(map, row, col, row, col + 1);
          changeCandiesList();
        } else if (direction === "left") {
          swapArray(map, row, col, row, col - 1);
          changeCandiesList();
        } else if (direction === "up") {
          swapArray(map, row, col, row - 1, col);
          changeCandiesList();
        } else if (direction === "down") {
          swapArray(map, row, col, row + 1, col);
          changeCandiesList();
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
    });
  });
});
