import { NO_OF_MOVES } from '../utils/constants.js';

export default function Score(game, audios, screen) {
  var self = this;
  this.game = game;
  this.score = 0;
  this.highScore = localStorage.getItem('highScore')
    ? localStorage.getItem('highScore')
    : 0;
  this.moves = NO_OF_MOVES;

  //text from DOM
  this.levelText = document.getElementById('level');
  this.scoreText = document.getElementById('score');
  this.moveText = document.getElementById('moves');
  this.highScoreText = document.getElementById('highScore');
  this.targetText = document.getElementById('target');
  this.obj1Text = document.getElementById('obj1');
  this.obj2Text = document.getElementById('obj2');

  //buttons from DOM
  this.restartBtn = document.getElementById('restartBtn');
  this.volumeBtn = document.getElementById('volumeBtn');
  this.pauseBtn = document.getElementById('pauseBtn');
  this.menuBtn = document.getElementById('menuBtn');

  this.scoreContainer = document.getElementById('scoreContainer');

  /** clear and reset score after transition from screen */
  this.clearScore = () => {
    this.score = 0;
    this.moves = NO_OF_MOVES;
  };

  //draws to the DOM
  this.draw = () => {
    this.levelText.innerHTML = 'Level: ' + game.level;
    this.scoreText.innerHTML = 'Score: ' + this.score;
    this.moveText.innerHTML = 'Moves: ' + this.moves;
    this.highScoreText.innerHTML = 'High Score: ' + this.highScore;

    this.targetText.innerHTML = 'Targets: ';

    if (game.level == 1) {
      this.obj1Text.innerHTML = 'Score: ' + 2500;
      this.obj2Text.innerHTML = '';
    }
    //
    else if (game.level == 2) {
      this.obj1Text.innerHTML = 'Red: ' + game.candiesCount.r + ' / 50';
      this.obj2Text.innerHTML = 'Blue: ' + game.candiesCount.b + ' / 50';
    }
    //
    else if (game.level == 3) {
      this.obj1Text.innerHTML =
        'Red Strip: ' + (game.candiesCount.rr + game.candiesCount.rc) + ' / 2';
      this.obj2Text.innerHTML =
        'Blue Strip: ' + (game.candiesCount.br + game.candiesCount.bc) + ' / 2';
    }
    //
    else if (game.level == 4) {
      this.obj1Text.innerHTML = 'Color Bomb: ' + game.candiesCount.cb + ' / 2';
      this.obj2Text.innerHTML = '';
    }
    //
    else if (game.level == 5) {
      this.obj1Text.innerHTML = 'Score: ' + 20000;
      this.obj2Text.innerHTML = 'Green Packet: ' + game.candiesCount.gp + '/ 2';
    }
  };

  this.onChangeScreen = () => {
    if (screen.show === 'Levels' || screen.show === 'Start Menu') {
      this.scoreContainer.style.display = 'none';
    } else {
      this.scoreContainer.style.display = 'block';
    }
  };

  function volume() {
    audios.pressed();
    if (audios.enabled) {
      audios.enabled = false;
      audios.stopBG();
    } else {
      audios.enabled = true;
      audios.level_bg();
    }
  }
  this.volumeBtn.addEventListener('click', volume, false);

  function restart() {
    audios.pressed();
    game.clearGame();
    self.clearScore();
  }
  this.restartBtn.addEventListener('click', restart, false);

  function pause() {
    audios.pressed();
    game.isPaused = !game.isPaused;
  }
  this.pauseBtn.addEventListener('click', pause, false);

  function menu() {
    audios.pressed();
    screen.show = 'Levels';
    self.onChangeScreen();
  }
  this.menuBtn.addEventListener('click', menu, false);
}
