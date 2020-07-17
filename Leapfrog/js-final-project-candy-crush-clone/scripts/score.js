export default function Score(game) {
  this.game = game;
  this.score = 0;
  this.highScore = localStorage.getItem("highScore")
    ? localStorage.getItem("highScore")
    : 0;
  this.moves = 10;
  this.scoreText = document.getElementById("score");
  this.moveText = document.getElementById("moves");
  this.highScoreText = document.getElementById("highScore");

  this.draw = () => {
    this.scoreText.innerHTML = "Score: " + this.score;
    this.moveText.innerHTML = "Moves: " + this.moves;
    this.highScoreText.innerHTML = "High Score: " + this.highScore;
  };
}
