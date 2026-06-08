# Whack-a-Goblin 🔨

[![Deploy to GitHub Pages](https://github.com/devlop12x-crypto/ahj-goblin-game2/actions/workflows/deploy.yml/badge.svg)](https://github.com/devlop12x-crypto/ahj-goblin-game2/actions/workflows/deploy.yml)

🎮 [Открыть игру](https://devlop12x-crypto.github.io/ahj-goblin-game2/)

---

## Правила игры

- Гоблин появляется в случайной ячейке на **1 секунду**
- Кликни по гоблину молотком — получи **+1 балл**
- Пропустил **5 гоблинов** — игра окончена

## Архитектура

Приложение разбито на 4 класса:

| Класс | Ответственность |
|---|---|
| `GameField` | DOM-поле: ячейки, отображение гоблина, делегирование кликов |
| `GoblinTimer` | Цикл появлений: показать → подождать 1с → промах |
| `ScoreBoard` | Счёт и промахи: хранение данных + обновление DOM |
| `Game` | Оркестратор: связывает все классы, управляет состоянием игры |

## Технологии

- JavaScript (ES6+ классы)
- Webpack 5 + Babel
- Jest (jsdom)
- yarn
- GitHub Actions → GitHub Pages

## Запуск локально

```bash
yarn install
yarn start      # dev-сервер на :8080
yarn test       # запуск тестов
yarn build      # production сборка в /dist
```
