import { success, error, info } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";

const keys = ['a', 's', 'Escape', '8', 'g', 'h', '1', '2', 'Shift', 'Tab', '4'];

let currentKeyIndex = 0;
const keyDisplay = document.getElementById("key");
const newGameBtn = document.getElementById("start-new-game");

function updateKeyDisplay() {
  if (currentKeyIndex >= keys.length) {
    keyDisplay.textContent = "Гру завершено 🎉";
    success({ text: "Ви пройшли всі етапи!", delay: 5000 });
  } else {
    keyDisplay.textContent = keys[currentKeyIndex];
    success({ text: "Правильно!", delay: 3000 });
  }
}

function handleWrongKey(expected, pressed) {
    error({
        text: `Помилка. Треба: "${expected}", ви натиснули: "${pressed}"`,
        delay: 5000
    });
}


keyDisplay.textContent = keys[currentKeyIndex];

document.addEventListener("keydown", (event) => {
  const pressedKey = event.key;

  if (pressedKey === "Tab") {
    event.preventDefault();
  }

  const expectedKey = keys[currentKeyIndex];

  if (pressedKey === expectedKey) {
    currentKeyIndex++;
    updateKeyDisplay();
  } else {
    handleWrongKey(expectedKey, pressedKey);
  }
});

document.addEventListener("keypress", (event) => event.preventDefault());

newGameBtn.addEventListener("click", () => {
    currentKeyIndex = 0;
    keyDisplay.textContent = keys[currentKeyIndex];
    info({
      text: "Гру розпочато знову! Вперед 😉",
      delay: 4000
    });
  });