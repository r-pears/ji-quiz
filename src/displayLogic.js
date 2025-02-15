import { quizLogic } from "./quizLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  // delete unused variable
  let gameStart = false;
  let currentQuestionIndex = 0;
  let quizData = [];
  const quizManager = quizLogic();
  let score = [];

  const fetchApiData = async () => {
    quizData = await quizManager.fetchQuiz();
  };

  // create a separate function for creating buttons
  const createButton = (className, textContent, onClick) => {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = textContent;
    button.addEventListener("click", onClick);
    return button;
  };

  const startQuizButton = async () => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    quizContainer.insertAdjacentElement("afterend", buttonContainer);
    // function call to create start button with a separate function
    const startButton = createButton("start-button", "Start", startQuiz);
    buttonContainer.appendChild(startButton);

    await fetchApiData();
  };

  const displayNextButton = (text) => {
    const buttonContainer = document.querySelector(".button-container");
    // function call to create next button with a separate function
    const nextButton = createButton("next-button", text, handleNextQuestion);
    buttonContainer.appendChild(nextButton);
  };

  const handleCorrectAnswer = (data) => {
    const answerItems = document.querySelectorAll(".answer-choice");
    let answerSelected = false;

    answerItems.forEach((item) => {
      // refactor for better readability
      item.addEventListener("click", () => {
        if (answerSelected) return;

        item.classList.toggle(
          // refactor to ternary operator for better readability
          item.textContent === data.correct_answer ? "correct" : "incorrect"
        );
        answerSelected = true;

        displayScoreCounter(data);
      });
    });
  };

  // create a function for reusable code
  const createCounter = (className) => {
    const pageContainer = document.querySelector(".page-container");
    const counter = document.createElement("p");
    // refactor to use classList.add for better readability
    counter.classList.add(className);
    pageContainer.appendChild(counter);
  };

  const displayQuestionCounter = (data) => {
    // refactor to check if counter exists before creating it
    if (!document.querySelector(".counter")) {
      createCounter("counter");
    }
    const counter = document.querySelector(".counter");
    counter.textContent = `${currentQuestionIndex + 1} / ${data.length}`;
  };

  // delete unused function in refactored code

  const displayScoreCounter = (data) => {
    if (!document.querySelector(".score")) {
      // use the new createCounter function
      createCounter("score");
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
      // one line to remove next button
      document.querySelector(".next-button").remove();
      score.length = 0;
      startQuizButton();
      return;
    }

    quizManager.quizQuestion(quizData[currentQuestionIndex]);
    quizManager.answerChoices(quizData[currentQuestionIndex]);
    displayQuestionCounter(quizData);
    handleCorrectAnswer(quizData[currentQuestionIndex]);
    displayScoreCounter(quizData[currentQuestionIndex]);
  };

  const handleNextQuestion = () => {
    currentQuestionIndex++;
    // textContent is better than innerHTML for security reasons
    quizContainer.textContent = "";

    displayQuiz();
  };

  const startQuiz = async () => {
    if (quizData.length === 0) {
      console.error("Failed to fetch data");
      return;
    }
    // one line to remove start button
    document.querySelector(".start-button").remove();
    // textContent is better than innerHTML for security reasons
    quizContainer.textContent = "";
    currentQuestionIndex = 0;
    displayNextButton("Next");
    displayQuiz(quizData);
  };

  return { startQuizButton, displayQuiz, fetchApiData };
};
