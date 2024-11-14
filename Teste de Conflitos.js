document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        "Você evita confrontos, mesmo que esteja certo?",
        "Você sente ansiedade ao lidar com pessoas em situações de conflito?",
        "Você se esforça para entender o ponto de vista dos outros em uma discussão?",
        "Você acha difícil expressar sua opinião em desacordos?",
        "Você tenta encontrar um meio-termo ao lidar com conflitos?",
        "Você guarda ressentimentos após discussões?",
        "Você costuma ceder para evitar uma discussão?",
        "Você fica irritado(a) facilmente em situações de confronto?",
        "Você prefere resolver as coisas rapidamente em vez de prolongar uma discussão?",
        "Você considera as emoções das outras pessoas em um conflito?",
        "Você evita discutir problemas até que eles se tornem muito grandes?",
        "Você tenta ver o lado positivo dos outros mesmo em desacordos?",
        "Você se preocupa em resolver conflitos de maneira justa?",
        "Você se sente calmo(a) em situações de confronto?",
        "Você acredita que aprender a lidar com conflitos é importante para o crescimento pessoal?"
    ];

    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let answers = new Array(totalQuestions).fill(null);

    // Seletores de elementos HTML
    const questionContainer = document.getElementById("quiz-container");
    const questionText = document.getElementById("question-text");
    const currentQuestion = document.getElementById("current-question");
    const options = document.getElementsByName("answer");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result-text");

    function showQuestion(index) {
        questionText.textContent = questions[index];
        currentQuestion.textContent = `Pergunta ${index + 1} de ${totalQuestions}`;

        // Carregar a resposta previamente selecionada (se houver)
        options.forEach(option => {
            option.checked = false;
        });
        if (answers[index] !== null) {
            options[answers[index]].checked = true;
        }

        // Habilitar/desabilitar botão "Voltar" conforme necessário
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === totalQuestions - 1 ? "Finalizar" : "Confirmar";
    }

    function showResult() {
        const totalScore = answers.reduce((acc, answer) => acc + answer, 0);
        let resultTextContent = "";

        if (totalScore < 15) {
            resultTextContent = "Nível de habilidade interpessoal em conflitos: Baixo.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else if (totalScore < 25) {
            resultTextContent = "Nível de habilidade interpessoal em conflitos: Moderado.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else {
            resultTextContent = "Nível de habilidade interpessoal em conflitos: Elevado.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        }

        resultText.textContent = resultTextContent;
        resultContainer.style.display = "block";
        questionContainer.style.display = "none"; // Oculta o container de perguntas

        // Limpa o container de resultado antes de adicionar o botão para evitar duplicação
        resultContainer.innerHTML = `<p>${resultTextContent}</p>`;

        // Cria e exibe o botão para voltar à página inicial
        const homeBtn = document.createElement("button");
        homeBtn.textContent = "Voltar para a página inicial";
        homeBtn.addEventListener("click", () => {
            window.location.href = "Teste SPSI.html"; // Redireciona para a página inicial
        });
        resultContainer.appendChild(homeBtn);
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
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Previne o comportamento padrão do Enter em formulários
            nextBtn.click();
        }
    });

    showQuestion(currentQuestionIndex);
});
