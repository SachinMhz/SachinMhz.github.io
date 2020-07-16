import { randomInt, getRandomColor, swapArray } from "./helperFunc.js";
import Candy from "./candy.js";
import Background from "./candyBG.js";
import { CANDY_HEIGHT } from "./constants.js";

export default function Game() {
  this.candies = [];
  this.candyBackground = [];
  this.board = [];
  this.row = 10;
  this.col = 10;
  this.draggedCandy = { row: 0, col: 0 };
  this.replacedCandy = { row: 0, col: 1 };
  this.swapDirection = null;
  this.isAnimating = false;
  this.animationTime = CANDY_HEIGHT;
  this.frame = 0;
  this.swapFrame = 0;
  this.checkCondition = true;
  this.isSwapping = false;

  this.createBoard = () => {
    for (let i = 0; i < this.row * 2; i++) {
      let row = [];
      for (let j = 0; j < this.col; j++) {
        row.push(getRandomColor());
      }
      this.board.push(row);
    }
  };

  this.changeCandiesList = () => {
    this.candies = [];
    let id = -this.row * this.col;
    for (let yVal = 0; yVal < this.row * 2; yVal++) {
      let row = [];
      for (let xVal = 0; xVal < this.col; xVal++) {
        //params gameObject, xPos, yPos, color, id
        let color = this.board[yVal][xVal];
        var candy = new Candy(this, xVal, yVal - this.row, color, id);
        row.push(candy);
        id++;
      }
      this.candies.push(row);
    }
  };

  this.createCandiesBackground = () => {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.candyBackground.push(new Background(j, i, "bg1"));
      }
    }
  };

  this.replaceZero = () => {
    //removing candies with zero value from screen
    for (let row = this.row; row < this.row * 2; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.board[row][col] === 0) {
          this.candies[row][col].color = 0; //this.candies[row - 1][col].color;
        }
      }
    }

    // making new candies at the top
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.board[row][col] === 0) {
          this.board[row][col] = getRandomColor(); //this.candies[row - 1][col].color;
        }
      }
    }
  };

  this.animatingMoveDown = () => {
    for (let row = this.row * 2 - 2; row >= this.row - 1; row--) {
      for (let col = this.col; col >= 0; col--) {
        if (this.board[row + 1][col] === 0) {
          for (let dropRow = row; dropRow >= 0; dropRow--) {
            if (this.frame <= 30 && this.isAnimating) {
              this.candies[dropRow][col].y += 2;
              this.candies[dropRow][col].realY += 2;
            } else {
              let zeroCount = 0;
              for (let k = dropRow; k < this.row * 2; k++) {
                if (this.board[k][col] === 0) {
                  zeroCount += 1;
                }
              }
              if (this.board[dropRow][col] !== 0) {
                // this.board[dropRow + zeroCount][col] = this.candies[dropRow][
                //   col
                // ].color;
                swapArray(this.board, dropRow + zeroCount, col, dropRow, col);
              }

              this.frame = 0;
              this.isAnimating = false;
              this.checkCondition = false;
              this.changeCandiesList();
            }
          }
        }
      }
    }
  };

  this.swapAnimation = () => {
    let speed = 3;
    let dRow = this.draggedCandy.row;
    let dCol = this.draggedCandy.col;
    let rRow = this.replacedCandy.row;
    let rCol = this.replacedCandy.col;

    if (this.isSwapping) {
      if (this.swapFrame <= 20) {
        if (this.swapDirection === "right") {
          this.candies[dRow][dCol].x += speed;
          this.candies[dRow][dCol].realX += speed;

          this.candies[rRow][rCol].x -= speed;
          this.candies[rRow][rCol].realX -= speed;
        } else if (this.swapDirection === "left") {
          this.candies[dRow][dCol].x -= speed;
          this.candies[dRow][dCol].realX -= speed;

          this.candies[rRow][rCol].x += speed;
          this.candies[rRow][rCol].realX += speed;
        } else if (this.swapDirection === "down") {
          this.candies[dRow][dCol].y += speed;
          this.candies[dRow][dCol].realY += speed;

          this.candies[rRow][rCol].y -= speed;
          this.candies[rRow][rCol].realY -= speed;
        } else if (this.swapDirection === "up") {
          this.candies[dRow][dCol].y -= speed;
          this.candies[dRow][dCol].realY -= speed;

          this.candies[rRow][rCol].y += speed;
          this.candies[rRow][rCol].realY += speed;
        }
      } else {
        this.isSwapping = false;
        this.swapFrame = 0;
        swapArray(
          this.board,
          this.draggedCandy.row,
          this.draggedCandy.col,
          this.replacedCandy.row,
          this.replacedCandy.col
        );

        this.changeCandiesList();
      }
    }
  };
}
