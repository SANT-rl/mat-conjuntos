// Variables del juego
let score = 0;
let lives = 3;
let currentLevel = '';
let questions = [];
let currentQuestionIndex = 0;
let answering = false; // Variable para controlar si el jugador está respondiendo

// Función para empezar el juego
function startGame(level) {
    currentLevel = level;
    score = 0;
    lives = 3;
    currentQuestionIndex = 0;
    answering = false;

    // Ocultar la pantalla de bienvenida
    document.getElementById('welcome-screen').style.display = 'none';

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
        let questionData = questions[currentQuestionIndex];
        document.getElementById('question').innerText = questionData.question;
        for (let i = 0; i < 4; i++) {
            document.getElementById('answer-' + i).innerText = questionData.answers[i];
        }
        document.getElementById('feedback').innerText = ''; // Limpiar feedback de respuestas anteriores
        document.getElementById('lives').innerText = `Vidas: ${lives}`; // Actualizar vidas
    } else {
        // Si se completaron todas las preguntas, mostrar felicitaciones
        document.getElementById('game-screen').style.display = 'none'; // Ocultar la pantalla de preguntas
        document.getElementById('congratulations-screen').style.display = 'block'; // Mostrar pantalla de felicitaciones
        document.getElementById('congratulations-message').innerText = `¡Felicitaciones! Has completado el nivel ${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}.`;
        document.getElementById('final-score').innerText = `Puntaje final: ${score}`;
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
    goToMenu();
}

// Volver al menú principal
function goToMenu() {
    // Reiniciar variables importantes
    questions = [];
    currentQuestionIndex = 0;
    answering = false;
    score = 0;
    lives = 3;
    currentLevel = '';

    // Mostrar pantallas correctamente
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('congratulations-screen').style.display = 'none';

    // Limpiar textos visibles
    document.getElementById('question').innerText = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('score').innerText = 'Puntos: 0';
    document.getElementById('lives').innerText = 'Vidas: 3';
}


