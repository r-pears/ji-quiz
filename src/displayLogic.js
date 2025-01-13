import { fetchLogic } from "./fetchLogic";
import { quizLogic } from "./quizLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let gameStart = false;
  let currentQuestionIndex = 0;
  let quizData = [];
  const quizManager = quizLogic();

  const fetchApiData = async () => {
    quizData = await quizManager.fetchQuiz();
    console.log("quiz data:", quizData);
  };

  const startQuizButton = async () => {
    const button = document.createElement("button");
    button.classList.toggle("start-button");
    button.textContent = "Start";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.toggle("button-container");
    quizContainer.insertAdjacentElement('afterend', buttonContainer);
    buttonContainer.appendChild(button);

    await fetchApiData();
    button.addEventListener("click", startQuiz);
  };

  const displayNextButton = () => {
    const nextButton = document.createElement("button");
    nextButton.classList.toggle("next-button");
    nextButton.textContent = "Next";

    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.appendChild(nextButton);

    nextButton.addEventListener("click", handleNextQuestion)
  };

  const displayQuiz = () => {
    gameStart = true;
    console.log("game started:", gameStart);
    
    if (currentQuestionIndex >= quizData.length ) {
      quizContainer.innerHTML = ""
      quizContainer.textContent = "Quiz ended!"
      return
    }

    quizManager.quizQuestion(quizData[currentQuestionIndex]);
    quizManager.answerChoices(quizData[currentQuestionIndex]);

    console.log("current question index:", currentQuestionIndex);
  };

  const handleNextQuestion = () => {
    currentQuestionIndex++;
    quizContainer.innerHTML = "";
      displayQuiz();
  }
  const startQuiz = async () => {
    if (quizData.length === 0) {
      console.error("Failed to fetch data");
      return;
    }
    const button = document.querySelector(".start-button");
    button.remove();
    currentQuestionIndex = 0
    displayNextButton();
    displayQuiz(quizData);
  };


  return { startQuizButton, displayQuiz, fetchApiData };
};
