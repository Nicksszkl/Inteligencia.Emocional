const questions = [
    "Você sente que sua felicidade depende de uma pessoa específica?",
    "Você sente medo de perder alguém, mesmo que não tenha motivo?",
    "Você evita tomar decisões importantes sem consultar alguém?",
    "Você se sente ansioso(a) quando essa pessoa não responde suas mensagens imediatamente?",
    "Você costuma mudar seus planos para agradar essa pessoa?",
    "Você tem dificuldade em dizer 'não' para essa pessoa?",
    "Você se sente inseguro(a) quando essa pessoa está com outras pessoas?",
    "Você sente necessidade de estar constantemente em contato com essa pessoa?",
    "Você evita expressar seus sentimentos para não desagradar essa pessoa?",
    "Você sente que sua vida gira em torno de agradar essa pessoa?",
    "Você sente que faria qualquer coisa para manter essa pessoa em sua vida?",
    "Você se sente incompleto(a) quando não está com essa pessoa?",
    "Você se preocupa excessivamente com a opinião dessa pessoa sobre você?",
    "Você costuma se sentir culpado(a) ao fazer algo sem essa pessoa?",
    "Você sente que sua autoestima depende da aceitação dessa pessoa?"
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

// Adiciona um botão "Voltar para a página inicial" no final do teste
const homeBtn = document.createElement("button");
homeBtn.textContent = "Voltar para a página inicial";
homeBtn.id = "home-btn";
homeBtn.style.display = "none"; // Oculto inicialmente
homeBtn.addEventListener("click", () => {
    window.location.href = "Teste SPSI.html"; // Redireciona para a página inicial
});
resultContainer.appendChild(homeBtn);

function showQuestion(index) {
    questionContainer.style.display = "block"; // Certifica-se de que o container de perguntas esteja visível
    resultContainer.style.display = "none"; // Esconde o container de resultado ao exibir perguntas

    questionText.textContent = questions[index];
    currentQuestion.textContent = `Pergunta ${index + 1} de ${totalQuestions}`;

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
    let resultTextContent = "";

    if (totalScore < 15) {
        resultTextContent = "Nível de dependência emocional: Baixo. Você tende a ser emocionalmente independente.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else if (totalScore < 25) {
        resultTextContent = "Nível de dependência emocional: Moderado. Você demonstra alguns sinais de dependência emocional.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else {
        resultTextContent = "Nível de dependência emocional: Alto. Você pode estar fortemente dependente emocionalmente de alguém.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    }

    resultText.textContent = resultTextContent;

    // Esconde o container de perguntas e exibe o resultado
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    homeBtn.style.display = "inline-block"; // Exibe o botão para voltar à página inicial
}

// Função para confirmar a resposta e exibir a próxima pergunta ou o resultado
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
        alert("Por favor, selecione uma opção antes de continuar.");
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

// Detecta a tecla Enter e a trata como o botão "Confirmar"
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Previne o comportamento padrão do Enter em formulários
        confirmAnswer();
    }
});

// Exibe a primeira pergunta ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    showQuestion(currentQuestionIndex);
});
