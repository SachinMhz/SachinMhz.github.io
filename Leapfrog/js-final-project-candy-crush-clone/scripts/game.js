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
  this.checkCondition = true;
  this.shouldSwap = false;

  this.createBoard = () => {
    for (let i = 0; i < this.row; i++) {
      let row = [];
      for (let j = 0; j < this.col; j++) {
        row.push(getRandomColor());
      }
      this.board.push(row);
    }
  };

  this.changeCandiesList = () => {
    this.candies = [];
    let id = 0;
    for (let i = 0; i < this.row; i++) {
      let row = [];
      for (let j = 0; j < this.col; j++) {
        //params gameObject, xPos, yPos, color, id
        let color = this.board[i][j];
        var candy = new Candy(this, j, i, color, id);
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
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.board[row][col] === 0) {
          this.candies[row][col].color = 0; //this.candies[row - 1][col].color;

        }
      }
    }
  };

  this.animatingMoveDown = () => {
    //converting rows into cols
    for (let row = this.row - 2; row >= 0; row--) {
      for (let col = this.col; col >= 0; col--) {
        if (this.board[row + 1][col] === 0) {
          for (let dropRow = row; dropRow >= 0; dropRow--) {
            if (this.frame < 60 && this.isAnimating) {
              this.candies[dropRow][col].y += 1;
              this.candies[dropRow][col].realY += 1;
            } else {
              this.board[dropRow + 1][col] = this.candies[dropRow][col].color;

              // if (dropRow > 2)
              //   this.board[dropRow + 1][col] = this.candies[dropRow - 2][
              //     col
              //   ].color;
              this.frame = 0;
              this.isAnimating = false;
              this.checkCondition = false;
            }
          }
        }
      }
    }

    // //checking the column we are in
    // for (let row = this.row - 2; row >= 0; row--) {
    //   for (let col = this.col; col >= 0; col--) {
    //     if (this.board[row + 1][col] === "nothing")
    //       for (let shift = 0; shift < this.row; shift++) {
    //         let checkRow = row - shift;
    //         if (checkRow >= 0 && this.board[checkRow][col] !== "nothing") {
    //           swapArray(this.board, row + 1, col, row - shift, col);
    //           break;
    //         }
    //       }
    //   }
    // }
  };

  this.swapAnimation = () => {
    if (this.shouldSwap) {
      if (this.frame < 60) {
        if (this.swapDirection === "right") {
          this.candies[this.draggedCandy.row][this.draggedCandy.col].x += 1;
          this.candies[this.draggedCandy.row][this.draggedCandy.col].realX += 1;

          this.candies[this.replacedCandy.row][this.replacedCandy.col].x -= 1;
          this.candies[this.replacedCandy.row][
            this.replacedCandy.col
          ].realX -= 1;
        } else if (this.swapDirection === "left") {
          this.candies[this.draggedCandy.row][this.draggedCandy.col].x -= 1;
          this.candies[this.draggedCandy.row][this.draggedCandy.col].realX -= 1;

          this.candies[this.replacedCandy.row][this.replacedCandy.col].x += 1;
          this.candies[this.replacedCandy.row][
            this.replacedCandy.col
          ].realX += 1;
        } else if (this.swapDirection === "down") {
          this.candies[this.draggedCandy.row][this.draggedCandy.col].y += 1;
          this.candies[this.draggedCandy.row][this.draggedCandy.col].realY += 1;

          this.candies[this.replacedCandy.row][this.replacedCandy.col].y -= 1;
          this.candies[this.replacedCandy.row][
            this.replacedCandy.col
          ].realY -= 1;
        } else if (this.swapDirection === "up") {
          this.candies[this.draggedCandy.row][this.draggedCandy.col].y -= 1;
          this.candies[this.draggedCandy.row][this.draggedCandy.col].realY -= 1;

          this.candies[this.replacedCandy.row][this.replacedCandy.col].y += 1;
          this.candies[this.replacedCandy.row][
            this.replacedCandy.col
          ].realY += 1;
        }
      } else {
        this.frame = 0;
        this.isAnimating = false;
        this.checkCondition = false;
        this.shouldSwap = false;
      }
    }
  };
}
