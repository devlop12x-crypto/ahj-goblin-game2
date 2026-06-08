import goblinImg from '../img/goblin.png';

/**
 * GameField — управляет DOM-полем: рендерит ячейки,
 * показывает/прячет гоблина, сигнализирует о кликах.
 */
export class GameField {
  /**
   * @param {HTMLElement} boardEl — контейнер игрового поля
   * @param {number} cellCount — количество ячеек (по умолчанию 9)
   */
  constructor(boardEl, cellCount = 16) {
    this._board = boardEl;
    this._cellCount = cellCount;
    this._cells = [];
    this._activeIndex = null;
    this._onHitCallback = null;
    this._onMissCallback = null;
  }

  /** Рендерит ячейки и вешает делегированный обработчик клика */
  render() {
    this._board.innerHTML = '';
    this._cells = [];

    for (let i = 0; i < this._cellCount; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      this._board.append(cell);
      this._cells.push(cell);
    }

    // Делегируем клик на поле целиком (тема лекции — Event Delegation)
    this._board.addEventListener('click', this._handleBoardClick.bind(this));
  }

  /**
   * Показывает гоблина в случайной ячейке (кроме текущей активной).
   * @returns {number} индекс ячейки где появился гоблин
   */
  showGoblin() {
    const availableIndices = this._cells
      .map((_, idx) => idx)
      .filter((idx) => idx !== this._activeIndex);

    const randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this._activeIndex = randomIdx;

    const cell = this._cells[randomIdx];
    const img = document.createElement('img');
    img.src = goblinImg;
    img.alt = 'goblin';
    img.classList.add('goblin');
    cell.append(img);
    cell.classList.add('has-goblin');

    return randomIdx;
  }

  /** Убирает гоблина из активной ячейки (промах по таймауту) */
  hideGoblin() {
    if (this._activeIndex === null) return;
    this._clearCell(this._cells[this._activeIndex]);
    this._activeIndex = null;
  }

  /**
   * Регистрирует колбэки игры.
   * @param {Function} onHit — вызывается при попадании
   * @param {Function} onMiss — вызывается при промахе (истёк таймер)
   */
  setCallbacks(onHit, onMiss) {
    this._onHitCallback = onHit;
    this._onMissCallback = onMiss;
  }

  /** Активирует/деактивирует визуальный режим игры */
  setActive(isActive) {
    this._board.classList.toggle('game-active', isActive);
  }

  /** Очищает поле (конец игры) */
  reset() {
    this._cells.forEach((cell) => this._clearCell(cell));
    this._activeIndex = null;
    this.setActive(false);
  }

  // ── приватные методы ──────────────────────────────────────────────

  _handleBoardClick(event) {
    // target — ячейка или гоблин внутри неё
    const cell = event.target.closest('.cell');
    if (!cell) return;

    const clickedIndex = Number(cell.dataset.index);

    if (clickedIndex === this._activeIndex) {
      // Попадание: визуальная вспышка, затем чистим ячейку
      cell.classList.add('hit-flash');
      setTimeout(() => cell.classList.remove('hit-flash'), 200);
      this._clearCell(cell);
      this._activeIndex = null;

      if (this._onHitCallback) this._onHitCallback();
    }
    // Клик по пустой ячейке игнорируем (промахи считает GoblinTimer)
  }

  _clearCell(cell) {
    const img = cell.querySelector('.goblin');
    if (img) img.remove();
    cell.classList.remove('has-goblin', 'hit-flash');
  }
}
