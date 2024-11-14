const questions = [
    "Você come em excesso quando está estressado(a) ou ansioso(a)?",
    "Você se sente culpado(a) ou envergonhado(a) após comer?",
    "Você tenta compensar o que comeu com exercícios excessivos ou restrição alimentar?",
    "Você se preocupa excessivamente com seu peso ou forma corporal?",
    "Você evita comer na frente dos outros por vergonha ou ansiedade?",
    "Você já usou laxantes, diuréticos ou jejum para perder peso?",
    "Você sente que não consegue controlar o quanto come em algumas situações?",
    "Você faz dietas ou restrições alimentares frequentes?",
    "Você sente que a comida controla sua vida de alguma forma?",
    "Você já teve um episódio em que comeu muito mais do que pretendia?",
    "Você come mesmo quando não está com fome?",
    "Você sente que seus hábitos alimentares afetam seu humor?",
    "Você tem medo de ganhar peso ou engordar?",
    "Você se sente ansioso(a) ou deprimido(a) devido à alimentação?",
    "Você já se machucou ou teve problemas de saúde relacionados à sua alimentação?"
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
        resultTextContent = "Preocupação alimentar: Baixa. Seus hábitos alimentares parecem saudáveis.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else if (totalScore < 25) {
        resultTextContent = "Preocupação alimentar: Moderada. Pode haver algumas preocupações com a alimentação que merecem atenção.(Este teste não é um diagnóstico definitivo, procure um profissional)";
    } else {
        resultTextContent = "Preocupação alimentar: Alta. Seria interessante procurar orientação profissional para entender melhor seus hábitos alimentares.(Este teste não é um diagnóstico definitivo, procure um profissional)";
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
