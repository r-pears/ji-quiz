import { fetchLogic } from "./fetchLogic";
import { quizLogic } from "./quizLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let gameStart = false;
  let currentQuestionIndex = 0;
  let quizData = [];
  const quizManager = quizLogic();

  const incrementIndex = () => currentQuestionIndex++;
  const setIncrementIndex = () => currentQuestionIndex;

  const displayButton = () => {
    const button = document.createElement("button");
    button.classList.toggle("game-button");
    button.textContent = "Start";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.toggle("button-container");
    quizContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(button);
  };

  const startQuiz = async () => {
    displayButton();
    gameStart = true;
    quizData = await quizManager.fetchQuiz();
    console.log("quiz data:", quizData);
    displayQuiz(quizData);
  };

  const displayQuiz = (data) => {
    quizContainer.addEventListener("click", () => {
      console.log("game started:", gameStart);

      quizManager.quizQuestion(data)
      quizManager.answerChoices(data);

      const nextButton = document.querySelector(".game-button");
      nextButton.textContent = "Next";

      console.log("current question index:", currentQuestionIndex);
    });
  };

  return { startQuiz, displayQuiz };
};
