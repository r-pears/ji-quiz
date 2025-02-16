import { quizLogic } from "./quizLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  const buttonContainer = document.querySelector(".button-container")
  let gameStart = false;
  let currentQuestionIndex = 0;
  let quizData = [];
  const quizManager = quizLogic();
  let score = [];
  let answerSelected = false;

  const fetchApiData = async () => {
    quizData = await quizManager.fetchQuiz();
  };

  const startQuizButton = async () => {
    
    const button = document.createElement("button");
    button.classList.add("start-button");
    button.textContent = "Start";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.toggle("button-container");
    quizContainer.insertAdjacentElement("afterend", buttonContainer);
    buttonContainer.appendChild(button);

    await fetchApiData();

    button.addEventListener("click", startQuiz);
  };

  const displayNextButton = (text) => {
    const nextButton = document.createElement("button");
    nextButton.classList.toggle("next-button");
    nextButton.textContent = text;

    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.appendChild(nextButton);

   

      nextButton.addEventListener("click", handleNextQuestion);
    
  };

  const handleCorrectAnswer = (data) => {
    const answerItems = document.querySelectorAll(".answer-choice");
    answerSelected = false;

    const handleClick = (item) => {
      if (answerSelected) return;

      const answerValue = item.textContent;
      console.log(answerValue)

      if (answerValue === data.correct_answer) {
        item.classList.toggle("correct");
      } else {
        item.classList.toggle("incorrect");
      }
      answerSelected = true;

      displayScoreCounter(data);
    };

    answerItems.forEach((item) => {
      item.addEventListener("click", () => handleClick(item));
    });
  };

  const createQuestionCounter = () => {
    const pageContainer = document.querySelector(".page-container");
    const counter = document.createElement("p");
    counter.classList.toggle("counter");
    pageContainer.appendChild(counter);
  };

  const displayQuestionCounter = (data) => {
    createQuestionCounter()
    const counter = document.querySelector(".counter");
    counter.textContent = `${currentQuestionIndex + 1} / ${data.length}`;
  };

  const createScoreCounter = () => {
    const pageContainer = document.querySelector(".page-container");
    const scoreCounter = document.createElement("p");
    scoreCounter.classList.add("score");
    pageContainer.appendChild(scoreCounter);
  };

  const displayScoreCounter = (data) => {
    if (!document.querySelector(".score")) {
      createScoreCounter();
    }

    const correctAnswer = document.querySelector(".correct");
    if (correctAnswer) {
      score.push(correctAnswer.textContent);
    }

    const counter = document.querySelector(".score");
    counter.textContent = `Score: ${score.length}`;
  };

  const displayQuiz = () => {
    gameStart = true;

    if (currentQuestionIndex >= quizData.length) {
      quizContainer.textContent = "Quiz ended!";
      const button = document.querySelector(".next-button")
      button.remove()
      score.length = 0
      startQuizButton()
      return;
    }

    quizManager.quizQuestion(quizData[currentQuestionIndex]);
    quizManager.answerChoices(quizData[currentQuestionIndex]);
    displayQuestionCounter(quizData);
    handleCorrectAnswer(quizData[currentQuestionIndex]);
    displayScoreCounter(quizData[currentQuestionIndex]);
  };

  const handleNextQuestion = () => {
    if (answerSelected) {
      currentQuestionIndex++;
    quizContainer.innerHTML = "";

    displayQuiz();
    }
  
  };

  const startQuiz = async () => {
    if (quizData.length === 0) {
      console.error("Failed to fetch data");
      return;
    }
    const button = document.querySelector(".start-button");
    button.remove();
    quizContainer.innerHTML = ""
    currentQuestionIndex = 0;
    displayNextButton("Next");
    displayQuiz(quizData);
  };

  return { startQuizButton, displayQuiz, fetchApiData };
};
