import { displayLogic } from "./displayLogic";
import "./style.css"

document.addEventListener("DOMContentLoaded", () => {
  const displayManager = displayLogic();
  displayManager.startQuizButton();
});
