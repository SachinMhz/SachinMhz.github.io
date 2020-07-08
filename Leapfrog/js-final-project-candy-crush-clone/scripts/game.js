import { randomInt, getRandomColor } from "./helperFunc.js";
import Candy from "./candy.js";
import Background from "./candyBG.js";

export default function Game() {
  this.candies = [];
  this.candyBackground = [];
  this.board = [];
  this.row = 10;
  this.col = 10;
  this.draggedCandy = { row: null, col: null };
  this.replacedCandy = { row: null, col: null };

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
}
