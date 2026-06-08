import { GameField } from './GameField.js';
import { GoblinTimer } from './GoblinTimer.js';
import { ScoreBoard } from './ScoreBoard.js';

/**
 * Game — главный класс-оркестратор.
 * Создаёт GameField, GoblinTimer, ScoreBoard и связывает их между собой.
 */
export class Game {
  /**
   * @param {Object} elements — объект с DOM-элементами
   * @param {HTMLElement} elements.boardEl
   * @param {HTMLElement} elements.scoreEl
   * @param {HTMLElement} elements.missesEl
   * @param {HTMLElement} elements.modalEl
   * @param {HTMLElement} elements.finalScoreEl
   * @param {HTMLElement} elements.btnStartEl
   * @param {HTMLElement} elements.btnRestartEl
   */
  constructor(elements) {
    this._modal = elements.modalEl;
    this._finalScore = elements.finalScoreEl;
    this._btnStart = elements.btnStartEl;

    this._field = new GameField(elements.boardEl);
    this._timer = new GoblinTimer(1000);
    this._scoreboard = new ScoreBoard(
      elements.scoreEl,
      elements.missesEl,
      5,
    );

    this._field.render();
    this._bindEvents(elements.btnRestartEl);
  }

  /** Запускает новую игру */
  start() {
    this._scoreboard.reset();
    this._field.reset();
    this._field.setActive(true);
    this._hideModal();

    // Связываем колбэки:
    // GoblinTimer → GameField.showGoblin (показать)
    // GoblinTimer → Game._onMiss (промах по таймауту)
    this._timer.setCallbacks(
      () => this._field.showGoblin(),
      () => this._onMiss(),
    );

    // GameField сообщает нам о попадании
    this._field.setCallbacks(
      () => this._onHit(),
      null, // промахи через таймер, не через поле
    );

    this._timer.start();
    this._btnStart.disabled = true;
  }

  // ── приватные методы ──────────────────────────────────────────────

  _onHit() {
    this._timer.stop();
    this._scoreboard.addScore();
    // Запускаем следующий раунд
    this._timer.start();
  }

  _onMiss() {
    this._field.hideGoblin();
    this._scoreboard.addMiss();

    if (this._scoreboard.isGameOver) {
      this._endGame();
    }
  }

  _endGame() {
    this._timer.stop();
    this._field.reset();
    this._finalScore.textContent = this._scoreboard.score;
    this._showModal();
    this._btnStart.disabled = false;
  }

  _showModal() {
    this._modal.classList.remove('hidden');
  }

  _hideModal() {
    this._modal.classList.add('hidden');
  }

  _bindEvents(btnRestartEl) {
    this._btnStart.addEventListener('click', () => this.start());
    btnRestartEl.addEventListener('click', () => this.start());
  }
}
