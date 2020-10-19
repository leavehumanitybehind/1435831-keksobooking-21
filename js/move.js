"use strict";

const MainPin = {
  WIDTH: 65,
  HEIGHT: 84,
  DEFAULT_X: `570px`,
  DEFAULT_Y: `375px`,
  y: {
    MIN: 130,
    MAX: 630
  },
  x: {
    MIN: 0
  }
};

const getMainPinCoords = function () {
  let x = window.consts.mainPin.offsetLeft + Math.floor(MainPin.WIDTH / 2);
  let y = window.consts.mainPin.offsetTop + MainPin.HEIGHT;

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

window.consts.mainPin.addEventListener(`mousedown`, function (evt) {
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
    if (mainPinCoords.y - shift.y >= MainPin.y.MIN && mainPinCoords.y - shift.y <= MainPin.y.MAX) {
      window.consts.mainPin.style.top = window.consts.mainPin.offsetTop - shift.y + `px`;
    }

    if (mainPinCoords.x - shift.x >= MainPin.x.MIN && mainPinCoords.x - shift.x <= window.consts.map.offsetWidth) {
      window.consts.mainPin.style.left = window.consts.mainPin.offsetLeft - shift.x + `px`;
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

