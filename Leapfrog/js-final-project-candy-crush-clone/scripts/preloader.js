import { CTX, CANVAS } from "./constants.js";
//import { addAudio } from "./audio.js";

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
    "./images/bg1",
    "./images/bg1-selected",
    "./images/bg2",
    "./images/bg3",
    "./images/bg4",
  ];

  this.audio = ["./audios/bg_music.mp3", "./audios/colour_bomb_blast.mp3"];
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
      CTX.fillStyle = "black";
      CTX.fill();
      CTX.fillStyle = "white";
      CTX.fillText("Loading Sound ...", 300, 300);
      var audio = new Audio();
      audio.src = this.audio[i];
      
      audio.oncanplaythrough = () => {
        this.loadedAudio += 1;
        if (this.loadedAudio == this.audio.length - 1) {
          //addAudio();
          start();
        }
      };
    }
  };
}
