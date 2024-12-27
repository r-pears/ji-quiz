import { fetchLogic } from "./fetchLogic"
import { displayLogic } from "./displayLogic";

document.addEventListener("DOMContentLoaded", () => {
  // const apiUrl =
  // "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple";
  
  
  // const fetchManager = fetchLogic()
  // fetchManager.fetchData(apiUrl)

  const displayManager = displayLogic()
  displayManager.displayQuiz()

})