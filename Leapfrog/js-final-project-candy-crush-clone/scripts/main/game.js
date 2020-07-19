import { getRandomColor, swapArray } from '../utils/helperFunc.js';
import { CANDY_HEIGHT, GAME_ROW, GAME_COL } from '../utils/constants.js';
import Candy from './candy.js';
import Background from './candyBG.js';

export default function Game() {
  this.candies = [];
  this.candyBackground = [];
  this.board = [];
  this.row = GAME_ROW;
  this.col = GAME_COL;
  this.draggedCandy = { row: 0, col: 0, color: 'a' };
  this.replacedCandy = { row: 0, col: 1, color: 'a' };
  this.swapDirection = null;
  this.isAnimating = false;
  this.animationTime = CANDY_HEIGHT;
  // initialize the candies count for error handling (NaN)
  this.candiesCount = { r: 0, b: 0, rc: 0, rr: 0, br: 0, bc: 0, gp: 0, cb: 0 };
  this.frame = 0;
  this.swapFrame = 0;
  this.dragFrame = 0;
  this.checkCondition = true;
  this.isSwapping = false;
  this.isDragged = false;
  this.willExplodePacket = false;
  this.level = 1;
  this.isPaused = false;

  /** initialize a game board */
  this.createBoard = () => {
    this.board = [];
    for (let i = 0; i < this.row * 2; i++) {
      let row = [];
      for (let j = 0; j < this.col; j++) {
        row.push(getRandomColor());
      }
      this.board.push(row);
    }
  };

  /** initialize and change candies list for displaying  */
  this.changeCandiesList = () => {
    this.candies = [];
    let id = -this.row * this.col;
    for (let yVal = 0; yVal < this.row * 2; yVal++) {
      let row = [];
      for (let xVal = 0; xVal < this.col; xVal++) {
        //params: gameObject, xPos, yPos, color, id
        let color = this.board[yVal][xVal];
        var candy = new Candy(this, xVal, yVal - this.row, color, id);
        row.push(candy);
        id++;
      }
      this.candies.push(row);
    }
  };

  /** initialize background image for each candy */
  this.createCandiesBackground = () => {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.candyBackground.push(new Background(j, i, 'bg1'));
      }
    }
  };

  /** clear game value for next screens */
  this.clearGame = () => {
    this.draggedCandy = { row: 0, col: 0, color: 'a' };
    this.replacedCandy = { row: 0, col: 1, color: 'a' };
    this.swapDirection = null;
    this.isAnimating = false;
    this.animationTime = CANDY_HEIGHT;
    this.candiesCount = {
      r: 0,
      b: 0,
      rc: 0,
      rr: 0,
      br: 0,
      bc: 0,
      gp: 0,
      cb: 0,
    };
    this.frame = 0;
    this.swapFrame = 0;
    this.dragFrame = 0;
    this.checkCondition = true;
    this.isSwapping = false;
    this.isDragged = false;
    this.willExplodePacket = false;
    this.createBoard();
    this.changeCandiesList();
  };

  /** display image with no background in the canvas */
  this.replaceZero = () => {
    //removing candies with zero value from screen
    for (let row = this.row; row < this.row * 2; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.board[row][col] === 0) {
          this.candies[row][col].color = 0;
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

  /**. animates slow movement of candies in the canvas */
  this.animatingMoveDown = () => {
    for (let row = this.row * 2 - 2; row >= this.row - 1; row--) {
      for (let col = this.col; col >= 0; col--) {
        if (this.board[row + 1][col] === 0) {
          //drops all the candies above the destroyed candy
          for (let dropRow = row; dropRow >= 0; dropRow--) {
            if (this.frame <= 30 && this.isAnimating) {
              this.candies[dropRow][col].y += 2;
              this.candies[dropRow][col].realY += 2;
            } else {
              let zeroCount = 0;
              // drop candies by the number of candies destroyed
              for (let k = dropRow; k < this.row * 2; k++) {
                if (this.board[k][col] === 0) {
                  zeroCount += 1;
                }
              }
              // updates  the game board and candiesList after animation finishes
              if (this.board[dropRow][col] !== 0) {
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

  /** responsible for displaying swapping animation in the canvas */
  this.swapAnimation = () => {
    let speed = 3;
    let swapFrameLimit = 20;
    let dRow = this.draggedCandy.row;
    let dCol = this.draggedCandy.col;
    let rRow = this.replacedCandy.row;
    let rCol = this.replacedCandy.col;

    if (this.isSwapping) {
      if (this.swapFrame <= swapFrameLimit) {
        //swaps with right candy
        if (this.swapDirection === 'right') {
          this.candies[dRow][dCol].x += speed;
          this.candies[dRow][dCol].realX += speed;
          this.candies[rRow][rCol].x -= speed;
          this.candies[rRow][rCol].realX -= speed;
        } 
        //swap with left candy
        else if (this.swapDirection === 'left') {
          this.candies[dRow][dCol].x -= speed;
          this.candies[dRow][dCol].realX -= speed;
          this.candies[rRow][rCol].x += speed;
          this.candies[rRow][rCol].realX += speed;
        }
        //swap with candy below the dragged one
        else if (this.swapDirection === 'down') {
          this.candies[dRow][dCol].y += speed;
          this.candies[dRow][dCol].realY += speed;
          this.candies[rRow][rCol].y -= speed;
          this.candies[rRow][rCol].realY -= speed;
        }
        //swap with candy above the dragged one
        else if (this.swapDirection === 'up') {
          this.candies[dRow][dCol].y -= speed;
          this.candies[dRow][dCol].realY -= speed;
          this.candies[rRow][rCol].y += speed;
          this.candies[rRow][rCol].realY += speed;
        }
      } else {
        this.isSwapping = false;
        this.swapFrame = 0;

        //update the game board and candiesList after animation completes
        swapArray(
          this.board,
          this.draggedCandy.row,
          this.draggedCandy.col,
          this.replacedCandy.row,
          this.replacedCandy.col
        );
        this.changeCandiesList();
        this.isDragged = true;
      }
    }
  };
}
