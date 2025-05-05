// Variables del juego
let score = 0;
let lives = 3;
let currentLevel = '';
let questions = [];
let currentQuestionIndex = 0;
let answering = false; // Variable para controlar si el jugador está respondiendo
let target; // Variable para el cuadro amarillo
let questionContainer; // Contenedor para mostrar la pregunta
let correctAnswer; // Variable para almacenar la respuesta correcta
let totalQuestions = 20; // Total de preguntas
let currentQuestionCount = 0; // Contador de preguntas respondidas

// Función para empezar el juego
function startGame(level) {
    currentLevel = level;
    score = 0;
    lives = 3;
    currentQuestionIndex = 0;
    answering = false;

    // Ocultar el menú de selección de dificultad
    document.getElementById('menu-screen').style.display = 'none';

    // Mostrar la pantalla del juego
    document.getElementById('game-screen').style.display = 'block';

    // Cambiar información del nivel
    let levelInfo = document.getElementById('level-info');
    levelInfo.innerText = `Estás jugando en el nivel ${level.charAt(0).toUpperCase() + level.slice(1)}.`;

    // Cargar preguntas según el nivel
    loadQuestions(level);
    showQuestion();
}

// Función para cargar las preguntas según el nivel
function loadQuestions(level) {
    if (level === 'easy') {
        questions = [
            { question: "¿Cuál es el conjunto de la unión de {1, 2} y {2, 3}?", answers: ["{1, 2, 3}", "{1, 2}", "{2, 3}", "{1, 3}"], correctAnswer: 0 },
            { question: "¿Cuál es la intersección de {3, 4, 5} y {4, 5, 6}?", answers: ["{4, 5}", "{3, 6}", "{5, 6}", "{4, 6}"], correctAnswer: 0 },
            { question: "¿Cuál es la diferencia entre {1, 2, 3} y {2, 3, 4}?", answers: ["{1}", "{2, 3}", "{4}", "{1, 2}"], correctAnswer: 0 },
            { question: "¿Cuál es el complemento de {1, 2, 3} en el conjunto universal {1, 2, 3, 4, 5}?", answers: ["{4, 5}", "{3, 4, 5}", "{1, 2}", "{2, 3}"], correctAnswer: 0 },
            { question: "¿Cuál es la intersección de {1, 2} y {2, 3}?", answers: ["{1}", "{2}", "{3}", "{1, 2}"], correctAnswer: 1 },
            { question: "¿Cuál es la diferencia entre {3, 4, 5} y {4, 5, 6}?", answers: ["{3}", "{4}", "{5}", "{3, 4}"], correctAnswer: 0 },
            { question: "¿Cuál es la unión de {1, 3, 5} y {2, 4, 6}?", answers: ["{1, 3, 5, 2, 4, 6}", "{1, 2, 3, 4}", "{2, 4, 6}", "{1, 3, 5}"], correctAnswer: 0 },
            { question: "¿Cuál es la intersección de {2, 3, 5} y {3, 5, 7}?", answers: ["{3, 5}", "{2, 5}", "{3}", "{5, 7}"], correctAnswer: 0 }
        ];
    } else if (level === 'medium') {
        questions = [
            { question: "¿Cuál es la diferencia entre {1, 2, 3} y {2, 3, 4}?", answers: ["{1}", "{2, 3}", "{4}", "{1, 2}"], correctAnswer: 0 },
            { question: "¿Cuál es el complemento de {1, 2, 3} en el conjunto universal {1, 2, 3, 4, 5}?", answers: ["{4, 5}", "{3, 4, 5}", "{1, 2}", "{2, 3}"], correctAnswer: 0 },
            { question: "¿Cuál es la intersección de la unión de {1, 2} y {3, 4} con {2, 3}?", answers: ["{2}", "{1, 3}", "{2, 3}", "{1, 4}"], correctAnswer: 2 },
            { question: "¿Cuál es la diferencia entre el complemento de {1, 2} y {3, 4} en el conjunto universal {1, 2, 3, 4, 5}?", answers: ["{3, 4, 5}", "{1, 2, 3, 4, 5}", "{2, 3, 4}", "{5}"], correctAnswer: 3 },
            { question: "¿Cuál es la unión de {2, 4, 6} y {3, 5, 7}?", answers: ["{2, 3, 4, 5, 6, 7}", "{1, 2, 3}", "{4, 6, 7}", "{2, 4}"], correctAnswer: 0 },
            { question: "¿Cuál es la intersección de {1, 3, 5} y {3, 5, 7}?", answers: ["{3, 5}", "{1, 5}", "{3}", "{5, 7}"], correctAnswer: 0 },
            { question: "¿Cuál es la diferencia entre {1, 2, 3, 4} y {2, 3}?", answers: ["{1, 4}", "{1, 2, 3}", "{4}", "{3, 4}"], correctAnswer: 0 },
            { question: "¿Cuál es el complemento de {1, 2} en el conjunto universal {1, 2, 3, 4}?", answers: ["{3, 4}", "{2, 3}", "{1, 4}", "{1, 2}"], correctAnswer: 0 }
        ];
    } else if (level === 'hard') {
        questions = [
            { question: "¿Cuál es la intersección de la unión de {1, 2} y {3, 4} con {2, 3}?", answers: ["{2}", "{1, 3}", "{2, 3}", "{1, 4}"], correctAnswer: 2 },
            { question: "¿Cuál es la diferencia entre el complemento de {1, 2} y {3, 4} en el conjunto universal {1, 2, 3, 4, 5}?", answers: ["{3, 4, 5}", "{1, 2, 3, 4, 5}", "{2, 3, 4}", "{5}"], correctAnswer: 3 },
            { question: "¿Cuál es la intersección de {1, 2, 3, 4} y {3, 4, 5, 6}?", answers: ["{3, 4}", "{5, 6}", "{1, 2}", "{2, 3}"], correctAnswer: 0 },
            { question: "¿Cuál es la diferencia entre {1, 2, 3, 4} y {2, 4}?", answers: ["{1, 3}", "{1, 2}", "{2, 3, 4}", "{3, 4}"], correctAnswer: 0 },
            { question: "¿Cuál es la unión de {1, 2, 3} y {4, 5, 6}?", answers: ["{1, 2, 3, 4, 5, 6}", "{1, 2, 4}", "{3, 4, 5}", "{1, 2, 3}"], correctAnswer: 0 },
            { question: "¿Cuál es la intersección de {3, 5, 7} y {2, 4, 6}?", answers: ["{}", "{5}", "{3, 5}", "{2, 6}"], correctAnswer: 0 },
            { question: "¿Cuál es el complemento de {1, 3, 5} en el conjunto universal {1, 2, 3, 4, 5}?", answers: ["{2, 4}", "{1, 3}", "{4, 5}", "{1, 2}"], correctAnswer: 0 },
            { question: "¿Cuál es la diferencia entre {1, 2, 3} y {2, 4}?", answers: ["{1, 3}", "{2, 3}", "{4}", "{1}"], correctAnswer: 0 }
        ];
    }
}

// Mostrar la siguiente pregunta
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        updateProgress(currentQuestionIndex + 1, questions.length); // Actualizar progreso
        let questionData = questions[currentQuestionIndex];
        document.getElementById('question').innerText = questionData.question;
        for (let i = 0; i < 4; i++) {
            document.getElementById('answer-' + i).innerText = questionData.answers[i];
        }
        document.getElementById('feedback').innerText = ''; // Limpiar feedback de respuestas anteriores
        document.getElementById('lives').innerText = `Vidas: ${lives}`; // Actualizar vidas
    } else {
        // Si se completaron todas las preguntas, mostrar el menú de felicitaciones del juego de conjuntos
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('congratulations-screen').style.display = 'block';
    }
}

// Verificar si la respuesta seleccionada es correcta
function checkAnswer(answerIndex) {
    if (answering) return; // Si ya está respondiendo, no hacer nada

    answering = true; // Deshabilitar temporalmente para evitar cambiar de pregunta mientras se responde

    let questionData = questions[currentQuestionIndex];
    let feedbackText = '';

    if (answerIndex === questionData.correctAnswer) {
        score++;
        feedbackText = "¡Respuesta correcta!";
        document.getElementById('score').innerText = `Puntos: ${score}`;
        currentQuestionIndex++;
    } else {
        lives--;
        feedbackText = `Respuesta incorrecta. Te quedan ${lives} vidas.`;
        document.getElementById('lives').innerText = `Vidas: ${lives}`;
        if (lives <= 0) {
            endGame();
            return;
        }
    }

    document.getElementById('feedback').innerText = feedbackText;

    setTimeout(() => {
        answering = false;
        showQuestion();
    }, 1000);
}

// Finalizar el juego
function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'block'; // Mostrar pantalla de derrota

    // Mostrar el botón de "Volver al Menú del Juego"
    const returnButton = document.getElementById('return-to-main-menu-button');
    if (returnButton) {
        returnButton.style.display = 'block';
    }
}

function showCongratulations() {
    // Esta función solo debe usarse en el juego 2
    document.getElementById('game-2-container').style.display = 'none';
    const congratulationsPopup = document.getElementById('pacmath-congratulations');
    if (congratulationsPopup) {
        congratulationsPopup.style.display = 'block';
    }
}

// Mostrar el menú de selección de dificultad
function showGameMenu() {
    document.getElementById('main-menu').style.display = 'none'; // Ocultar el menú principal
    document.getElementById('menu-screen').style.display = 'block'; // Mostrar el menú de selección de niveles

    // Ocultar la barra de progreso
    document.getElementById('progress-bar-container').style.display = 'none';

    // Mostrar el botón de "Volver al Menú Principal"
    const returnButton = document.getElementById('return-to-main-menu-button');
    if (returnButton) {
        returnButton.style.display = 'block';
    }
}

// Volver al menú principal
function returnToMainMenu() {
    // Ocultar todas las pantallas
    document.getElementById('menu-screen').style.display = 'none'; // Ocultar el menú de selección de niveles
    document.getElementById('game-screen').style.display = 'none'; // Ocultar la pantalla del juego
    document.getElementById('game-over-screen').style.display = 'none'; // Ocultar la pantalla de derrota
    document.getElementById('congratulations-screen').style.display = 'none'; // Ocultar la pantalla de felicitaciones del juego de conjuntos
    document.getElementById('pacmath-congratulations').style.display = 'none'; // Ocultar la pantalla de felicitaciones de Pac Match
    document.getElementById('game-2-container').style.display = 'none'; // Ocultar el contenedor del juego 2
    document.getElementById('progress-bar-container').style.display = 'none'; // Ocultar la barra de progreso

    // Mostrar solo el menú principal
    document.getElementById('main-menu').style.display = 'block';

    // Reiniciar variables del juego
    score = 0;
    lives = 3;
    currentLevel = '';
    questions = [];
    currentQuestionIndex = 0;
    answering = false;
    currentQuestionCount = 0;

    // Limpiar textos visibles
    const questionElement = document.getElementById('question');
    if (questionElement) questionElement.innerText = '';
    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) feedbackElement.innerText = '';
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = 'Puntos: 0';
    const livesElement = document.getElementById('lives');
    if (livesElement) livesElement.innerText = 'Vidas: 3';

    // Eliminar el cuadro amarillo si existe (para el juego 2)
    if (target) {
        target.remove();
        target = null;
    }

    // Ocultar cualquier cuadro de felicitaciones o preguntas si están visibles
    if (questionContainer) {
        questionContainer.style.display = 'none';
    }
}

function goToMenu() {
    // Reiniciar variables importantes
    questions = [];
    currentQuestionIndex = 0;
    answering = false;
    score = 0;
    lives = 3;
    currentLevel = '';

    // Mostrar pantallas correctamente
    document.getElementById('game-over-screen').style.display = 'none'; // Ocultar pantalla de derrota
    document.getElementById('congratulations-screen').style.display = 'none'; // Ocultar pantalla de felicitaciones
    document.getElementById('menu-screen').style.display = 'block'; // Mostrar solo el menú de selección de dificultad
    document.getElementById('main-menu').style.display = 'none'; // Asegurarse de que el menú principal esté oculto

    // Ocultar la barra de progreso
    document.getElementById('progress-bar-container').style.display = 'none';

    // Limpiar textos visibles
    document.getElementById('question').innerText = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('score').innerText = 'Puntos: 0';
    document.getElementById('lives').innerText = 'Vidas: 3';
}

function updateProgress(current, total) {
    const progressText = document.getElementById('progress-text');
    progressText.textContent = `Nivel ${current}/${total}`;
    document.getElementById('progress-bar-container').style.display = 'block'; // Mostrar la barra
}

// Función para iniciar el Juego 2
function startGame2() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-2-container').style.display = 'flex';

    // Generar el primer cuadro amarillo
    generateTarget();
}

// Función para generar un cuadro amarillo en una posición aleatoria
function generateTarget() {
    const base = document.getElementById('game-base');
    const baseWidth = base.offsetWidth;
    const baseHeight = base.offsetHeight;

    // Crear el cuadro amarillo si no existe
    if (!target) {
        target = document.createElement('div');
        target.id = 'target';
        base.appendChild(target);
    }

    // Generar posiciones aleatorias dentro de los límites de la base
    const targetSize = 30; // Tamaño del cuadro amarillo
    const randomLeft = Math.floor(Math.random() * (baseWidth - targetSize));
    const randomBottom = Math.floor(Math.random() * (baseHeight - targetSize));

    // Posicionar el cuadro amarillo
    target.style.left = `${randomLeft}px`;
    target.style.bottom = `${randomBottom}px`;
}

// Función para verificar si el cuadro verde toca el cuadro amarillo
function checkCollision() {
    const player = document.getElementById('player');
    const playerRect = player.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Verificar colisión
    if (
        playerRect.left < targetRect.right &&
        playerRect.right > targetRect.left &&
        playerRect.top < targetRect.bottom &&
        playerRect.bottom > targetRect.top
    ) {
        // Si hay colisión, generar una pregunta matemática
        generateMathQuestion();
    }
}

// Función para generar una pregunta matemática
function generateMathQuestion() {
    const operations = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    let num2 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    const operation = operations[Math.floor(Math.random() * operations.length)]; // Operación aleatoria

    // Asegurarse de que num1 >= num2 para evitar resultados negativos en la resta
    if (operation === '-') {
        if (num1 < num2) {
            [num1, num2] = [num2, num1]; // Intercambiar valores si num1 es menor que num2
        }
        correctAnswer = num1 - num2;
    } else if (operation === '+') {
        correctAnswer = num1 + num2;
    } else if (operation === '*') {
        correctAnswer = num1 * num2;
    }

    // Mostrar la pregunta
    if (!questionContainer) {
        questionContainer = document.createElement('div');
        questionContainer.id = 'math-question';
        document.getElementById('game-2-container').appendChild(questionContainer);
    }

    questionContainer.innerHTML = `
        <p>¿Cuánto es ${num1} ${operation} ${num2}?</p>
        <input type="number" id="player-answer" inputmode="numeric" placeholder="Escribe tu respuesta" style="width: 100%; padding: 10px; margin-top: 10px; border-radius: 5px; border: 1px solid #ccc;">
        <button onclick="checkMathAnswer()">Responder</button>
        <p id="feedback-message" style="margin-top: 10px; color: white;"></p>
        <p id="question-counter" style="margin-top: 10px; color: white;">Pregunta ${currentQuestionCount + 1}/${totalQuestions}</p>
    `;

    // Mostrar el cuadro de la pregunta
    questionContainer.style.display = 'block';

    // Ocultar el cuadro amarillo mientras se responde
    target.style.display = 'none';
}

// Función para verificar la respuesta del jugador
function checkMathAnswer() {
    const playerAnswer = document.getElementById('player-answer').value.trim(); // Obtener el valor ingresado
    const feedbackMessage = document.getElementById('feedback-message');

    if (playerAnswer === '') {
        // Si el campo está vacío, mostrar un mensaje
        feedbackMessage.style.color = 'orange';
        feedbackMessage.innerText = 'Por favor, ingresa una respuesta.';
        return;
    }

    if (parseInt(playerAnswer) === correctAnswer) {
        // Respuesta correcta
        feedbackMessage.style.color = 'green';
        feedbackMessage.innerText = '¡Correcto! Felicitaciones.';

        // Incrementar el contador de preguntas
        currentQuestionCount++;

        // Verificar si se alcanzó el total de preguntas
        if (currentQuestionCount >= totalQuestions) {
            setTimeout(() => {
                showPacMathCongratulations(); // Mostrar el cuadro de felicitaciones
            }, 1000);
        } else {
            // Esperar un segundo antes de continuar
            setTimeout(() => {
                feedbackMessage.innerText = ''; // Limpiar el mensaje de retroalimentación
                questionContainer.style.display = 'none'; // Ocultar la pregunta
                generateTarget(); // Generar un nuevo cuadro amarillo
                target.style.display = 'block'; // Mostrar el cuadro amarillo
            }, 1000);
        }
    } else {
        // Respuesta incorrecta
        feedbackMessage.style.color = 'red';
        feedbackMessage.innerText = 'Incorrecto. Vuelve a intentarlo.';
    }
}

// Modificar la función `movePlayer` para verificar colisiones
function movePlayer(direction) {
    const player = document.getElementById('player');
    const base = document.getElementById('game-base');
    const playerStyle = window.getComputedStyle(player);
    const baseStyle = window.getComputedStyle(base);

    // Obtener las posiciones actuales
    const playerLeft = parseInt(playerStyle.left);
    const playerBottom = parseInt(playerStyle.bottom);
    const baseWidth = parseInt(baseStyle.width);
    const baseHeight = parseInt(baseStyle.height);
    const playerSize = parseInt(playerStyle.width);

    // Movimiento según la dirección
    const step = 10; // Tamaño del paso
    if (direction === 'up' && playerBottom + playerSize + step <= baseHeight) {
        player.style.bottom = `${playerBottom + step}px`;
    } else if (direction === 'down' && playerBottom - step >= 0) {
        player.style.bottom = `${playerBottom - step}px`;
    } else if (direction === 'left' && playerLeft - step >= 0) {
        player.style.left = `${playerLeft - step}px`;
    } else if (direction === 'right' && playerLeft + playerSize + step <= baseWidth) {
        player.style.left = `${playerLeft + step}px`;
    }

    // Verificar colisión después de mover
    checkCollision();
}

// Generar el primer cuadro amarillo al iniciar el juego
document.addEventListener('DOMContentLoaded', () => {
    generateTarget();
});

function showPacMathCongratulations() {
    // Ocultar el cuadro de la pregunta si está visible
    if (questionContainer) {
        questionContainer.style.display = 'none';
    }

    // Mostrar el cuadro de felicitaciones
    const congratulationsPopup = document.getElementById('pacmath-congratulations');
    if (congratulationsPopup) {
        congratulationsPopup.style.display = 'block';
    }
}
