# Snake

Implementación del clásico **Snake** en JavaScript vanilla, usando HTML5 Canvas y CSS. Sin dependencias externas, sin frameworks y sin proceso de build: solo abrir y jugar.

![Tech](https://img.shields.io/badge/HTML5-Canvas-orange)
![Tech](https://img.shields.io/badge/CSS3-blueviolet)
![Tech](https://img.shields.io/badge/JavaScript-Vanilla-yellow)

---

## Tabla de contenidos

- [Snake](#snake)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el juego](#cómo-ejecutar-el-juego)
    - [Opción 1: abrir el archivo directamente](#opción-1-abrir-el-archivo-directamente)
    - [Opción 2: servidor local (recomendado)](#opción-2-servidor-local-recomendado)
  - [Controles](#controles)
  - [Cómo funciona](#cómo-funciona)
    - [1. index.html](#1-indexhtml)
    - [2. style.css](#2-stylecss)
    - [3. game.js](#3-gamejs)
    - [Flujo del juego](#flujo-del-juego)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

Es una versión jugable del clásico **Snake**, donde el objetivo es controlar una serpiente, comer comida para crecer y evitar colisionar con los límites del tablero o con su propio cuerpo.

Características principales:

- Tablero renderizado mediante **HTML5 Canvas**.
- Movimiento continuo de la serpiente sobre una cuadrícula.
- Generación aleatoria de comida.
- Incremento de longitud cada vez que la serpiente come.
- Sistema de puntuación basado en la cantidad de comida consumida.
- Aumento progresivo de la dificultad mediante incremento de velocidad.
- Función de **pausa** y **Game Over**.
- Reinicio de la partida al finalizar.

---

## Cómo ejecutar el juego

No hay nada que instalar ni compilar.

### Opción 1: abrir el archivo directamente

```bash
open index.html
xdg-open index.html
start index.html
```

### Opción 2: servidor local (recomendado)

```bash
python3 -m http.server 8000
npx serve .
php -S localhost:8000
```

Después abre `http://localhost:8000` en el navegador.

---

## Controles

| Tecla | Acción |
|--------|---------|
| ↑ | Mover arriba |
| ↓ | Mover abajo |
| ← | Mover a la izquierda |
| → | Mover a la derecha |
| P | Pausar / reanudar |
| R | Reiniciar partida |

---

## Cómo funciona

### 1. `index.html`

Define la estructura visual del juego utilizando un elemento `<canvas>` donde se renderiza el tablero y los elementos de interfaz.

### 2. `style.css`

Define la apariencia visual, colores, distribución y estilos generales.

### 3. `game.js`

Contiene toda la lógica del juego:

- Movimiento de la serpiente.
- Generación de comida.
- Detección de colisiones.
- Sistema de puntuación.
- Incremento de velocidad.
- Gestión del estado de pausa y Game Over.

### Flujo del juego

```text
init()
  ├─ createSnake()
  ├─ createFood()
  ├─ resetScore()
  └─ startGameLoop()
        ↓
   update()
     ├─ mover serpiente
     ├─ comprobar colisiones
     ├─ comprobar comida
     ├─ actualizar puntuación
     └─ draw()
```

---

## Tecnologías

- **HTML5**
- **CSS3**
- **JavaScript (ES6+) Vanilla**
- **Canvas 2D API**
- **requestAnimationFrame**

**Sin dependencias externas.**

---

## Estructura del proyecto

```text
03-snake/
├── index.html
├── style.css
├── game.js
└── README.md
```

---

## Personalización

| Constante | Significado | Ejemplo |
|------------|-------------|----------|
| `COLS` | Número de columnas | `20` |
| `ROWS` | Número de filas | `20` |
| `BLOCK` | Tamaño de celda | `20` |
| `INITIAL_SPEED` | Velocidad inicial | `150` |
| `SPEED_INCREMENT` | Aumento de velocidad | `5` |

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
