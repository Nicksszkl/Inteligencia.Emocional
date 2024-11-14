const questions = [
    "Você se sente confiante sobre suas habilidades e qualidades?",
    "Você se sente confortável ao receber elogios?",
    "Você acredita que merece coisas boas em sua vida?",
    "Você se sente satisfeito com quem você é como pessoa?",
    "Você se compara frequentemente com os outros?",
    "Você evita situações onde possa ser julgado?",
    "Você sente orgulho das suas conquistas?",
    "Você se critica severamente quando comete um erro?",
    "Você sente que é uma pessoa valiosa e digna de respeito?",
    "Você acha fácil aceitar suas falhas e imperfeições?",
    "Você se sente confortável ao expressar sua opinião em público?",
    "Você acredita que tem controle sobre sua própria vida?",
    "Você evita estabelecer metas por medo de falhar?",
    "Você se sente digno de amor e aceitação?",
    "Você sente que suas opiniões e sentimentos são importantes?"
];

const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let answers = new Array(totalQuestions).fill(null);

// Seletores de elementos HTML
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const currentQuestion = document.getElementById("current-question");
const options = document.getElementsByName("answer");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

// Adiciona o botão de voltar à página inicial apenas uma vez
const homeBtn = document.createElement("button");
homeBtn.textContent = "Voltar para a página inicial";
homeBtn.id = "home-btn";
homeBtn.style.display = "none"; // Oculte inicialmente
homeBtn.addEventListener("click", () => {
    window.location.href = "Teste SPSI.html"; // Redireciona para a página inicial
});
resultContainer.appendChild(homeBtn);

function showQuestion(index) {
    questionContainer.style.display = "block"; // Certifica-se de que o container de perguntas esteja visível
    resultContainer.style.display = "none"; // Esconde o resultado enquanto as perguntas estão sendo exibidas

    questionText.textContent = questions[index];
    currentQuestion.textContent = index + 1;

    // Carregar a resposta previamente selecionada (se houver)
    const selectedAnswer = answers[index];
    options.forEach(option => {
        option.checked = parseInt(option.value) === selectedAnswer;
    });

    // Habilitar/desabilitar botão "Voltar" conforme necessário
    prevBtn.disabled = index === 0;
}

function showResult() {
    const totalScore = answers.reduce((acc, answer) => acc + answer, 0);
    let resultMsg;
    if (totalScore < 20) {
        resultMsg = "Nível de autoestima baixo. Considere trabalhar mais na valorização de si mesmo.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else if (totalScore < 35) {
        resultMsg = "Nível de autoestima moderado. Com pequenas mudanças, você pode melhorar sua autoestima.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else {
        resultMsg = "Nível de autoestima elevado. Continue cultivando essa confiança!(Este teste não é um diagnóstico definitivo, procure um profissional)";
    }
    resultText.textContent = resultMsg;

    // Esconde o container de perguntas e exibe o resultado
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    homeBtn.style.display = "inline-block"; // Exibe o botão para voltar à página inicial
}

// Manipula o clique no botão "Confirmar/Finalizar"
function confirmAnswer() {
    const selectedOption = Array.from(options).find(opt => opt.checked);
    if (selectedOption) {
        answers[currentQuestionIndex] = parseInt(selectedOption.value);
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    } else {
        alert("Por favor, selecione uma opção.");
    }
}

nextBtn.addEventListener("click", confirmAnswer);

// Manipula o clique no botão "Voltar"
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
});

// Função para detectar o pressionamento da tecla "Enter" e agir como "Confirmar"
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Previne o comportamento padrão do Enter em formulários
        confirmAnswer();
    }
});

// Exibe a primeira pergunta ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestionIndex);
});
