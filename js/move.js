"use strict";

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const address = document.querySelector(`#address`);

const MainPinDefaultCoords = {
  X: 570,
  Y: 375
};

const MainPinLocation = {
  MIN_Y: 130,
  MAX_Y: 630,
  MIN_X: 0
};

const MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  POINT_HEIGHT: 22
};

const setDefaultPosition = () => {
  mainPin.style.left = MainPinDefaultCoords.X + `px`;
  mainPin.style.top = MainPinDefaultCoords.Y + `px`;
};

const getDefaultMainPinCoords = () => {
  const x = MainPinDefaultCoords.X + Math.floor(MainPinSize.WIDTH / 2);
  const y = MainPinDefaultCoords.Y + MainPinSize.HEIGHT;
  address.value = x + `,` + y;
};

const getMainPinCoords = () => {
  const x = mainPin.offsetLeft + Math.floor(MainPinSize.WIDTH / 2);
  const y = mainPin.offsetTop + (MainPinSize.HEIGHT + MainPinSize.POINT_HEIGHT);

  return {
    x,
    y
  };
};

const setAddress = () => {
  const mainPinCoords = getMainPinCoords();
  address.value = mainPinCoords.x + `,` + mainPinCoords.y;
};

mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const mainPinCoords = getMainPinCoords();
    if (mainPinCoords.y - shift.y >= MainPinLocation.MIN_Y && mainPinCoords.y - shift.y <= MainPinLocation.MAX_Y) {
      mainPin.style.top = mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MainPinLocation.MIN_X && mainPinCoords.x - shift.x <= map.offsetWidth) {
      mainPin.style.left = mainPin.offsetLeft - shift.x + `px`;
    }
    setAddress(mainPinCoords);
  };


  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.move = {
  getCoords: getMainPinCoords,
  getDefaultCoords: getDefaultMainPinCoords,
  setDefaultPosition,
  address: setAddress
};

