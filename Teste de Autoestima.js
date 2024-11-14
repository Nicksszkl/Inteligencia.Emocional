document.addEventListener("DOMContentLoaded", () => {
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
        let resultMsg;

        if (totalScore < 15) {
            resultMsg = "Nível de autoestima baixo. Considere trabalhar mais na valorização de si mesmo.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else if (totalScore < 30) {
            resultMsg = "Nível de autoestima moderado. Com pequenas mudanças, você pode melhorar sua autoestima.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else {
            resultMsg = "Nível de autoestima elevado. Continue cultivando essa confiança!(Este teste não é um diagnóstico definitivo, procure um profissional)";
        }

        // Esconde o container de perguntas e exibe o resultado
        questionContainer.style.display = "none";
        resultText.textContent = resultMsg;
        resultContainer.style.display = "block";

        // Cria e exibe o botão para voltar à página inicial
        const homeBtn = document.createElement("button");
        homeBtn.textContent = "Voltar para a página inicial";
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
            alert("Por favor, selecione uma opção antes de continuar.");
        }
    });

    // Manipula o clique no botão "Voltar"
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

    // Exibe a primeira pergunta ao carregar a página
    showQuestion(currentQuestionIndex);
});
