document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        "Você se sente nervoso, ansioso ou tenso frequentemente?",
        "Você acha difícil controlar suas preocupações?",
        "Você tem dificuldade em relaxar?",
        "Você sente que algo terrível pode acontecer a qualquer momento?",
        "Você se irrita com facilidade?",
        "Você tem dificuldade em se concentrar por causa da ansiedade?",
        "Você tem a sensação de que seu coração está acelerado?",
        "Você sente falta de ar ou dificuldade em respirar?",
        "Você sente náuseas ou dores de estômago relacionadas à ansiedade?",
        "Você sente tonturas ou fraqueza frequentemente?",
        "Você tem dificuldade para dormir por causa de preocupações?",
        "Você evita situações que te causam ansiedade?"
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
            resultText = "Nível de ansiedade baixo.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else if (totalScore < 25) {
            resultText = "Nível de ansiedade moderado.(Este teste não é um diagnóstico definitivo, procure um profissional)";
        } else {
            resultText = "Nível de ansiedade elevado.(Este teste não é um diagnóstico definitivo, procure um profissional)";
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
