import { getAudio, playAudio } from "./helperFunc.js";

export const Audio = {
  match: () => {
    playAudio(getAudio("./audios/combo_sound.mp3"));
  },
  stripCreated: () => {
    playAudio(getAudio("./audios/striped_candy_created.mp3"));
  },
  colorBombCreated: () => {
    playAudio(getAudio("./audios/colour_bomb_created.mp3"));
  },
  packetCreated: () => {
    playAudio(getAudio("./audios/packet_candy_created.mp3"));
  },
  stripBlast: () => {
    playAudio(getAudio("./audios/line_blast.mp3"));
  },
  packetBlast: () => {
    playAudio(getAudio("./audios/packet_blast.mp3"));
  },
  colorBombBlast: () => {
    playAudio(getAudio("./audios/color_bomb_blast.mp3"));
  },
  swap: () => {
    playAudio(getAudio("./audios/swap.mp3"));
  },
  level_bg: () => {
    let audio = getAudio("./audios/bg_music.mp3");
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    audio.loop = "true";
    audio.volume = 0.2;
  },
};