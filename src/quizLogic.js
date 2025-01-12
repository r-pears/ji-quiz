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
    console.log(results);
    return results;
  };

  const answerChoices = (data) => {
    const currentQuestion = data[currentQuestionIndex];
    console.log(`question # ${currentQuestionIndex}:`, currentQuestion);

    const question = document.createElement("p");
    question.classList.toggle("question");
    question.textContent = currentQuestion.question;
    quizContainer.before(question);

    const wrongAnswers = currentQuestion.incorrect_answers;
    console.log("wrong answer choices", wrongAnswers);

    const rightAnswer = currentQuestion.correct_answer;
    console.log("right answer", rightAnswer);

    answers = [...wrongAnswers, rightAnswer];
    console.log("answer array:", answers);

    incrementIndex();
    setIncrementIndex();
  };

  return { fetchQuiz, answerChoices };
};
