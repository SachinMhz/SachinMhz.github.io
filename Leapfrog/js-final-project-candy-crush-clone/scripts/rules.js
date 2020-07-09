import { swapArray, randomInt, getRandomColor } from "./helperFunc.js";
import { CANDY_POINT } from "./constants.js";

export default function Rules(game, score) {
  this.game = game;
  this.score = score;

  this.checkThreeRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = this.game.board[i][j];

        if (
          game.checkCondition &&
          checkIdx.every((index) => this.game.board[i][index][0] === value[0])
        ) {
          this.game.isAnimating = true;
          this.score.score += 3 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(i, index);
            this.game.board[i][index] = 0;
          });
        }
      }
    }
  };

  this.checkThreeColumn = () => {
    for (let i = 0; i < this.game.row - 2; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = this.game.board[i][j];
        if (
          game.checkCondition &&
          checkIdx.every((index) => this.game.board[index][j][0] === value[0])
        ) {
          this.game.isAnimating = true;
          this.score.score += 3 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(index, j);
            this.game.board[index][j] = 0;
          });
        }
      }
    }
  };

  this.checkFourRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 3; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[i][index] === value)) {
          this.score.score += 4 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
            if (dragRow === i && dragCol === index) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] =
                game.candies[dragRow][dragCol].color + "c";
            }
            if (replRow === i && replCol === index) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] =
                game.candies[replRow][replCol].color + "c";
            }
          });
          if (!isReasonDrag)
            this.game.board[i][j] = game.candies[i][j].color + "c";
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFourColumn = () => {
    for (let i = 0; i < this.game.row - 3; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[index][j] === value)) {
          this.score.score += 4 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
            if (dragRow === index && dragCol === j) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] =
                game.candies[dragRow][dragCol].color + "r";
            }
            if (replRow === index && replCol === j) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] =
                game.candies[replRow][replCol].color + "r";
            }
          });
          if (!isReasonDrag)
            this.game.board[i][j] = game.candies[i][j].color + "r";
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFiveRow = () => {
    for (let i = 0; i < this.game.row; i++) {
      for (let j = 0; j < this.game.col - 4; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3, j + 4];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[i][index] === value)) {
          this.score.score += 5 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[i][index] = 0;
            if (dragRow === i && dragCol === index) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] = "cb";
            }
            if (replRow === i && replCol === index) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] = "cb";
            }
          });
          if (!isReasonDrag) this.game.board[i][j] = "cb";
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.checkFiveColumn = () => {
    for (let i = 0; i < this.game.row - 4; i++) {
      for (let j = 0; j < this.game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3, i + 4];
        let value = this.game.board[i][j];

        let dragRow = this.game.draggedCandy.row;
        let dragCol = this.game.draggedCandy.col;
        let replRow = this.game.replacedCandy.row;
        let replCol = this.game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => this.game.board[index][j] === value)) {
          this.score.score += 5 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.game.board[index][j] = 0;
            if (dragRow === index && dragCol === j) {
              isReasonDrag = true;
              this.game.board[dragRow][dragCol] = "cb";
            }
            if (replRow === index && replCol === j) {
              isReasonDrag = true;
              this.game.board[replRow][replCol] = "cb";
            }
          });
          if (!isReasonDrag) this.game.board[i][j] = "cb";
          //this.game.changeCandiesList();
        }
      }
    }
  };

  this.destroyEntireCol = (_row, col) => {
    this.game.board[_row][col] = 0;
    console.log("destroy col");
    this.score.score += this.game.col * CANDY_POINT;
    for (let row = 0; row < this.game.row; row++) {
      this.checkForPower(row, col);
      this.game.board[row][col] = 0;
    }
  };

  this.destroyEntireRow = (row, _col) => {
    this.game.board[row][_col] = 0;
    console.log("destroy row");
    this.score.score += this.game.row * CANDY_POINT;
    for (let col = 0; col < this.game.col; col++) {
      this.checkForPower(row, col);
      this.game.board[row][col] = 0;
    }
  };

  this.checkForPower = (row, col) => {
    if (this.game.board[row][col][1] === "c") {
      this.destroyEntireCol(row, col);
    } else if (this.game.board[row][col][1] === "r") {
      this.destroyEntireRow(row, col);
    }
  };

  this.moveDown = () => {
    for (let row = this.game.row - 2; row >= 0; row--) {
      for (let col = this.game.col; col >= 0; col--) {
        if (game.board[row + 1][col] === 0) {
          //moving down all candies smoothly
          for (let shift = 0; shift < this.game.row; shift++) {
            let checkRow = row - shift;
            if (checkRow >= 0 && this.game.board[checkRow][col] !== 0) {
              swapArray(this.game.board, row + 1, col, checkRow, col);
              break;
            }
          }
          this.game.changeCandiesList();
          //swapArray(game.board, row + 1, col, row, col);
        }
        if (game.board[0][col] === 0) {
          this.game.board[row][col] = getRandomColor();
          this.game.changeCandiesList();
        }
      }
    }
  };
}

/// for move down
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
