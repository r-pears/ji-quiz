import { fetchLogic } from "./fetchLogic"
import { displayLogic } from "./displayLogic";

document.addEventListener("DOMContentLoaded", () => {

  const displayManager = displayLogic()
  displayManager.startQuizButton()


})