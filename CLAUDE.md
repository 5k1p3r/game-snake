# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Basic Snake implemented per `README.md`: black background, white food, green snake. The folder is named `Dino`, but the game is Snake.

## Running

No build, lint, or test tooling. No dependencies.

```bash
python3 -m http.server 8000   # or: npx serve .
# open http://localhost:8000
```

Windows shortcut: `start index.html`.

## Architecture

Vanilla JS (ES6+), HTML5 Canvas 2D, `requestAnimationFrame`. All game logic lives in `game.js`.

```text
init()
  ├─ createSnake()
  ├─ createFood()
  ├─ resetScore()
  └─ startGameLoop()
        ↓
   update()
     ├─ move snake
     ├─ check collisions (walls, own body)
     ├─ check food (grow, score, speed up)
     └─ draw()
```

Config constants documented in the README:

| Constant | Meaning | Example |
|---|---|---|
| `COLS` | Grid columns | `20` |
| `ROWS` | Grid rows | `20` |
| `BLOCK` | Cell size (px) | `20` |
| `INITIAL_SPEED` | Initial tick interval | `150` |
| `SPEED_INCREMENT` | Speed increase per food | `5` |
| `MIN_SPEED` | Fastest tick interval (not in README) | `50` |

Controls: arrow keys move, `P` pauses/resumes, `R` restarts. Game Over ends the round; restart resets snake, food and score.

A single `requestAnimationFrame` loop runs for the whole session. It accumulates elapsed time and calls `update()` every `speed` ms, while not paused or over. `restart()` resets state but never starts a second loop. Arrow keys set `nextDirection`, which `update()` applies once per tick, so 180° turns are blocked.

## Conventions

- No external dependencies or frameworks.
- UI text and README are in Spanish (`<html lang="es">`).
- Keep the README in sync when function names, constants or controls change.
