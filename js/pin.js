/* eslint-disable object-shorthand */
"use strict";

const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);
const pinsContainer = document.querySelector(`.map__pins`);

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const disablePin = function () {
  const activePin = document.querySelector(`.map__pin--active`);
  if (!activePin) {
    return;
  }
  activePin.classList.remove();
};

const activatePin = function (evt) {
  if (mapPin !== evt.target) {
    mapPin.classList.add(`map__pin--active`);
  }
  disablePin();
};


const renderPin = function (ad) {
  const pinsTemplate = mapPin.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  return pinsTemplate;
};

const removePins = function () {
  disablePin();
  const allPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach(function (pin) {
    pinsContainer.removeChild(pin);
  });
};

window.pin = {
  size: PinSize,
  disable: disablePin,
  render: renderPin,
  activate: activatePin,
  remove: removePins

};

