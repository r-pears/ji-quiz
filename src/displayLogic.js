import { fetchLogic } from "./fetchLogic";

export const displayLogic = () => {
  const quizContainer = document.getElementById("quiz-container");

  const displayQuiz = async () => {
    const apiUrl =
      "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";

    const fetchManager = fetchLogic();
    const data = await fetchManager.fetchData(apiUrl);
    const results = data.results;
    console.log(results);

    const firstQ = results[0];
    console.log("first question:", firstQ);
    const question = document.createElement("p");
    question.classList.toggle("question");
    question.textContent = firstQ.question;
    quizContainer.appendChild(question);
  };

  return { displayQuiz };
};
