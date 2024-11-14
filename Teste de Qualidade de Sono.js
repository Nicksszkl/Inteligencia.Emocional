const questions = [
    "Você tem dificuldade em adormecer mesmo quando está cansado(a)?",
    "Você acorda frequentemente durante a noite e tem dificuldade para voltar a dormir?",
    "Você sente que não dorme o suficiente, mesmo após várias horas de sono?",
    "Você acorda mais cedo do que gostaria e não consegue voltar a dormir?",
    "Você se sente cansado(a) e sem energia ao acordar?",
    "Você precisa de mais de 30 minutos para adormecer regularmente?",
    "Você se sente sonolento(a) ou tem dificuldade em se concentrar durante o dia?",
    "Você tira cochilos durante o dia porque se sente cansado(a)?",
    "Você sente que seu humor é afetado pela falta de sono?",
    "Você consome cafeína ou outros estimulantes para compensar o cansaço durante o dia?",
    "Você tem pesadelos frequentes ou sonhos que interrompem o sono?",
    "Você acorda com dores musculares ou com sensação de rigidez?",
    "Você se sente ansioso(a) antes de dormir pensando nas tarefas do dia seguinte?",
    "Você tem um horário de sono irregular e dificuldade em manter uma rotina de sono consistente?",
    "Você acha que a qualidade do seu sono piorou nos últimos meses?"
];

const totalQuestions = questions.length;
let currentQuestionIndex = 0;
let answers = new Array(totalQuestions).fill(null);

// Seletores de elementos HTML
const questionText = document.getElementById("question-text");
const currentQuestion = document.getElementById("current-question");
const options = document.getElementsByName("answer");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

// Cria o botão de voltar para a página inicial
const homeBtn = document.createElement("button");
homeBtn.textContent = "Voltar para a página inicial";
homeBtn.id = "home-btn";
homeBtn.style.display = "none"; // Oculte inicialmente
homeBtn.addEventListener("click", () => {
    window.location.href = "Teste SPSI.html"; // Redireciona para a página inicial
});
resultContainer.appendChild(homeBtn);

function showQuestion(index) {
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
        resultTextContent = "Qualidade de sono: Boa. Você parece ter hábitos de sono saudáveis.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else if (totalScore < 25) {
        resultTextContent = "Qualidade de sono: Moderada. Existem alguns fatores que podem estar afetando seu sono.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else {
        resultTextContent = "Qualidade de sono: Ruim. É importante avaliar seus hábitos de sono e considerar mudanças para melhorar sua saúde.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    }

    resultText.textContent = resultTextContent;
    resultContainer.style.display = "block";
    document.getElementById("question-container").style.display = "none";

    // Exibe o botão para voltar à página inicial
    homeBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
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
});

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
        document.getElementById('next-btn').click();
    }
});

showQuestion(currentQuestionIndex);
