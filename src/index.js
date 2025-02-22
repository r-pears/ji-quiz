import { displayLogic } from "./displayLogic";
import "./style.css";

// random comment for git

document.addEventListener("DOMContentLoaded", () => {
  const displayManager = displayLogic();
  displayManager.startQuizButton();
});
