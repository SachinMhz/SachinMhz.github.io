import { isPointInsideRect, isDragLimit } from '../utils/helperFunc.js';

/**
 *
 * @param {object} { game, screen, startMenu, gameOver, gameComplete, levels, score, rules, audios}
 */
export default function MouseOption({
  game,
  screen,
  startMenu,
  gameOver,
  gameComplete,
  levels,
  score,
  rules,
  audios,
}) {
  /** clears the score and game board */
  this.clear = () => {
    audios.pressed();
    game.clearGame();
    score.clearScore();
    score.onChangeScreen();
  };

  /** functionality when mouse left button is pressed down  */
  this.down = (mouse) => {
    //mouse action when screen is start menu
    if (screen.show === 'Start Menu') {
      if (isPointInsideRect(mouse, startMenu.playBtn)) {
        screen.show = 'Levels';
        audios.stopBG();
        audios.level_bg();
        this.clear();
      }
    }
    //
    else if (screen.show === 'Levels') {
      game.clearGame();
      score.clearScore();
      if (isPointInsideRect(mouse, levels.backBtn)) {
        screen.show = 'Start Menu';
        this.clear();
      } else if (isPointInsideRect(mouse, levels.oneBtn)) {
        game.level = 1;
        score.highScore = localStorage.getItem('level1') || 0;
        screen.show = 'Game';
        this.clear();
      } else if (isPointInsideRect(mouse, levels.twoBtn)) {
        game.level = 2;
        score.highScore = localStorage.getItem('level2') || 0;
        screen.show = 'Game';
        this.clear();
      } else if (isPointInsideRect(mouse, levels.threeBtn)) {
        game.level = 3;
        score.highScore = localStorage.getItem('level3') || 0;
        screen.show = 'Game';
        this.clear();
      } else if (isPointInsideRect(mouse, levels.fourBtn)) {
        game.level = 4;
        score.highScore = localStorage.getItem('level4') || 0;
        screen.show = 'Game';
        this.clear();
      } else if (isPointInsideRect(mouse, levels.fiveBtn)) {
        game.level = 5;
        score.highScore = localStorage.getItem('level5') || 0;
        screen.show = 'Game';
        this.clear();
        score.moves = 3;
      }
    }
    //
    else if (screen.show === 'Game') {
      //loops over all candies to see if that candy is clicked
      //also set the dragged and replaced candy in the game object
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
    }
    //
    else if (screen.show === 'Game Over') {
      if (isPointInsideRect(mouse, gameOver.retryBtn)) {
        screen.show = 'Game';
        this.clear();
      } else if (isPointInsideRect(mouse, gameOver.menuBtn)) {
        screen.show = 'Levels';
        this.clear();
      }
    }
    //
    else if (screen.show === 'Game Complete') {
      if (isPointInsideRect(mouse, gameComplete.nextBtn)) {
        game.level = game.level == 5 ? 1 : game.level + 1;
        screen.show = 'Game';
        this.clear();
      } else if (isPointInsideRect(mouse, gameComplete.menuBtn)) {
        screen.show = 'Levels';
        this.clear();
      }
    }
  };

  /** functionality when mouse is moved in the canvas  */
  this.move = (mouse) => {
    if (screen.show === 'Start Menu') {
      //change the image of btn the mouse is over
      startMenu.isSelected = isPointInsideRect(mouse, startMenu.playBtn);
    }
    //
    else if (screen.show === 'Levels') {
      levels.backSelected = isPointInsideRect(mouse, levels.backBtn);
      levels.oneSelected = isPointInsideRect(mouse, levels.oneBtn);
      levels.twoSelected = isPointInsideRect(mouse, levels.twoBtn);
      levels.threeSelected = isPointInsideRect(mouse, levels.threeBtn);
      levels.fourSelected = isPointInsideRect(mouse, levels.fourBtn);
      levels.fiveSelected = isPointInsideRect(mouse, levels.fiveBtn);
    }
    //
    else if (screen.show === 'Game') {
      //change the background od candy the mouse is over
      game.candyBackground.forEach((candyBg) => {
        candyBg.bg = isPointInsideRect(mouse, candyBg) ? 'bg1-selected' : 'bg1';
      });

      game.candies.forEach((candyList) => {
        candyList.forEach((candy) => {
          if (
            candy.isDraggable &&
            isDragLimit(mouse, candy) &&
            !game.isAnimating
          ) {
            //move the candy to the location of the mouse
            candy.x = mouse.x - candy.width / 2;
            candy.y = mouse.y - candy.height / 2;

            let direction = isDragLimit(mouse, candy);

            //get the row and col of the selected candy
            let row = Math.floor(candy.id / game.row) + game.row;
            let col = candy.id % game.col;

            if (direction !== 'center' && score.moves > 0) {
              //if the selected candy is dragged either left right, top or down
              // it changes the replaced candy variable in game object
              if (direction === 'right') {
                game.replacedCandy.row = row;
                game.replacedCandy.col = col + 1;
                game.replacedCandy.color = game.board[row][col + 1];
                game.swapDirection = 'right';
              } else if (direction === 'left') {
                game.replacedCandy.row = row;
                game.replacedCandy.col = col - 1;
                game.replacedCandy.color = game.board[row][col - 1];
                game.swapDirection = 'left';
              } else if (direction === 'up') {
                game.replacedCandy.row = row - 1;
                game.replacedCandy.col = col;
                game.replacedCandy.color = game.board[row - 1][col];
                game.swapDirection = 'up';
              } else if (direction === 'down') {
                game.replacedCandy.row = row + 1;
                game.replacedCandy.col = col;
                game.replacedCandy.color = game.board[row + 1][col];
                game.swapDirection = 'down';
              }
              //if player swaps the candies :
              candy.isDraggable = false;
              if (rules.checkValidMove()) {
                game.isSwapping = true;
                audios.swap();
                score.moves -= 1;
              }
            }
          } else {
            //if candy is not dragged further reset the candy position
            candy.x = candy.realX;
            candy.y = candy.realY;
          }
        });
      });
    }
    //
    else if (screen.show === 'Game Over') {
      gameOver.retrySelected = isPointInsideRect(mouse, gameOver.retryBtn);
      gameOver.menuSelected = isPointInsideRect(mouse, gameOver.menuBtn);
    }
    //
    else if (screen.show === 'Game Complete') {
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

  this.up = (mouse) => {
    //resetting the position of candy
    if (screen.show === 'Game') {
      game.candies.forEach((candyList) => {
        candyList.forEach((candy) => {
          candy.isDraggable = false;
        });
      });
    }
  };
}
