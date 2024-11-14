document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        "Você sente-se triste ou vazio frequentemente?",
        "Você perdeu o interesse em atividades que antes gostava?",
        "Você tem dificuldade para dormir ou dorme em excesso?",
        "Você sente-se cansado ou sem energia quase todos os dias?",
        "Você sente-se inútil ou com baixa autoestima?",
        "Você tem dificuldade para se concentrar em tarefas diárias?",
        "Você pensa frequentemente em morte ou suicídio?",
        "Você sente-se inquieto ou com lentidão física?",
        "Você experimenta sentimentos de culpa excessivos?",
        "Você tem alterações significativas no apetite ou no peso?",
        "Você evita contato com amigos e familiares?",
        "Você sente dificuldade em tomar decisões simples?"
    ];

    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let answers = new Array(totalQuestions).fill(null);

    function showQuestion(index) {
        document.getElementById('question-text').innerText = questions[index];
        document.getElementById('current-question').innerText = index + 1;
        const radios = document.querySelectorAll('input[name="answer"]');
        radios.forEach(radio => {
            radio.checked = false;
        });

        if (answers[index] !== null) {
            radios[answers[index]].checked = true;
        }

        document.getElementById('prev-btn').disabled = index === 0;
        document.getElementById('next-btn').innerText = index === totalQuestions - 1 ? "Finalizar" : "Confirmar";
    }

    function showResult() {
        const totalScore = answers.reduce((acc, answer) => acc + answer, 0);
        let resultText = "";

        if (totalScore < 15) {
            resultText = "Nível de depressão baixo.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else if (totalScore < 25) {
            resultText = "Nível de depressão moderado.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else {
            resultText = "Nível de depressão elevado.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        }

        document.getElementById('result-text').innerText = resultText;
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';

        // Adiciona o botão "Voltar para a página inicial"
        const homeBtn = document.createElement('button');
        homeBtn.textContent = "Voltar para a página inicial";
        homeBtn.id = "home-btn";
        homeBtn.addEventListener('click', () => {
            window.location.href = "Teste SPSI.html"; // Redireciona para a página inicial
        });
        document.getElementById('result-container').appendChild(homeBtn);
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
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

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('next-btn').click();
        }
    });

    showQuestion(currentQuestionIndex);
});
