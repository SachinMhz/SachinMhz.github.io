import { getAudio, playAudio } from './helperFunc.js';

var bgSound = null;
export default function Audio(game) {
  this.game = game;
  // flag that is used to know if user has turn on or off the volume
  this.enabled = true;
  
  //functions plays the sound when called
  this.match = () => {
    if (this.enabled) playAudio(getAudio('./audios/combo_sound.mp3'));
  };
  this.stripCreated = () => {
    if (this.enabled) playAudio(getAudio('./audios/striped_candy_created.mp3'));
  };
  this.colorBombCreated = () => {
    if (this.enabled) playAudio(getAudio('./audios/colour_bomb_created.mp3'));
  };
  this.packetCreated = () => {
    if (this.enabled) playAudio(getAudio('./audios/packet_candy_created.mp3'));
  };
  this.stripBlast = () => {
    if (this.enabled) playAudio(getAudio('./audios/line_blast.mp3'));
  };
  this.packetBlast = () => {
    if (this.enabled) playAudio(getAudio('./audios/packet_blast.mp3'));
  };
  this.colorBombBlast = () => {
    if (this.enabled) playAudio(getAudio('./audios/colour_bomb_blast.mp3'));
  };
  this.swap = () => {
    if (this.enabled) playAudio(getAudio('./audios/swap.mp3'));
  };
  this.levelCompleted = () => {
    if (this.enabled) playAudio(getAudio('./audios/level_completed.mp3'));
  };
  this.levelFailed = () => {
    if (this.enabled) playAudio(getAudio('./audios/level_failed.mp3'));
  };
  this.pressed = () => {
    if (this.enabled) playAudio(getAudio('./audios/button_press.mp3'));
  };

  //audio with less volume
  this.level_bg = () => {
    if (!this.enabled) return;
    bgSound = getAudio('./audios/bg_music.mp3');
    bgSound.pause();
    bgSound.currentTime = 0;
    bgSound.play();
    bgSound.loop = 'true';
    bgSound.volume = 0.2;
  };

  //this stops the background music
  this.stopBG = () => {
    bgSound.pause();
    bgSound.currentTime = 0;
  };
}
