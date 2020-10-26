"use strict";

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const MAIN_PIN_MIN_Y = 130;
const MAIN_PIN_MAX_Y = 630;
const MAIN_PIN_MIN_X = 0;

const MainPin = {
  WIDTH: 65,
  HEIGHT: 65,
  DEFAULT_X: `570px`,
  DEFAULT_Y: `375px`,
};

const getMainPinCoords = function () {
  let x = mainPin.offsetLeft + Math.floor(MainPin.WIDTH / 2);
  let y = mainPin.offsetTop + MainPin.HEIGHT;

  return {
    x,
    y
  };
};

const setAddress = function () {
  const mainPinCoords = getMainPinCoords();
  const address = document.querySelector(`#address`);
  address.value = mainPinCoords.x + `,` + mainPinCoords.y;
};

mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let mainPinCoords = getMainPinCoords();
    if (mainPinCoords.y - shift.y >= MAIN_PIN_MIN_Y && mainPinCoords.y - shift.y <= MAIN_PIN_MAX_Y) {
      mainPin.style.top = mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MAIN_PIN_MIN_X && mainPinCoords.x - shift.x <= map.offsetWidth) {
      mainPin.style.left = mainPin.offsetLeft - shift.x + `px`;
    }
    setAddress(mainPinCoords);
  };


  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.move = {
  getMainPinCoords: getMainPinCoords,
  setAddress: setAddress,
  MainPin: MainPin
};

