
// ===================================
// 1. SWITCH BETWEEN GAMES
// ===================================

function showGame(gameName, selectedTab) {
    document.querySelectorAll(".game").forEach(game => {
        game.classList.remove("active");
    });

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(gameName).classList.add("active");

    selectedTab.classList.add("active");
}


// ===================================
// 2. MEMORY MATCH GAME
// ===================================

const symbols = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍒", "🥝"];

let cards = [];
let firstCard = null;
let secondCard = null;
let locked = false;
let moves = 0;
let matched = 0;


// Start or restart the game
function startMemory() {
    cards = [...symbols, ...symbols];

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    locked = false;
    moves = 0;
    matched = 0;

    document.getElementById("moves").textContent = moves;

    document.getElementById("memoryResult").textContent = "";

    const grid = document.getElementById("grid");

    grid.innerHTML = "";

    // Create 12 cards
    cards.forEach((symbol) => {
        const button = document.createElement("button");

        button.className = "card";
        button.textContent = "?";

        button.onclick = function() {
            flipCard(button, symbol);
        };

        grid.appendChild(button);
    });
}


// Flip a card
function flipCard(button, symbol) {

    // Prevent invalid clicks
    if (
        locked ||
        button.classList.contains("matched") ||
        button === firstCard
    ) {
        return;
    }

    button.textContent = symbol;

    // First card
    if (firstCard === null) {
        firstCard = button;
        return;
    }

    // Second card
    secondCard = button;

    moves++;

    document.getElementById("moves").textContent = moves;

    // Check if cards match
    if (firstCard.textContent === secondCard.textContent) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matched++;

        firstCard = null;
        secondCard = null;

        // Check if all pairs are found
        if (matched === symbols.length) {
            document.getElementById("memoryResult").textContent =
                "Congratulations! You matched all pairs!";
        }

    } else {

        // Cards do not match
        locked = true;

        setTimeout(function() {

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard = null;
            secondCard = null;

            locked = false;

        }, 800);
    }
}


// ===================================
// 3. C BUG HUNTER QUIZ
// ===================================


const questions = [
    {
        question: "Which line has an error?",
        code: 'int number = 10\nprintf("%d", number);',
        answers: [
            "A. Missing semicolon",
            "B. Missing int",
            "C. Missing printf",
            "D. No error"
        ],
        correct: 0,
        explanation: "A semicolon is missing after int number = 10."
    },

    {
        question: "What is the output?",
        code: 'int x = 5;\nif (x > 3) {\n    x++;\n}\nprintf("%d", x);',
        answers: [
            "A. 3",
            "B. 5",
            "C. 6",
            "D. Error"
        ],
        correct: 2,
        explanation: "x starts at 5. Since 5 > 3, x++ increases it to 6."
    },

    {
        question: "What is wrong with this code?",
        code: 'int main() {\n    printf("Hello")\n    return 0;\n}',
        answers: [
            "A. Missing semicolon after printf",
            "B. Missing return 0",
            "C. Missing main function",
            "D. Wrong data type"
        ],
        correct: 0,
        explanation: "The printf statement needs a semicolon."
    },

    {
        question: "What is the output?",
        code: 'int arr[3] = {2, 4, 6};\nprintf("%d", arr[1]);',
        answers: [
            "A. 2",
            "B. 4",
            "C. 6",
            "D. Error"
        ],
        correct: 1,
        explanation: "Array indexing starts at 0, so arr[1] is 4."
    },

    {
        question: "What is wrong with this condition?",
        code: 'int x = 5;\nif (x = 10) {\n    printf("Yes");\n}',
        answers: [
            "A. Should use == to compare",
            "B. Should use != instead",
            "C. Missing int",
            "D. Nothing is wrong"
        ],
        correct: 0,
        explanation: "Use == for comparison. A single = assigns a value."
    },

    {
        question: "How many times will this loop run?",
        code: 'for (int i = 0; i < 4; i++) {\n    printf("%d", i);\n}',
        answers: [
            "A. 3 times",
            "B. 4 times",
            "C. 5 times",
            "D. Infinite loop"
        ],
        correct: 1,
        explanation: "The loop runs with i = 0, 1, 2, and 3. That is 4 times."
    },

    {
        question: "What is the output?",
        code: 'int a = 3;\nint b = 2;\nprintf("%d", a + b * 2);',
        answers: [
            "A. 10",
            "B. 7",
            "C. 12",
            "D. 8"
        ],
        correct: 1,
        explanation: "Multiplication happens first: 3 + (2 * 2) = 7."
    }
];



let currentQuestion = 0;
let score = 0;
let answered = false;


// Display a question
function loadQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("number").textContent =
    currentQuestion + 1;

    document.getElementById("totalQuestions").textContent = 
    questions.length;

    document.getElementById("questionText").textContent =
        q.question;

    document.getElementById("codeText").textContent =
        q.code;

    document.getElementById("feedback").textContent = "";

    const answerBox = document.getElementById("answers");

    answerBox.innerHTML = "";

    // Create answer buttons
    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.onclick = function() {
            checkAnswer(index);
        };

        answerBox.appendChild(button);
    });
}


// Check the selected answer
function checkAnswer(index) {

    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];

    if (index === q.correct) {

        score++;

        document.getElementById("feedback").textContent =
            "Correct! " + q.explanation;

    } else {

        document.getElementById("feedback").textContent =
            "Incorrect. " + q.explanation;
    }

    document.getElementById("score").textContent = score;
}


// Move to the next question
function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        document.getElementById("questionText").textContent =
            "Quiz completed!";

        document.getElementById("codeText").textContent =
            "Your final score: " + score + " / " + questions.length;

        document.getElementById("answers").innerHTML = "";

        document.getElementById("feedback").textContent =
            "Well done!";
    }
}


// ===================================
// 4. START THE GAMES
// ===================================

startMemory();

loadQuestion();
