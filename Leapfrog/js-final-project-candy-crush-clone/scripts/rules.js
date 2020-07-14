import { swapArray, randomInt, getRandomColor } from "./helperFunc.js";
import { CANDY_POINT } from "./constants.js";

export default function Rules(game, score) {
  this.game = game;
  this.score = score;

  this.checkZero = () => {
    let row = game.row;
    let col = game.col;
    loop_row: for (let i = row; i < row * 2; i++) {
      loop_col: for (let j = 0; j < col; j++) {
        if (game.board[i][j] === 0) {
          game.isAnimating = true;
          break loop_row;
        }
      }
    }
  };

  this.checkThreeRow = () => {
    let row = game.row;
    let col = game.col;

    for (let i = row; i < row * 2; i++) {
      for (let j = 0; j < col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = game.board[i][j];
        if (
          //game.checkCondition &&
          checkIdx.every((index) => game.board[i][index][0] === value[0])
        ) {
          score.score += 3 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(i, index);
            game.board[i][index] = 0;
          });
        }
      }
    }
  };

  this.checkThreeColumn = () => {
    for (let i = game.row; i < game.row * 2 - 2; i++) {
      for (let j = 0; j < game.col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = game.board[i][j];
        if (checkIdx.every((index) => game.board[index][j][0] === value[0])) {
          score.score += 3 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(index, j);
            game.board[index][j] = 0;
          });
        }
      }
    }
  };

  this.checkFourRow = () => {
    for (let i = game.row; i < game.row * 2; i++) {
      for (let j = 0; j < game.col - 3; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3];
        let value = game.board[i][j];

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[i][index][0] === value[0])) {
          score.score += 4 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(i, index);
            game.board[i][index] = 0;
            if (
              (dragRow === i && dragCol === index) ||
              (replRow === i && replCol === index)
            ) {
              isReasonDrag = true;
              game.board[i][index] = game.candies[i][index].color[0] + "c";
              game.candies[i][index].color =
                game.candies[i][index].color[0] + "c";
            }
          });
          if (!isReasonDrag) {
            game.board[i][j] =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + "c"
                : getRandomColor() + "c";

            game.candies[i][j].color =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + "c"
                : getRandomColor() + "c";
          }
        }
      }
    }
  };

  this.checkFourColumn = () => {
    for (let i = game.row; i < game.row * 2 - 3; i++) {
      for (let j = 0; j < game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3];
        let value = game.board[i][j];

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[index][j][0] === value[0])) {
          score.score += 4 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(index, j);
            game.board[index][j] = 0;
            if (
              (dragRow === index && dragCol === j) ||
              (replRow === index && replCol === j)
            ) {
              isReasonDrag = true;
              game.board[index][j] = game.candies[index][j].color[0] + "r";
              game.candies[index][j].color =
                game.candies[index][j].color[0] + "r";
            }
          });

          if (!isReasonDrag) {
            game.board[i][j] =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + "r"
                : getRandomColor() + "r";

            game.candies[i][j].color =
              game.candies[i][j].color !== 0
                ? game.candies[i][j].color[0] + "r"
                : getRandomColor() + "r";
          }
        }
      }
    }
  };

  this.checkFiveRow = () => {
    for (let i = game.row; i < game.row * 2; i++) {
      for (let j = 0; j < game.col - 4; j++) {
        let checkIdx = [j, j + 1, j + 2, j + 3, j + 4];
        let value = game.board[i][j];

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[i][index][0] === value[0])) {
          score.score += 5 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(i, index);
            game.board[i][index] = 0;
            if (
              (dragRow === i && dragCol === index) ||
              (replRow === i && replCol === index)
            ) {
              isReasonDrag = true;
              game.board[i][index] = "cb";
              game.candies[i][index].color = "cb";
            }
          });
          if (!isReasonDrag) {
            game.board[i][j] = "cb";
            game.candies[i][j].color = "cb";
          }
          //game.changeCandiesList();
        }
      }
    }
  };

  this.checkFiveColumn = () => {
    for (let i = game.row; i < game.row * 2 - 4; i++) {
      for (let j = 0; j < game.col; j++) {
        let checkIdx = [i, i + 1, i + 2, i + 3, i + 4];
        let value = game.board[i][j];

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;

        let isReasonDrag = false;
        if (checkIdx.every((index) => game.board[index][j][0] === value[0])) {
          score.score += 5 * CANDY_POINT;
          checkIdx.forEach((index) => {
            this.checkForPower(i, index);
            game.board[index][j] = 0;
            if (
              (dragRow === index && dragCol === j) ||
              (replRow === index && replCol === j)
            ) {
              isReasonDrag = true;
              game.board[index][j] = "cb";
              game.candies[index][j].color = "cb";
            }
          });
          if (!isReasonDrag) {
            game.board[i][j] = "cb";
            game.candies[i][j].color = "cb";
          }
        }
      }
    }
  };

  this.checkPacket1 = () => {
    // Pratik way
    let board = game.board;
    loop_row: for (let row = 0; row < game.row - 2; row++) {
      loop_col: for (let col = 0; col < game.col - 2; col++) {
        //
        let checkRowIdx = [row, row + 1, row + 2];
        let checkColIdx = [col, col + 1, col + 2];
        let value = board[row][col];
        //checking vertically
        if (checkRowIdx.every((idx) => board[idx][col] === value)) {
          //checking horizontally in each row
          checkRowIdx.forEach((rIdx) => {
            if (checkColIdx.every((idx) => board[rIdx][idx] === value)) {
              checkRowIdx.forEach((cIdx) => {
                console.log("packet should be formed");
              });
            }
          });
        }
      }
    }
  };

  this.checkPacket = () => {
    for (let i = 0; i < game.row - 2; i++) {
      for (let j = 0; j < game.col - 2; j++) {
        let checkRowIdx = [i, i + 1, i + 2];
        let checkColIdx = [j, j + 1, j + 2];
        let value = game.board[i][j];

        let dragRow = game.draggedCandy.row;
        let dragCol = game.draggedCandy.col;
        let dragColor = game.candies[dragRow][dragCol].color[0] + "p";
        let replRow = game.replacedCandy.row;
        let replCol = game.replacedCandy.col;
        let replColor = game.candies[replRow][replCol].color[0] + "p";

        let isReasonDrag = false;
        let packetFormed = 0;
        let isFirstPacket = true;
        //checking if 3 candies in a same col have same color -> vertical check
        if (checkRowIdx.every((rIdx) => game.board[rIdx][j] === value)) {
          //checking if other 3 candies in one of each row have same color
          //again checking horizontally
          checkRowIdx.forEach((rIdx) => {
            packetFormed += this.checkForPacket_Horizontally(rIdx, j)[0];
            let matchedCol = this.checkForPacket_Horizontally(rIdx, j)[1];
            game.board[rIdx][j] = 0;
            game.board[rIdx][matchedCol] = 0;
            game.board[rIdx][matchedCol + 1] = 0;
            game.board[rIdx][matchedCol + 2] = 0;

            if (packetFormed && isFirstPacket) {
              console.log("packet should be formed");
              isFirstPacket = false;
              if (dragRow === rIdx && dragCol === j) {
                isReasonDrag = true;
                game.board[dragRow][dragCol] =
                  game.board[dragRow][dragCol].color[0] + "p";
              } else if (replRow === rIdx && replCol === j) {
                isReasonDrag = true;
                game.board[replRow][replCol] =
                  game.candies[replRow][replCol].color[0] + "p";
              } else if (!isReasonDrag && packetFormed)
                game.board[rIdx][j] = game.candies[rIdx][j].color[0] + "p";
            }
          });
        }

        //checking if 3 candies in a same row have same color -> horizontal check
        else if (checkColIdx.every((cIdx) => game.board[i][cIdx] === value)) {
          //checking if other 3 candies in one of each col have same color
          //again checking vertically
          checkColIdx.forEach((cIdx) => {
            packetFormed += this.checkForPacket_Vertically(i, cIdx);
          });
        }

        //if (packetFormed) console.log("packet is formed");
      }
    }
  };

  this.destroyEntireCol = (_row, col) => {
    game.board[_row][col] = 0;
    console.log("destroy col");
    score.score += game.col * CANDY_POINT;
    for (let row = game.row; row < game.row * 2; row++) {
      this.checkForPower(row, col);
      game.board[row][col] = 0;
    }
  };

  this.destroyEntireRow = (row, _col) => {
    game.board[row][_col] = 0;
    console.log("destroy row");
    score.score += game.row * CANDY_POINT;
    for (let col = 0; col < game.col; col++) {
      this.checkForPower(row, col);
      game.board[row][col] = 0;
    }
  };

  this.checkForPower = (row, col) => {
    return;
    if (game.board[row][col][1] === "c") {
      this.destroyEntireCol(row, col);
    } else if (game.board[row][col][1] === "r") {
      this.destroyEntireRow(row, col);
    }
  };

  this.checkForPacket_Vertically = (row, col) => {
    let checkIndex = [row - 2, row - 1, row, row + 1, row + 2];

    if (row === 0) checkIndex = checkIndex.slice(2, 5);
    else if (row === 1) checkIndex = checkIndex.slice(1, 5);
    else if (row === game.row - 2) checkIndex = checkIndex.slice(0, 3);
    else if (row === game.row - 1) checkIndex = checkIndex.slice(0, 4);

    let isPacket = 0;
    for (let i = 0; i < checkIndex.length - 2; i++) {
      let idx = checkIndex[i];
      if (
        game.board[idx][col] === game.board[idx + 1][col] &&
        game.board[idx + 1][col] === game.board[idx + 2][col]
      ) {
        isPacket = 1;
      }
    }
    return isPacket;
  };

  this.checkForPacket_Horizontally = (row, col) => {
    let checkIndex = [col - 2, col - 1, col, col + 1, col + 2];

    if (col === 0) checkIndex = checkIndex.slice(2, 5);
    else if (col === 1) checkIndex = checkIndex.slice(1, 5);
    else if (col === game.col - 2) checkIndex = checkIndex.slice(0, 3);
    else if (col === game.col - 1) checkIndex = checkIndex.slice(0, 4);

    let isPacket = 0;
    let startingMatchIdx = col;
    for (let i = 0; i < checkIndex.length - 2; i++) {
      let idx = checkIndex[i];
      if (
        game.board[row][idx] === game.board[row][idx + 1] &&
        game.board[row][idx + 1] === game.board[row][idx + 2]
      ) {
        isPacket = 1;
        startingMatchIdx = idx;
        break;
      }
    }
    return [isPacket, startingMatchIdx];
  };

  this.moveDown = () => {
    for (let row = game.row - 2; row >= 0; row--) {
      for (let col = game.col; col >= 0; col--) {
        if (game.board[row + 1][col] === 0) {
          //moving down all candies smoothly
          for (let shift = 0; shift < game.row; shift++) {
            let checkRow = row - shift;
            if (checkRow >= 0 && game.board[checkRow][col] !== 0) {
              swapArray(game.board, row + 1, col, checkRow, col);
              break;
            }
          }
          game.changeCandiesList();
          //swapArray(game.board, row + 1, col, row, col);
        }
        if (game.board[0][col] === 0) {
          game.board[row][col] = getRandomColor();
          game.changeCandiesList();
        }
      }
    }
  };

  this.checkValidMove = () => {
    let dRow = game.draggedCandy.row;
    let dCol = game.draggedCandy.col;
    let rRow = game.replacedCandy.row;
    let rCol = game.replacedCandy.col;

    let isValid = false;

    //cloning game board
    let board = game.board.map(function (arr) {
      return arr.slice();
    });
    swapArray(board, dRow, dCol, rRow, rCol);

    let row = game.row;
    let col = game.col;
    //checking for horizontal matched
    for (let i = row; i < row * 2; i++) {
      for (let j = 0; j < col - 2; j++) {
        let checkIdx = [j, j + 1, j + 2];
        let value = board[i][j];
        if (checkIdx.every((index) => board[i][index][0] === value[0])) {
          isValid = true;
        }
      }
    }

    //checking for vertical match
    for (let i = row; i < row * 2 - 2; i++) {
      for (let j = 0; j < col; j++) {
        let checkIdx = [i, i + 1, i + 2];
        let value = board[i][j];
        if (checkIdx.every((index) => board[index][j][0] === value[0])) {
          isValid = true;
        }
      }
    }
    return isValid;
  };
}
