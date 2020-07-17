import { CANVAS, CTX } from "./constants.js";
import { isPointInsideRect, isDragLimit, isMouseInside } from "./helperFunc.js";
import Game from "./game.js";
import Power from "./power.js";
import Score from "./score.js";
import Rules from "./rules.js";
import { audio } from "./audio.js";
import Preloader from "./preloader.js";

function Main() {
  var game = new Game();
  var score = new Score(game);
  var power = new Power(game);
  var rules = new Rules(game, power, score);
  var preloader = new Preloader();
  preloader.load(()=>{
    console.log("there")
    this.init();
    this.draw();
  })

  this.init = () => {
    audio.level_bg();
    game.createBoard();
    game.changeCandiesList();
    game.createCandiesBackground();
  };

  this.draw = () => {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    //game.candies = sortCandies(game.candies);
    game.candyBackground.forEach((bg) => {
      bg.draw();
    });
    //checks matched candies and start animation
    rules.checkZero();

    // check match case in the board
    rules.checkFiveRow();
    rules.checkFiveColumn();
    rules.checkPacket();
    rules.checkFourRow();
    rules.checkFourColumn();
    rules.checkThreeRow();
    rules.checkThreeColumn();

    // check if dragged or replaced candies have power
    if (game.isDragged) {
      power.colorBombPower();
      power.twoStripedCandies();
      power.stripAndPacket();
      power.packetAndPacket();
      game.isDragged = false;
    }

    // remove candies from display
    game.replaceZero();

    //start moving down animaton
    if (game.isAnimating) {
      game.frame += 1;
      game.animatingMoveDown();
    }

    // start swapping animation
    if (game.isSwapping) {
      game.swapFrame += 1;
      game.swapAnimation();
    }

    // checks if all the candies are dropped and start exploding packet the second time
    if (!game.isAnimating && game.willExplodePacket) {
      setTimeout(() => {
        if (game.isAnimating === false) {
          power.packetSecondExplosion();
          power.doublePacketSecondExplosion();
          game.willExplodePacket = false;
        }
      }, 100);
    }

    //displays score
    score.draw();

    //displays candies in the game
    game.candies.forEach((candiesRow) => {
      candiesRow.forEach((candy) => {
        candy.draw();
      });
    });

    requestAnimationFrame(this.draw);
  };

  CANVAS.addEventListener("mousedown", (e) => {
    var mouse = {
      x: e.offsetX,
      y: e.offsetY,
    };

    game.candies.forEach((candyList) => {
      candyList.forEach((candy) => {
        if (isPointInsideRect(mouse, candy)) {
          candy.isDraggable = true;
          game.draggedCandy.row = Math.floor(candy.id / game.col) + game.row;
          game.draggedCandy.col = candy.id % game.row;
          game.draggedCandy.color =
            game.board[game.draggedCandy.row][game.draggedCandy.col];
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
        if (
          candy.isDraggable &&
          isDragLimit(mouse, candy) &&
          !game.isAnimating
        ) {
          candy.x = mouse.x - candy.width / 2;
          candy.y = mouse.y - candy.height / 2;

          let direction = isDragLimit(mouse, candy);

          let row = Math.floor(candy.id / game.row) + game.row;
          let col = candy.id % game.col;
          if (direction !== "center") {
            if (direction === "right") {
              game.replacedCandy.row = row;
              game.replacedCandy.col = col + 1;
              game.replacedCandy.color = game.board[row][col + 1];
              game.swapDirection = "right";
            } else if (direction === "left") {
              game.replacedCandy.row = row;
              game.replacedCandy.col = col - 1;
              game.replacedCandy.color = game.board[row][col - 1];
              game.swapDirection = "left";
            } else if (direction === "up") {
              game.replacedCandy.row = row - 1;
              game.replacedCandy.col = col;
              game.replacedCandy.color = game.board[row - 1][col];
              game.swapDirection = "up";
            } else if (direction === "down") {
              game.replacedCandy.row = row + 1;
              game.replacedCandy.col = col;
              game.replacedCandy.color = game.board[row + 1][col];
              game.swapDirection = "down";
            }
            //if player swaps the candies :
            candy.isDraggable = false;
            //  if (rules.checkValidMove()) {
            game.isSwapping = true;
            audio.swap();
            score.moves -= 1;
            //  }
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
    console.log(game.isAnimating, game.frame);

    game.candies.forEach((candyList) => {
      candyList.forEach((candy) => {
        candy.isDraggable = false;
        candy.zIndex = 0;
      });
    });
  });
}

var newGame = new Main();
