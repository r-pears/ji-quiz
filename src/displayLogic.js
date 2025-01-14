import { quizLogic } from "./quizLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let gameStart = false;
  let currentQuestionIndex = 0;
  let quizData = [];
  const quizManager = quizLogic();
  let score = [];

  const fetchApiData = async () => {
    quizData = await quizManager.fetchQuiz();
    console.log("quiz data:", quizData);
  };

  const startQuizButton = async () => {
    quizContainer.innerHTML = ""
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
    console.log("answer choices:", answerItems);
    let answerSelected = false;

    const handleClick = (item) => {
      if (answerSelected) return;

      const answerValue = item.textContent;
      console.log("answer value:", answerValue);

      if (answerValue === data.correct_answer) {
        console.log("correct answer");
        item.classList.toggle("correct");
      } else {
        console.log("incorrect answer");
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
      console.log("correct answer", correctAnswer.textContent);
    }
    console.log("score:", score);
    const counter = document.querySelector(".score");

    counter.textContent = `Score: ${score.length}`;
  };

  const displayQuiz = () => {
    gameStart = true;
    console.log("game started:", gameStart);

    if (currentQuestionIndex >= quizData.length) {
      quizContainer.innerHTML = "";
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
    console.log("current question index:", currentQuestionIndex);
  };

  const handleNextQuestion = () => {
    currentQuestionIndex++;
    quizContainer.innerHTML = "";
    displayQuiz();
  };

  const startQuiz = async () => {
    if (quizData.length === 0) {
      console.error("Failed to fetch data");
      return;
    }
    const button = document.querySelector(".start-button");
    button.remove();
    currentQuestionIndex = 0;
    displayNextButton("Next");
    displayQuiz(quizData);
  };

  return { startQuizButton, displayQuiz, fetchApiData };
};
