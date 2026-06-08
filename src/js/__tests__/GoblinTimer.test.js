import { GoblinTimer } from '../GoblinTimer.js';

describe('GoblinTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('вызывает onShow при старте', () => {
    const onShow = jest.fn();
    const onMiss = jest.fn();
    const timer = new GoblinTimer(1000);
    timer.setCallbacks(onShow, onMiss);

    timer.start();
    expect(onShow).toHaveBeenCalledTimes(1);

    timer.stop();
  });

  test('вызывает onMiss после истечения времени', () => {
    const onShow = jest.fn();
    const onMiss = jest.fn();
    const timer = new GoblinTimer(1000);
    timer.setCallbacks(onShow, onMiss);

    timer.start();
    jest.advanceTimersByTime(1000);

    expect(onMiss).toHaveBeenCalledTimes(1);

    timer.stop();
  });

  test('stop останавливает цикл — onMiss не вызывается после stop', () => {
    const onShow = jest.fn();
    const onMiss = jest.fn();
    const timer = new GoblinTimer(1000);
    timer.setCallbacks(onShow, onMiss);

    timer.start();
    timer.stop();
    jest.advanceTimersByTime(2000);

    expect(onMiss).not.toHaveBeenCalled();
  });

  test('после попадания и повторного start — цикл продолжается', () => {
    const onShow = jest.fn();
    const onMiss = jest.fn();
    const timer = new GoblinTimer(1000);
    timer.setCallbacks(onShow, onMiss);

    timer.start();       // 1-й показ
    timer.stop();        // симулируем попадание
    timer.start();       // 2-й показ
    timer.stop();

    expect(onShow).toHaveBeenCalledTimes(2);
    expect(onMiss).not.toHaveBeenCalled();
  });
});
