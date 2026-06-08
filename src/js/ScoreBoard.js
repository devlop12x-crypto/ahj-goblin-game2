/**
 * ScoreBoard — хранит и отображает текущий счёт и количество промахов.
 */
export class ScoreBoard {
  /**
   * @param {HTMLElement} scoreEl  — элемент счёта
   * @param {HTMLElement} missesEl — элемент промахов
   * @param {number} maxMisses     — максимальное количество промахов
   */
  constructor(scoreEl, missesEl, maxMisses = 5) {
    this._scoreEl = scoreEl;
    this._missesEl = missesEl;
    this._maxMisses = maxMisses;
    this._score = 0;
    this._misses = 0;
  }

  get score() {
    return this._score;
  }

  get misses() {
    return this._misses;
  }

  /** Возвращает true, если достигнут лимит промахов */
  get isGameOver() {
    return this._misses >= this._maxMisses;
  }

  /** Увеличивает счёт на 1 */
  addScore() {
    this._score += 1;
    this._render();
  }

  /** Увеличивает счётчик промахов на 1 */
  addMiss() {
    this._misses += 1;
    this._render();
  }

  /** Сбрасывает счёт и промахи */
  reset() {
    this._score = 0;
    this._misses = 0;
    this._render();
  }

  // ── приватные методы ──────────────────────────────────────────────

  _render() {
    this._scoreEl.textContent = this._score;
    this._missesEl.textContent = `${this._misses} / ${this._maxMisses}`;
  }
}
