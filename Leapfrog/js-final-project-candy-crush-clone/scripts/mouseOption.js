import { CANVAS } from "./constants.js";
import { isPointInsideRect, isMouseInside, isDragLimit } from "./helperFunc.js";
import { audio } from "./audio.js";

export default function MouseOption() {
  this.down = ({
    game,
    mouse,
    screen,
    startMenu,
    levels,
    gameOver,
    gameComplete,
  }) => {
    if (screen.show === "Start Menu") {
      if (isPointInsideRect(mouse, startMenu.playBtn)) {
        screen.show = "Levels";
      }
    } else if (screen.show === "Levels") {
      if (isPointInsideRect(mouse, levels.backBtn)) {
        screen.show = "Start Menu";
      } else if (isPointInsideRect(mouse, levels.oneBtn)) {
        game.level = 1;
        screen.show = "Game";
      } else if (isPointInsideRect(mouse, levels.twoBtn)) {
        game.level = 2;
        screen.show = "Game";
      } else if (isPointInsideRect(mouse, levels.threeBtn)) {
        game.level = 3;
        screen.show = "Game";
      } else if (isPointInsideRect(mouse, levels.fourBtn)) {
        game.level = 4;
        screen.show = "Game";
      } else if (isPointInsideRect(mouse, levels.fiveBtn)) {
        game.level = 5;
        screen.show = "Game";
      }
    } else if (screen.show === "Game") {
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
    } else if (screen.show === "Game Over") {
      if (isPointInsideRect(mouse, gameOver.retryBtn)) {
        screen.show = "Game";
      } else if (isPointInsideRect(mouse, gameOver.menuBtn)) {
        screen.show = "Levels";
      }
    } else if (screen.show === "Game Complete") {
      if (isPointInsideRect(mouse, gameComplete.nextBtn)) {
        game.level = game.level == 5 ? 1 : game.level + 1;
        screen.show = "Game";
      } else if (isPointInsideRect(mouse, gameComplete.menuBtn)) {
        screen.show = "Levels";
      }
    }
  };

  this.move = ({
    game,
    mouse,
    screen,
    score,
    startMenu,
    levels,
    gameOver,
    gameComplete,
  }) => {
    if (screen.show === "Start Menu") {
      startMenu.isSelected = isPointInsideRect(mouse, startMenu.playBtn);
    } else if (screen.show === "Levels") {
      levels.backSelected = isPointInsideRect(mouse, levels.backBtn);
      levels.oneSelected = isPointInsideRect(mouse, levels.oneBtn);
      levels.twoSelected = isPointInsideRect(mouse, levels.twoBtn);
      levels.threeSelected = isPointInsideRect(mouse, levels.threeBtn);
      levels.fourSelected = isPointInsideRect(mouse, levels.fourBtn);
      levels.fiveSelected = isPointInsideRect(mouse, levels.fiveBtn);
    } else if (screen.show === "Game") {
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
    } else if (screen.show === "Game Over") {
      gameOver.retrySelected = isPointInsideRect(mouse, gameOver.retryBtn);
      gameOver.menuSelected = isPointInsideRect(mouse, gameOver.menuBtn);
    } else if (screen.show === "Game Complete") {
      gameComplete.nextSelected = isPointInsideRect(
        mouse,
        gameComplete.nextBtn
      );
      gameComplete.menuSelected = isPointInsideRect(
        mouse,
        gameComplete.menuBtn
      );
    }
  };

  this.up = ({ game, mouse, screen }) => {
    //screen.show = "Game";
    if (screen === "Game") {
      game.candies.forEach((candyList) => {
        candyList.forEach((candy) => {
          candy.isDraggable = false;
          candy.zIndex = 0;
        });
      });
    }
  };
}
