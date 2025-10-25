document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Ki volt Várpalota leghíresebb várkapitánya?",
            answers: [
                { text: "Thury György", correct: true },
                { text: "Zrínyi Miklós", correct: false },
                { text: "Dobó István", correct: false },
                { text: "Kinizsi Pál", correct: false }
            ]
        },
        {
            question: "Melyik múzeum található a Zichy-kastély épületében?",
            answers: [
                { text: "Bányászati Múzeum", correct: false },
                { text: "Magyar Vegyészeti Múzeum", correct: false },
                { text: "Trianon Múzeum", correct: true },
                { text: "Városi Képtár", correct: false }
            ]
        },
        {
            question: "Melyik iparág volt meghatározó Várpalotán a 20. században?",
            answers: [
                { text: "Textilipar", correct: false },
                { text: "Szénbányászat", correct: true },
                { text: "Autógyártás", correct: false },
                { text: "Hajógyártás", correct: false }
            ]
        },
        {
            question: "Melyik híres kézilabdázó született Várpalotán?",
            answers: [
                { text: "Nagy László", correct: false },
                { text: "Gál Gyula", correct: true },
                { text: "Lékai Máté", correct: false },
                { text: "Mikler Roland", correct: false }
            ]
        },
        {
            question: "Melyik híres film egyes jeleneteit forgatták az Inotai Hőerőműben?",
            answers: [
                { text: "Terminátor: Sötét végzet", correct: false },
                { text: "Dűne", correct: false },
                { text: "Szárnyas fejvadász 2049", correct: true },
                { text: "Tenet", correct: false }
            ]
        },
        {
            question: "Hányan élnek napjainkban Várpalotán?",
            answers: [
                { text: "Körülbelül 10 ezren", correct: false },
                { text: "Körülbelül 20 ezren", correct: true },
                { text: "Körülbelül 15 ezren", correct: false },
                { text: "Körülbelül 25 ezren", correct: false }
            ]
        },
        {
            question: "Hogy hívják Várpalota szépen megőrzött, 19. századi néprajzi tájházát?",
            answers: [
                { text: "Fodor Sára Tájház", correct: true },
                { text: "Nagy Gyula Tájház", correct: false },
                { text: "Thury György Tájház", correct: false },
                { text: "Zichy Tájház", correct: false }
            ]
        },
        {
            question: "Melyik ismert magyar zenész, rapper született Várpalotán?",
            answers: [
                { text: "Karácson Tamás (Fluor)", correct: true },
                { text: "Majka", correct: false },
                { text: "Pápai Joci", correct: false },
                { text: "Geszti Péter", correct: false }
            ]
        },
        {
            question: "Melyik híres, Ezüstcipős magyar labdarúgó született Várpalotán?",
            answers: [
                { text: "Détári Lajos", correct: false },
                { text: "Göröcs János", correct: false },
                { text: "Nyilasi Tibor", correct: true },
                { text: "Törőcsik András", correct: false }
            ]
        },
        {
            question: "Milyen korból származnak az Inota mellett, a 8-as főút közelében található halomsírok?",
            answers: [
                { text: "Bronzkorból", correct: false },
                { text: "Római korból", correct: true },
                { text: "Árpád-korból", correct: false },
                { text: "A török hódoltság korából", correct: false }
            ]
        }
        
    ];

    const questionTextEl = document.getElementById('question-text');
    const answerButtonsEl = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const kvizContainer = document.getElementById('kviz');
    const resultContainer = document.getElementById('result-container');
    const resultTextEl = document.getElementById('result-text');
    const restartButton = document.getElementById('restart-btn');

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.style.display = 'none';
        resultContainer.style.display = 'none';
        kvizContainer.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        resetState();
        
        let currentQuestion = questions[currentQuestionIndex];
        questionTextEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('answer-btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        
        if (isCorrect) {
            selectedBtn.classList.add('correct');
            score++;
        } else {
            selectedBtn.classList.add('incorrect');
        }
        
        Array.from(answerButtonsEl.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        
        nextButton.style.display = 'block';
    }

    function showResults() {
        kvizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        resultTextEl.innerText = `Eredményed: ${questions.length} kérdésből ${score} pontot értél el!`;
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    nextButton.addEventListener('click', handleNextButton);
    restartButton.addEventListener('click', startQuiz);

    startQuiz();
});