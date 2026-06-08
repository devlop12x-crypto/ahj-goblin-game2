import { ScoreBoard } from '../ScoreBoard.js';

describe('ScoreBoard', () => {
  let scoreEl;
  let missesEl;
  let scoreboard;

  beforeEach(() => {
    scoreEl = document.createElement('span');
    missesEl = document.createElement('span');
    scoreboard = new ScoreBoard(scoreEl, missesEl, 5);
  });

  test('начальный счёт равен 0', () => {
    expect(scoreboard.score).toBe(0);
  });

  test('начальное количество промахов равно 0', () => {
    expect(scoreboard.misses).toBe(0);
  });

  test('addScore увеличивает счёт на 1', () => {
    scoreboard.addScore();
    scoreboard.addScore();
    expect(scoreboard.score).toBe(2);
  });

  test('addMiss увеличивает промахи на 1', () => {
    scoreboard.addMiss();
    expect(scoreboard.misses).toBe(1);
  });

  test('isGameOver возвращает true при достижении maxMisses', () => {
    for (let i = 0; i < 5; i++) {
      scoreboard.addMiss();
    }
    expect(scoreboard.isGameOver).toBe(true);
  });

  test('isGameOver возвращает false если промахов меньше maxMisses', () => {
    scoreboard.addMiss();
    scoreboard.addMiss();
    expect(scoreboard.isGameOver).toBe(false);
  });

  test('reset сбрасывает счёт и промахи', () => {
    scoreboard.addScore();
    scoreboard.addMiss();
    scoreboard.reset();
    expect(scoreboard.score).toBe(0);
    expect(scoreboard.misses).toBe(0);
  });

  test('addScore обновляет DOM-элемент счёта', () => {
    scoreboard.addScore();
    expect(scoreEl.textContent).toBe('1');
  });

  test('addMiss обновляет DOM-элемент промахов', () => {
    scoreboard.addMiss();
    expect(missesEl.textContent).toBe('1 / 5');
  });

  test('reset обновляет оба DOM-элемента', () => {
    scoreboard.addScore();
    scoreboard.addMiss();
    scoreboard.reset();
    expect(scoreEl.textContent).toBe('0');
    expect(missesEl.textContent).toBe('0 / 5');
  });
});
