import { fetchLogic } from "./fetchLogic";

export const quizLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let answers = [];

  const fetchQuiz = async () => {
    const apiUrl =
      "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";

    const fetchManager = fetchLogic();
    const data = await fetchManager.fetchData(apiUrl);
    const results = data.results;

    return results;
  };

  const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
      console.error("Input is not an array");
      return [];
    }
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const displayAnswerChoices = (array) => {
    // could use a fragment to minizmie repaints and reflows
    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");

    array.forEach((choice) => {
      const listItem = document.createElement("li");
      listItem.classList.add("answer-choice");
      listItem.textContent = choice;
      ul.appendChild(listItem);
    });

    fragment.appendChild(ul);
    quizContainer.appendChild(fragment);
  };

  const answerChoices = (data) => {
    const wrongAnswers = data.incorrect_answers;
    const rightAnswer = data.correct_answer;

    answers = [...wrongAnswers, rightAnswer];
    const shuffledAnswers = shuffleArray(answers);

    displayAnswerChoices(shuffledAnswers);
  };

  const quizQuestion = (data) => {
    const questionP = document.createElement("p");
    questionP.classList.toggle("question-p");
    questionP.textContent = data.question;
    quizContainer.appendChild(questionP);
  };

  return { fetchQuiz, quizQuestion, answerChoices };
};
