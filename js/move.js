"use strict";
(function () {

  const mainPin = document.querySelector(`.map__pin--main`);

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (shift.x !== 0 || shift.y !== 0) {
        dragged = true;
      }
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
