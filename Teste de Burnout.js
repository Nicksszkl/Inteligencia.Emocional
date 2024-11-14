const questions = [
    "Você se sente constantemente exausto(a), mesmo após uma boa noite de sono?",
    "Você tem dificuldade em se concentrar nas tarefas do dia a dia?",
    "Você sente que seu trabalho ou rotina perdeu o sentido ou a motivação?",
    "Você se sente irritado(a) ou impaciente com mais frequência do que o normal?",
    "Você sente que seu desempenho no trabalho ou estudos está piorando?",
    "Você evita atividades sociais ou interações com outras pessoas?",
    "Você tem a sensação de que está sobrecarregado(a) com responsabilidades?",
    "Você tem dores de cabeça frequentes ou problemas de saúde relacionados ao estresse?",
    "Você sente que não consegue lidar com problemas inesperados?",
    "Você se sente apático(a) em relação às coisas que antes gostava?",
    "Você tem pensamentos negativos frequentes sobre suas capacidades ou sobre o futuro?",
    "Você sente que não tem tempo suficiente para relaxar ou cuidar de si mesmo(a)?",
    "Você tem dificuldade para dormir ou permanece acordado(a) pensando nos problemas?",
    "Você se sente desconectado(a) dos outros, mesmo quando está com pessoas conhecidas?",
    "Você acha que está sempre preocupado(a) com tarefas futuras ou prazos?"
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
        resultTextContent = "Nível de burnout: Baixo. Você parece estar gerenciando bem o estresse.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else if (totalScore < 25) {
        resultTextContent = "Nível de burnout: Moderado. Alguns sinais de estresse estão presentes.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else {
        resultTextContent = "Nível de burnout: Alto. É importante considerar buscar apoio ou ajustar sua rotina. (Este teste não é um diagnóstico definitivo, procure um profissional)";
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
