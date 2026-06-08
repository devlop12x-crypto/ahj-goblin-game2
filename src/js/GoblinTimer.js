/**
 * GoblinTimer — управляет циклом «показать гоблина → подождать 1 с → убрать».
 * Не знает ничего о DOM кроме того, что получает через колбэки.
 */
export class GoblinTimer {
  /** @param {number} duration — время жизни гоблина в мс (по умолчанию 1000) */
  constructor(duration = 1000) {
    this._duration = duration;
    this._timerId = null;
    this._onShow = null;
    this._onMiss = null;
    this._running = false;
  }

  /**
   * Регистрирует колбэки.
   * @param {Function} onShow — вызывается, чтобы показать гоблина (должен вернуть true если ячейка свободна)
   * @param {Function} onMiss — вызывается, когда время истекло и игрок не кликнул
   */
  setCallbacks(onShow, onMiss) {
    this._onShow = onShow;
    this._onMiss = onMiss;
  }

  /** Запускает цикл появления гоблинов */
  start() {
    this._running = true;
    this._scheduleNext();
  }

  /** Останавливает цикл (вызывается при попадании или конце игры) */
  stop() {
    this._running = false;
    if (this._timerId !== null) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
  }

  // ── приватные методы ──────────────────────────────────────────────

  _scheduleNext() {
    if (!this._running) return;

    if (this._onShow) this._onShow();

    this._timerId = setTimeout(() => {
      if (!this._running) return;

      // Время вышло — промах
      if (this._onMiss) this._onMiss();

      // Следующий раунд
      this._scheduleNext();
    }, this._duration);
  }
}
