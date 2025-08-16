let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
    feedbackEl.innerText = "";
    optionsEl.innerHTML = "";

    let currentQuestion = quizQuestions[currentQuestionIndex];
    questionEl.innerHTML = `<h2>${currentQuestion.question}</h2>`;

    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => selectAnswer(index));
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    let correctIndex = quizQuestions[currentQuestionIndex].answer;
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach((btn, index) => {
        if (index === correctIndex) btn.classList.add("correct");
        if (index === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("incorrect");
        btn.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        feedbackEl.innerText = "✅ Correct!";
        score++;
    } else {
        feedbackEl.innerText = `❌ Incorrect! The correct answer is "${quizQuestions[currentQuestionIndex].options[correctIndex]}".`;
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    document.getElementById("quiz-box").style.display = "none";
    scoreContainer.style.display = "block";
    scoreEl.innerText = `${score} / ${quizQuestions.length}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.style.display = "none";
    document.getElementById("quiz-box").style.display = "block";
    showQuestion();
});

showQuestion();