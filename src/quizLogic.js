import { fetchLogic } from "./fetchLogic";

export const quizLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let answers = [];
  let currentQuestionIndex = 0;
  const incrementIndex = () => currentQuestionIndex++;
  const setIncrementIndex = () => currentQuestionIndex;

  const fetchQuiz = async () => {
    const apiUrl =
      "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";

    const fetchManager = fetchLogic();
    const data = await fetchManager.fetchData(apiUrl);
    const results = data.results;
    return results;
  };

  const shuffleArray = (array) => {
    console.log("Input array:", array); // Log input
    if (!Array.isArray(array)) {
      console.error("Input is not an array");
      return [];
    }
    const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  console.log("Shuffled array:", newArray); // Log output
  return newArray;
  };

  const answerChoices = (data) => {
    const currentQuestion = data[currentQuestionIndex];
    console.log(`question # ${currentQuestionIndex}:`, currentQuestion);

    const wrongAnswers = currentQuestion.incorrect_answers;
    console.log("wrong answer choices", wrongAnswers);

    const rightAnswer = currentQuestion.correct_answer;
    console.log("right answer", rightAnswer);

    answers = [...wrongAnswers, rightAnswer];
    console.log(answers);

    const shuffledAnswers = shuffleArray(answers);
    console.log(shuffledAnswers);

    incrementIndex();
    setIncrementIndex();
  };

  const quizQuestion = (data) => {
    const currentQuestion = data[currentQuestionIndex];

    const questionDiv = document.createElement("div");
    const firstChild = document.querySelector(".button-container");
    questionDiv.classList.toggle("question-container");
    const questionP = document.createElement("p");

    questionP.textContent = currentQuestion.question;
    quizContainer.insertBefore(questionDiv, firstChild);
    questionDiv.appendChild(questionP);
  };

  return { fetchQuiz, quizQuestion, answerChoices };
};
