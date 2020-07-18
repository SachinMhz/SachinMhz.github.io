import { CTX, CANVAS } from "./constants.js";
//import { addAudio } from './audio.js';

export default function Preloader() {
  this.images = [
    "./images/blue-candy",
    "./images/blue-row",
    "./images/blue-col",
    "./images/blue-packet",

    "./images/green-candy",
    "./images/green-row",
    "./images/green-col",
    "./images/green-packet",

    "./images/red-candy",
    "./images/red-row",
    "./images/red-col",
    "./images/red-packet",

    "./images/yellow-candy",
    "./images/yellow-row",
    "./images/yellow-col",
    "./images/yellow-packet",

    "./images/purple-candy",
    "./images/purple-row",
    "./images/purple-col",
    "./images/purple-packet",

    "./images/orange-candy",
    "./images/orange-row",
    "./images/orange-col",
    "./images/orange-packet",

    "./images/color-bomb",
    "./images/bomb",

    "./images/noBG",
    "./images/CandyBG",
    "./images/CandyBG-selected",

    "./images/back",
    "./images/back-selected",
    "./images/level1",
    "./images/level1-selected",
    "./images/level2",
    "./images/level2-selected",
    "./images/level3",
    "./images/level3-selected",
    "./images/level4",
    "./images/level4-selected",
    "./images/level5",
    "./images/level5-selected",
    "./images/menuBtn",
    "./images/menuBtn-selected",
    "./images/nextBtn",
    "./images/nextBtn-selected",
    "./images/playBtn",
    "./images/playBtn-selected",
    "./images/retryBtn",
    "./images/retryBtn-selected",

    "./images/startBG",
    "./images/levelBG",
    "./images/scoreBG",
    "./images/gameOverBG",
    "./images/gameCompleteBG",
  ];

  this.audio = [
    "./audios/bg_music.mp3",
    "./audios/colour_bomb_blast.mp3",
    "./audios/colour_bomb_created.mp3",
    "./audios/combo_sound.mp3",
    "./audios/level_completed.mp3",
    "./audios/level_failed.mp3",
    "./audios/line_blast.mp3",
    "./audios/line_blast2.mp3",
    "./audios/packet_blast.mp3",
    "./audios/packet_candy_created.mp3",
    "./audios/striped_candy_created.mp3",
    "./audios/swap.mp3",
  ];
  this.loadedImages = 0;
  this.loadedAudio = 0;

  this.load = function (start) {
    for (var i = 0; i < this.images.length; i++) {
      CTX.beginPath();
      CTX.rect(0, 0, CANVAS.width, CANVAS.height);
      CTX.fillStyle = "orange";
      CTX.fill();
      CTX.fillStyle = "white";
      CTX.fillText("Loading Images ...", 300, 300);

      var img = new Image();
      img.src = this.images[i] + ".png";
      img.onload = () => {
        this.loadedImages += 1;
        if (this.loadedImages == this.images.length - 1) {
          this.loadAudio(start);
        }
      };
    }
  };

  this.loadAudio = function (start) {
    for (var i = 0; i < this.audio.length; i++) {
      CTX.beginPath();
      CTX.rect(0, 0, CANVAS.width, CANVAS.height);
      CTX.fillStyle = "Orange";
      CTX.fill();
      CTX.fillStyle = "white";
      CTX.fillText("Loading Sound ...", 300, 300);

      var audio = new Audio();
      audio.src = this.audio[i];
      audio.addEventListener("canplay", () => {
        this.loadedAudio += 1;
        if (this.loadedAudio == this.audio.length - 1) {
          start();
        }
      });
    }
  };
}
