// Smooth scrolling for navigation
function scrollToGames() {
    document.getElementById('games').scrollIntoView({
        behavior: 'smooth'
    });
}

// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function changeActiveLink() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Game modal functions
function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const gameTitle = document.getElementById('gameTitle');
    const gameContainer = document.getElementById('gameContainer');
    
    // Set game title
    const gameTitles = {
        'clicker': 'Click Master',
        'memory': 'Memory Challenge',
        'snake': 'Snake Classic',
        'puzzle': 'Number Puzzle',
        'reaction': 'Reaction Test',
        'typing': 'Type Racer',
        'infinitecraft': 'Infinite Craft',
        'passwordgame': 'Password Game',
        'lifechecker': 'Life Checker'
    };
    
    gameTitle.textContent = gameTitles[gameType] || 'Game';
    
    // Load game content
    gameContainer.innerHTML = getGameHTML(gameType);
    
    // Show modal
    modal.style.display = 'block';
    
    // Initialize game
    initializeGame(gameType);
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        closeGame();
    }
}

// Game HTML generators
function getGameHTML(gameType) {
    switch(gameType) {
        case 'clicker':
            return `
                <div class="game-area">
                    <div class="game-stats">
                        <div>Score: <span id="clickScore">0</span></div>
                        <div>Clicks/sec: <span id="clickRate">0</span></div>
                    </div>
                    <div class="click-target" id="clickTarget">
                        <div class="click-button">CLICK ME!</div>
                    </div>
                    <div class="game-info">
                        <p>Click as fast as you can for 30 seconds!</p>
                        <button id="startClicker" class="game-btn">Start Game</button>
                    </div>
                </div>
            `;
        
        case 'memory':
            return `
                <div class="game-area">
                    <div class="game-stats">
                        <div>Level: <span id="memoryLevel">1</span></div>
                        <div>Score: <span id="memoryScore">0</span></div>
                    </div>
                    <div id="memoryGrid" class="memory-grid"></div>
                    <div class="game-info">
                        <p>Watch the sequence and repeat it!</p>
                        <button id="startMemory" class="game-btn">Start Game</button>
                    </div>
                </div>
            `;
        
        case 'snake':
            return `
                <div class="game-area">
                    <div class="game-stats">
                        <div>Score: <span id="snakeScore">0</span></div>
                        <div>High Score: <span id="snakeHighScore">0</span></div>
                    </div>
                    <canvas id="snakeCanvas" width="400" height="400"></canvas>
                    <div class="game-info">
                        <p>Use arrow keys to control the snake!</p>
                        <button id="startSnake" class="game-btn">Start Game</button>
                    </div>
                </div>
            `;
        
        case 'puzzle':
            return `
                <div class="game-area">
                    <div class="game-stats">
                        <div>Moves: <span id="puzzleMoves">0</span></div>
                        <div>Time: <span id="puzzleTime">00:00</span></div>
                    </div>
                    <div id="puzzleGrid" class="puzzle-grid"></div>
                    <div class="game-info">
                        <p>Arrange numbers from 1 to 15!</p>
                        <button id="shufflePuzzle" class="game-btn">Shuffle</button>
                    </div>
                </div>
            `;
        
        case 'reaction':
            return `
                <div class="game-area">
                    <div class="game-stats">
                        <div>Best Time: <span id="bestReaction">-</span>ms</div>
                        <div>Average: <span id="avgReaction">-</span>ms</div>
                    </div>
                    <div id="reactionArea" class="reaction-area">
                        <div class="reaction-text">Click "Start" to begin</div>
                    </div>
                    <div class="game-info">
                        <button id="startReaction" class="game-btn">Start Test</button>
                    </div>
                </div>
            `;
        
        case 'typing':
            return `
                <div class="game-area">
                    <div class="game-stats">
                        <div>WPM: <span id="typingWPM">0</span></div>
                        <div>Accuracy: <span id="typingAccuracy">100</span>%</div>
                    </div>
                    <div class="typing-text" id="typingText"></div>
                    <textarea id="typingInput" placeholder="Start typing here..." disabled></textarea>
                    <div class="game-info">
                        <button id="startTyping" class="game-btn">Start Test</button>
                    </div>
                </div>
            `;
        
        case 'infinitecraft':
            return `
                <div class="game-area">
                    <div class="craft-header">
                        <div class="discoveries-count">Discoveries: <span id="discoveryCount">4</span></div>
                        <button id="resetCraft" class="game-btn">Reset</button>
                    </div>
                    <div class="craft-workspace">
                        <div class="elements-sidebar">
                            <h3>Elements</h3>
                            <div id="elementsList" class="elements-list"></div>
                        </div>
                        <div class="craft-area">
                            <div class="craft-zone" id="craftZone">
                                <div class="craft-slot" id="slot1">Drop element here</div>
                                <div class="craft-plus">+</div>
                                <div class="craft-slot" id="slot2">Drop element here</div>
                                <div class="craft-equals">=</div>
                                <div class="craft-result" id="craftResult">?</div>
                            </div>
                            <button id="craftButton" class="game-btn craft-btn" disabled>Craft!</button>
                        </div>
                    </div>
                    <div class="recent-discoveries" id="recentDiscoveries"></div>
                </div>
            `;
        
        case 'passwordgame':
            return `
                <div class="game-area">
                    <div class="password-header">
                        <h3>Create a password that satisfies all requirements</h3>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="rules-completed">
                            <span id="rulesCompleted">0</span> / <span id="totalRules">8</span> rules satisfied
                        </div>
                    </div>
                    <div class="password-input-container">
                        <input type="text" id="passwordInput" placeholder="Enter your password here..." autocomplete="off">
                        <div class="password-length">Length: <span id="passwordLength">0</span></div>
                    </div>
                    <div class="rules-list" id="rulesList"></div>
                    <div class="game-info">
                        <div id="passwordSuccess" class="success-message" style="display: none;">
                            🎉 Congratulations! Your password satisfies all requirements!
                        </div>
                    </div>
                </div>
            `;
        
        case 'lifechecker':
            return `
                <div class="game-area">
                    <div class="life-header">
                        <h3>How much time have you spent alive?</h3>
                        <p>Enter your birth date to see fascinating time calculations</p>
                    </div>
                    <div class="birth-input">
                        <label for="birthDate">Your Birth Date:</label>
                        <input type="date" id="birthDate" max="${new Date().toISOString().split('T')[0]}">
                        <button id="calculateLife" class="game-btn">Calculate</button>
                    </div>
                    <div id="lifeStats" class="life-stats" style="display: none;">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-number" id="yearsAlive">0</div>
                                <div class="stat-label">Years</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" id="daysAlive">0</div>
                                <div class="stat-label">Days</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" id="hoursAlive">0</div>
                                <div class="stat-label">Hours</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" id="minutesAlive">0</div>
                                <div class="stat-label">Minutes</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" id="secondsAlive">0</div>
                                <div class="stat-label">Seconds</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number" id="heartbeats">0</div>
                                <div class="stat-label">Heartbeats (est.)</div>
                            </div>
                        </div>
                        <div class="fun-facts" id="funFacts"></div>
                    </div>
                </div>
            `;
        
        default:
            return '<p>Game not found!</p>';
    }
}

// Game initialization
function initializeGame(gameType) {
    switch(gameType) {
        case 'clicker':
            initClickerGame();
            break;
        case 'memory':
            initMemoryGame();
            break;
        case 'snake':
            initSnakeGame();
            break;
        case 'puzzle':
            initPuzzleGame();
            break;
        case 'reaction':
            initReactionGame();
            break;
        case 'typing':
            initTypingGame();
            break;
        case 'infinitecraft':
            initInfiniteCraftGame();
            break;
        case 'passwordgame':
            initPasswordGame();
            break;
        case 'lifechecker':
            initLifeCheckerGame();
            break;
    }
}

// Clicker Game
function initClickerGame() {
    let score = 0;
    let startTime = null;
    let gameActive = false;
    let gameTimer = null;
    
    const clickTarget = document.getElementById('clickTarget');
    const clickScore = document.getElementById('clickScore');
    const clickRate = document.getElementById('clickRate');
    const startBtn = document.getElementById('startClicker');
    
    function updateRate() {
        if (startTime && gameActive) {
            const elapsed = (Date.now() - startTime) / 1000;
            const rate = (score / elapsed).toFixed(1);
            clickRate.textContent = rate;
        }
    }
    
    clickTarget.addEventListener('click', function() {
        if (gameActive) {
            score++;
            clickScore.textContent = score;
            updateRate();
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        }
    });
    
    startBtn.addEventListener('click', function() {
        score = 0;
        gameActive = true;
        startTime = Date.now();
        clickScore.textContent = score;
        clickRate.textContent = '0';
        this.textContent = 'Game Started!';
        this.disabled = true;
        
        gameTimer = setTimeout(() => {
            gameActive = false;
            this.textContent = 'Start Game';
            this.disabled = false;
            alert(`Game Over! Final score: ${score} clicks`);
        }, 30000);
    });
}

// Memory Game
function initMemoryGame() {
    let sequence = [];
    let playerSequence = [];
    let level = 1;
    let score = 0;
    let gameActive = false;
    
    const grid = document.getElementById('memoryGrid');
    const levelSpan = document.getElementById('memoryLevel');
    const scoreSpan = document.getElementById('memoryScore');
    const startBtn = document.getElementById('startMemory');
    
    // Create grid
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'memory-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        grid.appendChild(cell);
    }
    
    function generateSequence() {
        sequence.push(Math.floor(Math.random() * 9));
    }
    
    function playSequence() {
        gameActive = false;
        let i = 0;
        const interval = setInterval(() => {
            if (i > 0) {
                document.querySelector(`[data-index="${sequence[i-1]}"]`).classList.remove('active');
            }
            if (i < sequence.length) {
                document.querySelector(`[data-index="${sequence[i]}"]`).classList.add('active');
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    document.querySelector(`[data-index="${sequence[i-1]}"]`).classList.remove('active');
                    gameActive = true;
                }, 500);
            }
        }, 600);
    }
    
    function handleCellClick(index) {
        if (!gameActive) return;
        
        playerSequence.push(index);
        
        if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
            alert('Wrong sequence! Game Over.');
            resetGame();
            return;
        }
        
        if (playerSequence.length === sequence.length) {
            score += level * 10;
            level++;
            scoreSpan.textContent = score;
            levelSpan.textContent = level;
            playerSequence = [];
            
            setTimeout(() => {
                generateSequence();
                playSequence();
            }, 1000);
        }
    }
    
    function resetGame() {
        sequence = [];
        playerSequence = [];
        level = 1;
        score = 0;
        gameActive = false;
        levelSpan.textContent = level;
        scoreSpan.textContent = score;
    }
    
    startBtn.addEventListener('click', function() {
        resetGame();
        generateSequence();
        playSequence();
    });
}

// Snake Game
function initSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreSpan = document.getElementById('snakeScore');
    const highScoreSpan = document.getElementById('snakeHighScore');
    const startBtn = document.getElementById('startSnake');
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0;
    let dy = 0;
    let score = 0;
    let gameRunning = false;
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    function drawGame() {
        clearCanvas();
        drawSnake();
        drawFood();
        moveSnake();
        checkCollision();
    }
    
    function clearCanvas() {
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawSnake() {
        ctx.fillStyle = '#667eea';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
    }
    
    function drawFood() {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreSpan.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }
    
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }
    
    function checkCollision() {
        const head = snake[0];
        
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
        }
        
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
            }
        }
    }
    
    function gameOver() {
        gameRunning = false;
        const highScore = localStorage.getItem('snakeHighScore') || 0;
        if (score > highScore) {
            localStorage.setItem('snakeHighScore', score);
            highScoreSpan.textContent = score;
        }
        alert(`Game Over! Score: ${score}`);
    }
    
    function startGame() {
        snake = [{x: 10, y: 10}];
        dx = 0;
        dy = 0;
        score = 0;
        scoreSpan.textContent = score;
        generateFood();
        gameRunning = true;
        
        const gameLoop = setInterval(() => {
            if (gameRunning) {
                drawGame();
            } else {
                clearInterval(gameLoop);
            }
        }, 100);
    }
    
    document.addEventListener('keydown', (e) => {
        if (!gameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx === 0) { dx = 1; dy = 0; }
                break;
        }
    });
    
    startBtn.addEventListener('click', startGame);
    
    // Load high score
    const savedHighScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreSpan.textContent = savedHighScore;
}

// Reaction Test Game
function initReactionGame() {
    const reactionArea = document.getElementById('reactionArea');
    const bestSpan = document.getElementById('bestReaction');
    const avgSpan = document.getElementById('avgReaction');
    const startBtn = document.getElementById('startReaction');
    
    let startTime;
    let timeout;
    let attempts = [];
    
    function startTest() {
        reactionArea.className = 'reaction-area waiting';
        reactionArea.innerHTML = '<div class="reaction-text">Wait for green...</div>';
        startBtn.disabled = true;
        
        const delay = Math.random() * 4000 + 1000; // 1-5 seconds
        
        timeout = setTimeout(() => {
            reactionArea.className = 'reaction-area ready';
            reactionArea.innerHTML = '<div class="reaction-text">CLICK NOW!</div>';
            startTime = Date.now();
            
            reactionArea.onclick = function() {
                const reactionTime = Date.now() - startTime;
                attempts.push(reactionTime);
                
                // Update best time
                const best = Math.min(...attempts);
                bestSpan.textContent = best;
                
                // Update average
                const avg = Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
                avgSpan.textContent = avg;
                
                reactionArea.className = 'reaction-area';
                reactionArea.innerHTML = `<div class="reaction-text">Reaction time: ${reactionTime}ms<br>Click "Start Test" to try again</div>`;
                reactionArea.onclick = null;
                startBtn.disabled = false;
            };
        }, delay);
    }
    
    startBtn.addEventListener('click', startTest);
}

// Typing Test Game
function initTypingGame() {
    const texts = [
        "The quick brown fox jumps over the lazy dog.",
        "To be or not to be, that is the question.",
        "In a hole in the ground there lived a hobbit.",
        "It was the best of times, it was the worst of times.",
        "All that is gold does not glitter, not all those who wander are lost."
    ];
    
    const textDisplay = document.getElementById('typingText');
    const textInput = document.getElementById('typingInput');
    const wpmSpan = document.getElementById('typingWPM');
    const accuracySpan = document.getElementById('typingAccuracy');
    const startBtn = document.getElementById('startTyping');
    
    let startTime;
    let currentText;
    
    function startTest() {
        currentText = texts[Math.floor(Math.random() * texts.length)];
        textDisplay.innerHTML = currentText.split('').map(char => `<span>${char}</span>`).join('');
        textInput.value = '';
        textInput.disabled = false;
        textInput.focus();
        startTime = Date.now();
        startBtn.disabled = true;
        
        textInput.oninput = function() {
            const typed = this.value;
            const spans = textDisplay.querySelectorAll('span');
            
            let correct = 0;
            spans.forEach((span, index) => {
                if (index < typed.length) {
                    if (typed[index] === span.textContent) {
                        span.className = 'correct';
                        correct++;
                    } else {
                        span.className = 'incorrect';
                    }
                } else {
                    span.className = '';
                }
            });
            
            // Calculate WPM and accuracy
            if (typed.length > 0) {
                const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
                const wordsTyped = typed.length / 5; // standard: 5 characters = 1 word
                const wpm = Math.round(wordsTyped / timeElapsed);
                const accuracy = Math.round((correct / typed.length) * 100);
                
                wpmSpan.textContent = wpm;
                accuracySpan.textContent = accuracy;
            }
            
            // Check if test is complete
            if (typed === currentText) {
                textInput.disabled = true;
                startBtn.disabled = false;
                alert('Test completed!');
            }
        };
    }
    
    startBtn.addEventListener('click', startTest);
}

// 15-Puzzle Game
function initPuzzleGame() {
    const grid = document.getElementById('puzzleGrid');
    const movesSpan = document.getElementById('puzzleMoves');
    const timeSpan = document.getElementById('puzzleTime');
    const shuffleBtn = document.getElementById('shufflePuzzle');
    
    let tiles = [];
    let emptyIndex = 15;
    let moves = 0;
    let startTime;
    let timer;
    
    function createPuzzle() {
        grid.innerHTML = '';
        tiles = Array.from({length: 16}, (_, i) => i);
        
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.dataset.index = i;
            
            if (i === 15) {
                tile.className += ' empty';
            } else {
                tile.textContent = i + 1;
                tile.addEventListener('click', () => moveTile(i));
            }
            
            grid.appendChild(tile);
        }
    }
    
    function moveTile(index) {
        if (canMove(index)) {
            // Swap with empty tile
            const emptyTile = document.querySelector('.puzzle-tile.empty');
            const clickedTile = document.querySelector(`[data-index="${index}"]`);
            
            // Update visual
            emptyTile.textContent = clickedTile.textContent;
            emptyTile.className = 'puzzle-tile';
            emptyTile.addEventListener('click', () => moveTile(emptyIndex));
            
            clickedTile.textContent = '';
            clickedTile.className = 'puzzle-tile empty';
            clickedTile.removeEventListener('click', () => moveTile(index));
            
            // Update data
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            emptyIndex = index;
            
            moves++;
            movesSpan.textContent = moves;
            
            // Start timer on first move
            if (moves === 1) {
                startTime = Date.now();
                timer = setInterval(updateTimer, 1000);
            }
            
            // Check win condition
            if (isWon()) {
                clearInterval(timer);
                setTimeout(() => alert('Congratulations! Puzzle solved!'), 100);
            }
        }
    }
    
    function canMove(index) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;
        
        return (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
               (Math.abs(col - emptyCol) === 1 && row === emptyRow);
    }
    
    function isWon() {
        for (let i = 0; i < 15; i++) {
            if (tiles[i] !== i + 1) return false;
        }
        return tiles[15] === 0;
    }
    
    function shuffle() {
        // Reset
        moves = 0;
        movesSpan.textContent = moves;
        timeSpan.textContent = '00:00';
        if (timer) clearInterval(timer);
        
        // Shuffle algorithm that ensures solvability
        for (let i = 0; i < 1000; i++) {
            const validMoves = [];
            for (let j = 0; j < 16; j++) {
                if (canMove(j)) validMoves.push(j);
            }
            if (validMoves.length > 0) {
                const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                moveTile(randomMove);
            }
        }
        
        // Reset move counter after shuffling
        moves = 0;
        movesSpan.textContent = moves;
    }
    
    function updateTimer() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        timeSpan.textContent = `${minutes}:${seconds}`;
    }
    
    shuffleBtn.addEventListener('click', shuffle);
    
    createPuzzle();
}

// Infinite Craft Game
function initInfiniteCraftGame() {
    const elementsList = document.getElementById('elementsList');
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const craftResult = document.getElementById('craftResult');
    const craftButton = document.getElementById('craftButton');
    const discoveryCount = document.getElementById('discoveryCount');
    const resetButton = document.getElementById('resetCraft');
    const recentDiscoveries = document.getElementById('recentDiscoveries');
    
    let elements = new Set(['Fire', 'Water', 'Earth', 'Wind']);
    let discoveries = [];
    let draggedElement = null;
    let slot1Element = null;
    let slot2Element = null;
    
    // Crafting recipes (simplified version of infinite craft)
    const recipes = {
        'Fire + Water': 'Steam',
        'Fire + Earth': 'Lava',
        'Fire + Wind': 'Smoke',
        'Water + Earth': 'Mud',
        'Water + Wind': 'Mist',
        'Earth + Wind': 'Dust',
        'Steam + Earth': 'Geyser',
        'Lava + Water': 'Obsidian',
        'Smoke + Water': 'Cloud',
        'Mud + Fire': 'Brick',
        'Mist + Fire': 'Rainbow',
        'Dust + Water': 'Clay',
        'Cloud + Earth': 'Mountain',
        'Rainbow + Water': 'Waterfall',
        'Mountain + Fire': 'Volcano',
        'Volcano + Water': 'Island',
        'Island + Wind': 'Desert',
        'Desert + Water': 'Oasis',
        'Clay + Fire': 'Pottery',
        'Pottery + Water': 'Vase',
        'Brick + Brick': 'Wall',
        'Wall + Wall': 'House',
        'House + Wind': 'Windmill',
        'Windmill + Water': 'Energy',
        'Energy + Earth': 'Plant',
        'Plant + Water': 'Tree',
        'Tree + Fire': 'Wood',
        'Wood + Wood': 'Forest',
        'Forest + Fire': 'Campfire',
        'Campfire + Earth': 'Ash',
        'Ash + Water': 'Soap',
        'Plant + Wind': 'Seed',
        'Seed + Earth': 'Garden',
        'Garden + Water': 'Flower',
        'Flower + Wind': 'Pollen',
        'Tree + Wind': 'Leaves',
        'Leaves + Fire': 'Autumn',
        'Steam + Steam': 'Pressure',
        'Pressure + Earth': 'Diamond',
        'Diamond + Fire': 'Star',
        'Star + Water': 'Wish',
        'Wish + Earth': 'Magic',
        'Magic + Fire': 'Phoenix',
        'Phoenix + Water': 'Rebirth',
        'Obsidian + Wind': 'Glass',
        'Glass + Fire': 'Lens',
        'Lens + Star': 'Telescope',
        'Telescope + Earth': 'Science',
        'Science + Water': 'Chemistry',
        'Chemistry + Fire': 'Explosion',
        'Explosion + Earth': 'Crater',
        'Crater + Water': 'Lake',
        'Lake + Wind': 'Wave',
        'Wave + Earth': 'Beach',
        'Beach + Fire': 'Sand',
        'Sand + Wind': 'Sandstorm',
        'Energy + Energy': 'Power',
        'Power + Earth': 'Machine',
        'Machine + Water': 'Robot',
        'Robot + Fire': 'AI',
        'AI + Wind': 'Future',
        'Future + Earth': 'City',
        'City + Water': 'Venice',
        'Venice + Wind': 'Romance',
        'Romance + Fire': 'Passion',
        'Passion + Earth': 'Life'
    };
    
    function renderElements() {
        elementsList.innerHTML = '';
        Array.from(elements).sort().forEach(element => {
            const elementDiv = document.createElement('div');
            elementDiv.className = 'element-item';
            elementDiv.draggable = true;
            elementDiv.textContent = element;
            elementDiv.addEventListener('dragstart', handleDragStart);
            elementsList.appendChild(elementDiv);
        });
        discoveryCount.textContent = elements.size;
    }
    
    function handleDragStart(e) {
        draggedElement = e.target.textContent;
        e.target.style.opacity = '0.5';
    }
    
    function handleDragEnd(e) {
        e.target.style.opacity = '1';
    }
    
    function handleDrop(e, slot) {
        e.preventDefault();
        if (draggedElement) {
            slot.textContent = draggedElement;
            slot.style.backgroundColor = '#e3f2fd';
            
            if (slot === slot1) {
                slot1Element = draggedElement;
            } else {
                slot2Element = draggedElement;
            }
            
            checkCraftability();
        }
    }
    
    function checkCraftability() {
        if (slot1Element && slot2Element) {
            craftButton.disabled = false;
            const recipe1 = `${slot1Element} + ${slot2Element}`;
            const recipe2 = `${slot2Element} + ${slot1Element}`;
            const result = recipes[recipe1] || recipes[recipe2];
            
            if (result) {
                craftResult.textContent = result;
                craftResult.style.color = '#4caf50';
            } else {
                craftResult.textContent = 'Nothing';
                craftResult.style.color = '#f44336';
            }
        } else {
            craftButton.disabled = true;
            craftResult.textContent = '?';
            craftResult.style.color = '#666';
        }
    }
    
    function craft() {
        if (slot1Element && slot2Element) {
            const recipe1 = `${slot1Element} + ${slot2Element}`;
            const recipe2 = `${slot2Element} + ${slot1Element}`;
            const result = recipes[recipe1] || recipes[recipe2];
            
            if (result && !elements.has(result)) {
                elements.add(result);
                discoveries.push({
                    element: result,
                    recipe: recipe1,
                    timestamp: new Date()
                });
                
                // Show discovery animation
                showDiscovery(result);
                renderElements();
                updateRecentDiscoveries();
            }
            
            // Reset slots
            clearSlots();
        }
    }
    
    function clearSlots() {
        slot1.textContent = 'Drop element here';
        slot2.textContent = 'Drop element here';
        slot1.style.backgroundColor = '';
        slot2.style.backgroundColor = '';
        slot1Element = null;
        slot2Element = null;
        checkCraftability();
    }
    
    function showDiscovery(element) {
        const discovery = document.createElement('div');
        discovery.className = 'discovery-popup';
        discovery.innerHTML = `🎉 Discovered: <strong>${element}</strong>!`;
        document.body.appendChild(discovery);
        
        setTimeout(() => {
            discovery.style.opacity = '0';
            setTimeout(() => discovery.remove(), 300);
        }, 2000);
    }
    
    function updateRecentDiscoveries() {
        const recent = discoveries.slice(-5).reverse();
        recentDiscoveries.innerHTML = recent.map(d => 
            `<div class="recent-discovery">
                <span class="discovery-element">${d.element}</span>
                <span class="discovery-recipe">${d.recipe}</span>
            </div>`
        ).join('');
    }
    
    function resetGame() {
        elements = new Set(['Fire', 'Water', 'Earth', 'Wind']);
        discoveries = [];
        clearSlots();
        renderElements();
        recentDiscoveries.innerHTML = '';
    }
    
    // Event listeners
    slot1.addEventListener('dragover', e => e.preventDefault());
    slot1.addEventListener('drop', e => handleDrop(e, slot1));
    
    slot2.addEventListener('dragover', e => e.preventDefault());
    slot2.addEventListener('drop', e => handleDrop(e, slot2));
    
    craftButton.addEventListener('click', craft);
    resetButton.addEventListener('click', resetGame);
    
    // Add event listeners to elements (will be set in renderElements)
    elementsList.addEventListener('dragend', handleDragEnd);
    
    renderElements();
}

// Password Game
function initPasswordGame() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordLength = document.getElementById('passwordLength');
    const rulesList = document.getElementById('rulesList');
    const rulesCompleted = document.getElementById('rulesCompleted');
    const totalRules = document.getElementById('totalRules');
    const progressFill = document.getElementById('progressFill');
    const successMessage = document.getElementById('passwordSuccess');
    
    const rules = [
        {
            id: 'length',
            text: 'Your password must be at least 8 characters long',
            check: (password) => password.length >= 8
        },
        {
            id: 'uppercase',
            text: 'Your password must include an uppercase letter',
            check: (password) => /[A-Z]/.test(password)
        },
        {
            id: 'lowercase',
            text: 'Your password must include a lowercase letter',
            check: (password) => /[a-z]/.test(password)
        },
        {
            id: 'number',
            text: 'Your password must include a number',
            check: (password) => /\d/.test(password)
        },
        {
            id: 'special',
            text: 'Your password must include a special character (!@#$%^&*)',
            check: (password) => /[!@#$%^&*]/.test(password)
        },
        {
            id: 'roman',
            text: 'Your password must include a Roman numeral',
            check: (password) => /[IVXLCDM]/.test(password)
        },
        {
            id: 'sum',
            text: 'The digits in your password must add up to 25',
            check: (password) => {
                const digits = password.match(/\d/g);
                if (!digits) return false;
                const sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);
                return sum === 25;
            }
        },
        {
            id: 'chicken',
            text: 'Your password must include the word "chicken"',
            check: (password) => password.toLowerCase().includes('chicken')
        }
    ];
    
    function renderRules() {
        totalRules.textContent = rules.length;
        rulesList.innerHTML = rules.map(rule => 
            `<div class="rule-item" id="rule-${rule.id}">
                <div class="rule-status">❌</div>
                <div class="rule-text">${rule.text}</div>
            </div>`
        ).join('');
    }
    
    function checkPassword() {
        const password = passwordInput.value;
        passwordLength.textContent = password.length;
        
        let completed = 0;
        rules.forEach(rule => {
            const ruleElement = document.getElementById(`rule-${rule.id}`);
            const statusElement = ruleElement.querySelector('.rule-status');
            
            if (rule.check(password)) {
                ruleElement.classList.add('rule-satisfied');
                statusElement.textContent = '✅';
                completed++;
            } else {
                ruleElement.classList.remove('rule-satisfied');
                statusElement.textContent = '❌';
            }
        });
        
        rulesCompleted.textContent = completed;
        const progress = (completed / rules.length) * 100;
        progressFill.style.width = `${progress}%`;
        
        if (completed === rules.length) {
            successMessage.style.display = 'block';
            progressFill.style.background = 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)';
        } else {
            successMessage.style.display = 'none';
            progressFill.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
    
    passwordInput.addEventListener('input', checkPassword);
    
    renderRules();
    checkPassword();
}

// Life Checker Game
function initLifeCheckerGame() {
    const birthDateInput = document.getElementById('birthDate');
    const calculateButton = document.getElementById('calculateLife');
    const lifeStats = document.getElementById('lifeStats');
    const funFacts = document.getElementById('funFacts');
    
    function calculateLife() {
        const birthDate = new Date(birthDateInput.value);
        const now = new Date();
        
        if (!birthDateInput.value || birthDate > now) {
            alert('Please enter a valid birth date!');
            return;
        }
        
        const diffMs = now - birthDate;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffYears = diffDays / 365.25;
        
        // Estimated heartbeats (average 70 bpm)
        const heartbeats = Math.floor(diffMinutes * 70);
        
        // Update stats with animations
        animateCounter(document.getElementById('yearsAlive'), Math.floor(diffYears));
        animateCounter(document.getElementById('daysAlive'), diffDays);
        animateCounter(document.getElementById('hoursAlive'), diffHours);
        animateCounter(document.getElementById('minutesAlive'), diffMinutes);
        animateCounter(document.getElementById('secondsAlive'), diffSeconds);
        animateCounter(document.getElementById('heartbeats'), heartbeats);
        
        // Generate fun facts
        generateFunFacts(diffDays, diffYears);
        
        lifeStats.style.display = 'block';
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    }
    
    function generateFunFacts(days, years) {
        const facts = [
            `You've experienced approximately ${Math.floor(years * 4)} seasons`,
            `You've lived through about ${Math.floor(days / 7)} weeks`,
            `You've seen approximately ${Math.floor(days)} sunrises and sunsets`,
            `You've breathed roughly ${Math.floor(days * 20000).toLocaleString()} times`,
            `You've blinked about ${Math.floor(days * 15000).toLocaleString()} times`,
            `You've slept for roughly ${Math.floor(years * 2920)} hours (8 hours/day)`,
            `You've probably consumed around ${Math.floor(days * 2)} liters of water`,
            `Your hair has grown approximately ${Math.floor(years * 6)} inches`,
            `You've lived through ${Math.floor(years / 4)} leap years`,
            `The Earth has traveled ${Math.floor(years * 584000000).toLocaleString()} miles around the sun with you on it`
        ];
        
        const selectedFacts = facts.sort(() => Math.random() - 0.5).slice(0, 5);
        funFacts.innerHTML = selectedFacts.map(fact => 
            `<div class="fun-fact">🌟 ${fact}</div>`
        ).join('');
    }
    
    calculateButton.addEventListener('click', calculateLife);
    
    // Allow Enter key to calculate
    birthDateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateLife();
        }
    });
}

// Add game-specific styles
const gameStyles = `
    .game-area {
        text-align: center;
        padding: 1rem;
    }
    
    .game-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 10px;
        font-weight: 600;
    }
    
    .game-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 1rem;
    }
    
    .game-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .game-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .game-info {
        margin-top: 2rem;
        color: #666;
    }
    
    /* Clicker Game */
    .click-target {
        width: 200px;
        height: 200px;
        margin: 2rem auto;
        cursor: pointer;
        transition: all 0.1s ease;
    }
    
    .click-button {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    /* Memory Game */
    .memory-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        max-width: 300px;
        margin: 2rem auto;
    }
    
    .memory-cell {
        aspect-ratio: 1;
        background: #f0f0f0;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .memory-cell.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transform: scale(0.95);
    }
    
    /* Snake Game */
    #snakeCanvas {
        border: 2px solid #ddd;
        border-radius: 10px;
        margin: 1rem auto;
        display: block;
    }
    
    /* Puzzle Game */
    .puzzle-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        max-width: 300px;
        margin: 2rem auto;
        background: #ddd;
        padding: 5px;
        border-radius: 10px;
    }
    
    .puzzle-tile {
        aspect-ratio: 1;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .puzzle-tile.empty {
        background: transparent;
        cursor: default;
    }
    
    .puzzle-tile:hover:not(.empty) {
        transform: scale(0.95);
    }
    
    /* Reaction Game */
    .reaction-area {
        width: 300px;
        height: 200px;
        margin: 2rem auto;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #f0f0f0;
    }
    
    .reaction-area.waiting {
        background: #ffd93d;
        color: #333;
    }
    
    .reaction-area.ready {
        background: #6BCF7F;
        color: white;
        animation: pulse 0.5s infinite;
    }
    
    .reaction-text {
        text-align: center;
    }
    
    /* Typing Game */
    .typing-text {
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        line-height: 1.8;
        margin: 2rem 0;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 10px;
        text-align: left;
    }
    
    .typing-text span.correct {
        background: #d4edda;
        color: #155724;
    }
    
    .typing-text span.incorrect {
        background: #f8d7da;
        color: #721c24;
    }
    
    #typingInput {
        width: 100%;
        height: 100px;
        font-family: 'Courier New', monospace;
        font-size: 1.1rem;
        padding: 1rem;
        border: 2px solid #ddd;
        border-radius: 10px;
        resize: none;
        outline: none;
    }
    
    #typingInput:focus {
        border-color: #667eea;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    /* Infinite Craft Game */
    .craft-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .discoveries-count {
        font-weight: 600;
        color: #667eea;
    }
    
    .craft-workspace {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .elements-sidebar {
        flex: 1;
        max-width: 250px;
    }
    
    .elements-sidebar h3 {
        margin-bottom: 1rem;
        color: #333;
    }
    
    .elements-list {
        max-height: 300px;
        overflow-y: auto;
        padding: 0.5rem;
        border: 2px dashed #ddd;
        border-radius: 10px;
        background: #f9f9f9;
    }
    
    .element-item {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.5rem 1rem;
        margin: 0.25rem 0;
        border-radius: 20px;
        cursor: grab;
        transition: all 0.2s ease;
        user-select: none;
    }
    
    .element-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
    }
    
    .element-item:active {
        cursor: grabbing;
    }
    
    .craft-area {
        flex: 2;
        text-align: center;
    }
    
    .craft-zone {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 15px;
        border: 2px dashed #ddd;
    }
    
    .craft-slot {
        width: 120px;
        height: 60px;
        border: 2px dashed #ccc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        color: #999;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }
    
    .craft-slot:hover {
        border-color: #667eea;
        background: #f0f7ff;
    }
    
    .craft-plus, .craft-equals {
        font-size: 1.5rem;
        font-weight: bold;
        color: #667eea;
    }
    
    .craft-result {
        width: 120px;
        height: 60px;
        border: 2px solid #667eea;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .craft-btn {
        font-size: 1.2rem;
        padding: 1rem 2rem;
    }
    
    .recent-discoveries {
        margin-top: 2rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .recent-discovery {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        margin: 0.25rem 0;
        background: white;
        border-radius: 5px;
    }
    
    .discovery-element {
        font-weight: bold;
        color: #667eea;
    }
    
    .discovery-recipe {
        color: #666;
        font-size: 0.9rem;
    }
    
    .discovery-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: bold;
        box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
        z-index: 10000;
        animation: popIn 0.3s ease;
        transition: opacity 0.3s ease;
    }
    
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    /* Password Game */
    .password-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .password-header h3 {
        margin-bottom: 1rem;
        color: #333;
    }
    
    .progress-bar {
        width: 100%;
        height: 20px;
        background: #f0f0f0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        transition: all 0.3s ease;
        border-radius: 10px;
    }
    
    .rules-completed {
        font-weight: 600;
        color: #667eea;
    }
    
    .password-input-container {
        margin-bottom: 2rem;
    }
    
    #passwordInput {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        border: 2px solid #ddd;
        border-radius: 10px;
        outline: none;
        transition: border-color 0.3s ease;
        margin-bottom: 0.5rem;
    }
    
    #passwordInput:focus {
        border-color: #667eea;
    }
    
    .password-length {
        text-align: right;
        color: #666;
        font-size: 0.9rem;
    }
    
    .rules-list {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .rule-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        margin: 0.5rem 0;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #f44336;
        transition: all 0.3s ease;
    }
    
    .rule-item.rule-satisfied {
        background: #e8f5e8;
        border-left-color: #4caf50;
    }
    
    .rule-status {
        margin-right: 1rem;
        font-size: 1.2rem;
    }
    
    .rule-text {
        flex: 1;
        font-weight: 500;
    }
    
    .success-message {
        background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        font-weight: bold;
        animation: slideIn 0.5s ease;
    }
    
    /* Life Checker Game */
    .life-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .life-header h3 {
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .life-header p {
        color: #666;
    }
    
    .birth-input {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }
    
    .birth-input label {
        font-weight: 500;
        color: #333;
    }
    
    #birthDate {
        padding: 0.5rem;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
    }
    
    #birthDate:focus {
        border-color: #667eea;
    }
    
    .life-stats {
        animation: fadeIn 0.5s ease;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stat-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem 1rem;
        border-radius: 15px;
        text-align: center;
        transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
    }
    
    .stat-number {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .fun-facts {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
    }
    
    .fun-fact {
        padding: 0.5rem 0;
        color: #333;
        border-bottom: 1px solid #eee;
    }
    
    .fun-fact:last-child {
        border-bottom: none;
    }
`;

// Inject game styles
const styleSheet = document.createElement('style');
styleSheet.textContent = gameStyles;
document.head.appendChild(styleSheet);