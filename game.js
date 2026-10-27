const COLS = 20;
const ROWS = 20;
const BLOCK = 20;
const INITIAL_SPEED = 150; // ms por paso
const SPEED_INCREMENT = 5; // ms menos por cada comida
const MIN_SPEED = 50;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

let snake, direction, nextDirection, food, score, speed;
let paused = false;
let gameOver = false;
let lastTime = null;
let accumulator = 0;

const DIRECTIONS = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};

function init() {
    createSnake();
    createFood();
    resetScore();
    startGameLoop();
}

function createSnake() {
    const cx = Math.floor(COLS / 2);
    const cy = Math.floor(ROWS / 2);
    snake = [
        { x: cx, y: cy },
        { x: cx - 1, y: cy },
        { x: cx - 2, y: cy },
    ];
    direction = DIRECTIONS.ArrowRight;
    nextDirection = direction;
}

function createFood() {
    do {
        food = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS),
        };
    } while (snake.some(s => s.x === food.x && s.y === food.y));
}

function resetScore() {
    score = 0;
    speed = INITIAL_SPEED;
    updateScore();
}

function updateScore() {
    scoreEl.textContent = `Puntuación: ${score}`;
}

function startGameLoop() {
    requestAnimationFrame(loop);
}

function loop(time) {
    const delta = lastTime === null ? 0 : time - lastTime;
    lastTime = time;

    if (!paused && !gameOver) {
        accumulator += delta;
        while (accumulator >= speed) {
            accumulator -= speed;
            update();
            if (gameOver) break;
        }
    }

    draw();
    requestAnimationFrame(loop);
}

function update() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    const hitsWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
    const eats = head.x === food.x && head.y === food.y;
    // Si no come, la cola se mueve y su celda queda libre
    const body = eats ? snake : snake.slice(0, -1);
    const hitsSelf = body.some(s => s.x === head.x && s.y === head.y);

    if (hitsWall || hitsSelf) {
        gameOver = true;
        return;
    }

    snake.unshift(head);

    if (eats) {
        score++;
        speed = Math.max(MIN_SPEED, speed - SPEED_INCREMENT);
        updateScore();
        createFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(food.x * BLOCK, food.y * BLOCK, BLOCK, BLOCK);

    ctx.fillStyle = '#0f0';
    for (const s of snake) {
        ctx.fillRect(s.x * BLOCK + 1, s.y * BLOCK + 1, BLOCK - 2, BLOCK - 2);
    }

    if (paused) drawMessage('PAUSA');
    if (gameOver) drawMessage('GAME OVER — pulsa R');
}

function drawMessage(text) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function restart() {
    createSnake();
    createFood();
    resetScore();
    paused = false;
    gameOver = false;
    accumulator = 0;
}

document.addEventListener('keydown', e => {
    const dir = DIRECTIONS[e.key];
    if (dir) {
        e.preventDefault();
        // Evita girar 180° sobre sí misma
        if (dir.x !== -direction.x || dir.y !== -direction.y) {
            nextDirection = dir;
        }
        return;
    }

    const key = e.key.toLowerCase();
    if (key === 'p' && !gameOver) {
        paused = !paused;
    } else if (key === 'r') {
        restart();
    }
});

init();
