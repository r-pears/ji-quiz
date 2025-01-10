import { fetchLogic } from "./fetchLogic";

export const quizLogic = () => {
  const quizContainer = document.getElementById("quiz-container");
  let answers = [];
  let currentQuestionIndex = 0;

  const incrementIndex = () => currentQuestionIndex++;

  const setIncrementIndex = () => currentQuestionIndex;

  const answerChoices = (data) => {
    const currentQuestion = data[currentQuestionIndex];
      console.log("first question:", currentQuestion);

      const question = document.createElement("p");
      question.classList.toggle("question");
      question.textContent = currentQuestion.question;
      quizContainer.before(question);

      const wrongAnswers = currentQuestion.incorrect_answers
      console.log("wrong answer choices", wrongAnswers)
      
      const rightAnswer = currentQuestion.correct_answer
      console.log("right answer", rightAnswer)
      
      answers = [...wrongAnswers, rightAnswer]
      console.log("answer array:", answers)


      incrementIndex();
      setIncrementIndex();
  };

  return { answerChoices };
};
