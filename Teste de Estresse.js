document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        "Você se sente sobrecarregado ou pressionado no seu dia a dia?",
        "Você sente que tem muitas responsabilidades para lidar?",
        "Você sente que seu trabalho ou estudos causam muito estresse?",
        "Você tem dificuldade em relaxar, mesmo quando está fora de suas atividades?",
        "Você se preocupa frequentemente com o futuro?",
        "Você tem pouco tempo para atividades de lazer ou descanso?",
        "Você sente que seu nível de energia está baixo?",
        "Você sente dores de cabeça ou tensão muscular com frequência?",
        "Você tem dificuldade para dormir devido a preocupações?",
        "Você sente irritabilidade ou impaciência mais do que o normal?",
        "Você sente que não consegue controlar seu nível de estresse?",
        "Você evita interações sociais por estar estressado?",
        "Você sente que pequenos problemas parecem maiores do que realmente são?",
        "Você sente falta de motivação ou produtividade?",
        "Você recorre a hábitos prejudiciais (como fumar ou beber) para aliviar o estresse?"
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

    // Exibe a pergunta atual
    function showQuestion(index) {
        questionText.innerText = questions[index];
        currentQuestion.innerText = `Pergunta ${index + 1} de ${totalQuestions}`;

        // Limpa a seleção anterior e carrega a resposta selecionada, se houver
        options.forEach(option => {
            option.checked = false;
        });
        if (answers[index] !== null) {
            options[answers[index]].checked = true;
        }

        // Ajusta o botão "Voltar" e "Confirmar/Finalizar"
        prevBtn.disabled = index === 0;
        nextBtn.innerText = index === totalQuestions - 1 ? "Finalizar" : "Confirmar";
    }

    // Mostra o resultado final baseado nas respostas
    function showResult() {
        const totalScore = answers.reduce((acc, answer) => acc + answer, 0);
        let resultTextMsg;

        if (totalScore < 20) {
            resultTextMsg = "Nível de estresse baixo. Continue gerenciando bem suas responsabilidades e cuidando de seu bem-estar!(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else if (totalScore < 35) {
            resultTextMsg = "Nível de estresse moderado. Considere adotar práticas de relaxamento e tempo para si mesmo.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else {
            resultTextMsg = "Nível de estresse elevado. Tente buscar maneiras de reduzir o estresse e, se necessário, converse com um profissional.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        }

        // Esconde o container de perguntas e exibe o resultado
        questionContainer.style.display = "none";
        resultText.innerText = resultTextMsg;
        resultContainer.style.display = "block";

        // Cria e exibe o botão para voltar à página inicial
        const homeBtn = document.createElement("button");
        homeBtn.innerText = "Voltar para a página inicial";
        homeBtn.addEventListener("click", () => {
            window.location.href = "Teste SPSI.html"; // Redireciona para a página inicial
        });
        resultContainer.appendChild(homeBtn);
    }

    // Manipula o clique no botão "Confirmar/Finalizar"
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
            alert("Por favor, selecione uma opção.");
        }
    });

    // Manipula o clique no botão "Voltar"
    prevBtn.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    // Adiciona um evento para capturar a tecla Enter e clicar no botão "Confirmar"
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Previne o comportamento padrão do Enter em formulários
            nextBtn.click();
        }
    });

    // Exibe a primeira pergunta ao carregar a página
    showQuestion(currentQuestionIndex);
});
