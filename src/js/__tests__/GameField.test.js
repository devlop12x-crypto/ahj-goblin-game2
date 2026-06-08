import { GameField } from '../GameField.js';

describe('GameField', () => {
  let boardEl;
  let field;

  beforeEach(() => {
    boardEl = document.createElement('div');
    document.body.appendChild(boardEl);
    field = new GameField(boardEl, 16);
    field.render();
  });

  afterEach(() => {
    document.body.removeChild(boardEl);
  });

  test('render создаёт 16 ячеек с классом cell', () => {
    const cells = boardEl.querySelectorAll('.cell');
    expect(cells).toHaveLength(16);
  });

  test('каждая ячейка имеет data-index', () => {
    const cells = boardEl.querySelectorAll('.cell');
    cells.forEach((cell, idx) => {
      expect(cell.dataset.index).toBe(String(idx));
    });
  });

  test('showGoblin добавляет изображение гоблина в одну из ячеек', () => {
    field.showGoblin();
    const goblin = boardEl.querySelector('.goblin');
    expect(goblin).not.toBeNull();
  });

  test('showGoblin добавляет класс has-goblin активной ячейке', () => {
    field.showGoblin();
    const activeCell = boardEl.querySelector('.has-goblin');
    expect(activeCell).not.toBeNull();
  });

  test('hideGoblin убирает гоблина из ячейки', () => {
    field.showGoblin();
    field.hideGoblin();
    const goblin = boardEl.querySelector('.goblin');
    expect(goblin).toBeNull();
  });

  test('hideGoblin убирает класс has-goblin', () => {
    field.showGoblin();
    field.hideGoblin();
    const activeCell = boardEl.querySelector('.has-goblin');
    expect(activeCell).toBeNull();
  });

  test('вызывает onHit при клике на ячейку с гоблином', () => {
    const onHit = jest.fn();
    field.setCallbacks(onHit, null);
    field.showGoblin();

    const activeCell = boardEl.querySelector('.has-goblin');
    activeCell.click();

    expect(onHit).toHaveBeenCalledTimes(1);
  });

  test('не вызывает onHit при клике на пустую ячейку', () => {
    const onHit = jest.fn();
    field.setCallbacks(onHit, null);

    // Не показываем гоблина — все ячейки пустые
    const cells = boardEl.querySelectorAll('.cell');
    cells[0].click();

    expect(onHit).not.toHaveBeenCalled();
  });

  test('reset убирает всех гоблинов', () => {
    field.showGoblin();
    field.reset();
    expect(boardEl.querySelector('.goblin')).toBeNull();
    expect(boardEl.querySelector('.has-goblin')).toBeNull();
  });
});
