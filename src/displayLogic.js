import { fetchLogic } from "./fetchLogic";
import { quizLogic } from "./quizLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let gameStart = false;
  // let currentQuestionIndex = 0;

  const displayButton = () => {
    const button = document.createElement("button");
    button.classList.toggle("game-button");
    button.textContent = "Start";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.toggle("button-container");
    quizContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(button);
  };

  // const incrementIndex = () => currentQuestionIndex++;

  // const setIncrementIndex = () => currentQuestionIndex;


  const displayQuiz = async () => {
    displayButton();
    gameStart = true;

    const apiUrl =
      "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";

    const fetchManager = fetchLogic();
    const data = await fetchManager.fetchData(apiUrl);
    const results = data.results;
    console.log(results);

    quizContainer.addEventListener("click", () => {
      console.log("game started:", gameStart);

      const quizManager = quizLogic()
      quizManager.answerChoices(results)

      const nextButton = document.querySelector(".game-button");
      nextButton.textContent = "Next"

      

      // incrementIndex();
      // setIncrementIndex();
      // console.log("current question index:", currentQuestionIndex);


    });
  };

  return { displayQuiz };
};
