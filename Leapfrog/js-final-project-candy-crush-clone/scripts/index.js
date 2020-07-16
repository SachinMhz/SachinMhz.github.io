import { CANVAS, CTX } from "./constants.js";
import { isPointInsideRect, isDragLimit, isMouseInside } from "./helperFunc.js";
import Game from "./game.js";
import Power from "./power.js";
import Score from "./score.js";
import Rules from "./rules.js";
import { Audio } from "./audio.js";

var game = new Game();
var score = new Score(game);
var power = new Power(game);
var rules = new Rules(game, power, score);

function init() {
  Audio.level_bg();
  game.createBoard();
  game.changeCandiesList();
  game.createCandiesBackground();
}
init();

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  //game.candies = sortCandies(game.candies);
  game.candyBackground.forEach((bg) => {
    bg.draw();
  });
  rules.checkZero();

  rules.checkFiveRow();
  rules.checkFiveColumn();
  rules.checkPacket();
  rules.checkFourRow();
  rules.checkFourColumn();
  rules.checkThreeRow();
  rules.checkThreeColumn();

  game.replaceZero();
  if (game.isAnimating) {
    game.frame += 1;
    game.animatingMoveDown();
  }
  if (game.isSwapping) {
    game.swapFrame += 1;
    game.swapAnimation();
  }
  score.draw();
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
  //game.frame = 0;
  game.candies.forEach((candyList) => {
    candyList.forEach((candy) => {
      if (isPointInsideRect(mouse, candy)) {
        candy.isDraggable = true;
        candy.zIndex = 1;
        game.draggedCandy.row = Math.floor(candy.id / game.col) + game.row;
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

  game.candyBackground.forEach((candyBg) => {
    candyBg.bg = isMouseInside(mouse, candyBg) ? "bg1-selected" : "bg1";
  });

  game.candies.forEach((candyList) => {
    candyList.forEach((candy) => {
      if (candy.isDraggable && isDragLimit(mouse, candy) && !game.isAnimating) {
        candy.x = mouse.x - candy.width / 2;
        candy.y = mouse.y - candy.height / 2;

        let direction = isDragLimit(mouse, candy);

        let row = Math.floor(candy.id / game.row) + game.row;
        let col = candy.id % game.col;
        if (direction !== "center") {
          if (direction === "right") {
            game.replacedCandy.row = row;
            game.replacedCandy.col = col + 1;
            game.swapDirection = "right";
          } else if (direction === "left") {
            game.replacedCandy.row = row;
            game.replacedCandy.col = col - 1;
            game.swapDirection = "left";
          } else if (direction === "up") {
            game.replacedCandy.row = row - 1;
            game.replacedCandy.col = col;
            game.swapDirection = "up";
          } else if (direction === "down") {
            game.replacedCandy.row = row + 1;
            game.replacedCandy.col = col;
            game.swapDirection = "down";
          }
          //if player swaps the candies :
          candy.isDraggable = false;
          //if (rules.checkValidMove()) {
          game.isSwapping = true;
          Audio.swap();
          power.colorBombPower();
          power.twoStripedCandies();
          power.stripAndPacket();
          power.packetAndPacket();
          score.moves -= 1;
          //}
        }
      } else {
        candy.x = candy.realX;
        candy.y = candy.realY;
      }
    });
  });
});

CANVAS.addEventListener("mouseup", (e) => {
  console.log("board", game.board.slice(game.row, game.row * 2));
  //console.log("candies", game.draggedCandy, game.replacedCandy);

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
