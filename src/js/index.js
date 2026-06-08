import '../css/style.css';
import { Game } from './Game.js';

const game = new Game({
  boardEl: document.getElementById('board'),
  scoreEl: document.getElementById('score'),
  missesEl: document.getElementById('misses'),
  modalEl: document.getElementById('modal'),
  finalScoreEl: document.getElementById('final-score'),
  btnStartEl: document.getElementById('btn-start'),
  btnRestartEl: document.getElementById('btn-restart'),
});

// Игра ждёт нажатия "Начать игру"
