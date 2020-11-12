"use strict";

const KeyCode = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const isEnterKeyPress = (key) => {
  return key === KeyCode.ENTER;
};

const isEscKeyPress = (key) => {
  return key === KeyCode.ESCAPE;
};

const createErrorMessage = (message) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin:auto; text-align: center; background-color: rgba(0,0,0, 0.4);`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.width = `100%`;
  node.style.height = `100%`;
  node.style.paddingTop = `300px`;
  node.style.fontSize = `60px`;
  node.style.fontWeight = `bold`;
  node.style.color = `white`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.util = {
  isEnterKeyPress,
  isEscKeyPress,
  createErrorMessage
};

