/* eslint-disable object-shorthand */
"use strict";

const pinTemplate = document.querySelector(`#pin`).content;
const mapPin = pinTemplate.querySelector(`.map__pin`);


const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

let activePin = false;

const disablePin = function () {
  const allPins = document.querySelectorAll(`.map__pin`);
  allPins.forEach(function (pin) {
    pin.classList.remove(`map__pin--active`);
  });
};

const activatePin = function (pin) {
  if (activePin) {
    disablePin();
  }
  activePin = pin;
  activePin.classList.add(`map__pin--active`);
};


const renderPins = function (ad) {
  const pinsTemplate = mapPin.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  return pinsTemplate;
};


window.pin = {
  size: PinSize,
  disable: disablePin,
  render: renderPins,
  activate: activatePin

};

