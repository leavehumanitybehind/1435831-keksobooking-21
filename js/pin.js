/* eslint-disable object-shorthand */
"use strict";

let activePin = false;

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const activatePin = function (pin) {
  if (activePin) {
    disablePin();
  }
  activePin = pin;
  activePin.classList.add(`map__pin--active`);
};

const disablePin = function () {
  activePin.classList.remove(`map__pin--active`);
};

const renderPins = function (ad) {
  const pinsTemplate = window.consts.mapPin.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = ad.author.avatar;
  pinsTemplate.querySelector(`img`).alt = ad.offer.title;
  const pinX = ad.location.x - (PinSize.WIDTH / 2);
  const pinY = ad.location.y - PinSize.HEIGHT;
  pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
  return pinsTemplate;
};

const onPinClick = function (pin, ad) {
  pin.addEventListener(`click`, function (evt) {
    if (activePin !== evt.currentTarget) {
      window.consts.pinsContainer.appendChild(window.card.renderCard(ad));
      activatePin(evt.currentTarget);
    }
  });
};


window.pin = {
  PinSize: PinSize,
  disablePin: disablePin,
  renderPins: renderPins,
  onPinClick: onPinClick

};

