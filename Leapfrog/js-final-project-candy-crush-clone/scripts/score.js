export default function Score(game) {
  this.game = game;
  this.score = 0;
  this.highScore = localStorage.getItem("highScore")
    ? localStorage.getItem("highScore")
    : 0;
  this.moves = 40;
  this.levelText = document.getElementById("level");
  this.scoreText = document.getElementById("score");
  this.moveText = document.getElementById("moves");
  this.highScoreText = document.getElementById("highScore");
  this.targetText = document.getElementById("target");
  this.obj1Text = document.getElementById("obj1");
  this.obj2Text = document.getElementById("obj2");

  this.clearScore = () => {
    this.score = 0;
    this.moves = 40;
  };
  this.draw = () => {
    this.levelText.innerHTML = "Level: " + game.level;
    this.scoreText.innerHTML = "Score: " + this.score;
    this.moveText.innerHTML = "Moves: " + this.moves;
    this.highScoreText.innerHTML = "High Score: " + this.highScore;

    this.targetText.innerHTML = "Targets: ";
    if (game.level == 1) {
      this.obj1Text.innerHTML = "Score: " + 5000;
    }
    if (game.level == 2) {
      this.obj1Text.innerHTML = "Red: " + game.candiesCount.r + " / 50";
      this.obj2Text.innerHTML = "Blue: " + game.candiesCount.b + " / 50";
    }

    if (game.level == 3) {
      this.obj1Text.innerHTML =
        "Red Strip: " + (game.candiesCount.rr + game.candiesCount.rc) + " / 2";
      this.obj2Text.innerHTML =
        "Blue Strip: " + (game.candiesCount.br + game.candiesCount.bc) + " / 2";
    }

    if (game.level == 4) {
      this.obj1Text.innerHTML = "Color Bomb: " + game.candiesCount.cb + " / 2";
    }

    if (game.level == 5) {
      this.obj1Text.innerHTML = "Score: " + 50000;
      this.obj2Text.innerHTML = "Green Packet: " + game.candiesCount.gp + "/ 1";
    }
  };
}
