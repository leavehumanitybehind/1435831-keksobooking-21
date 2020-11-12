"use strict";

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsContainer = document.querySelector(`.map__pins`);
let ads = [];
const MAX_PINS = 5;

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const renderPin = (ad) => {
  const {
    offer: {
      title
    },
    author: {
      avatar
    },
    location: {
      x,
      y
    }
  } = ad;
  const pinsTemplate = pinTemplate.cloneNode(true);
  pinsTemplate.querySelector(`img`).src = avatar;
  pinsTemplate.querySelector(`img`).alt = title;
  const pinX = x - (PinSize.WIDTH / 2);
  const pinY = y - PinSize.HEIGHT;
  pinsTemplate.style.left = pinX + `px`;
  pinsTemplate.style.top = pinY + `px`;
  return pinsTemplate;
};

const removePins = () => {
  const allPins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  allPins.forEach((pin) => {
    pinsContainer.removeChild(pin);
  });
};

const activatePin = (pin, ad) => {
  pin.addEventListener(`click`, () => {
    const activePin = pinsContainer.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
      window.card.disable();
    }
    pin.classList.add(`map__pin--active`);
    pinsContainer.appendChild(window.card.render(ad));
  });
};

const renderPinElements = (offers) => {
  const fragment = document.createDocumentFragment();
  ads = offers;
  const adsNumber = ads.length > MAX_PINS ? MAX_PINS : ads.length;
  for (let i = 0; i < adsNumber; i++) {
    const pinElement = renderPin(ads[i]);
    fragment.append(pinElement);
    activatePin(pinElement, ads[i]);
  }

  pinsContainer.appendChild(fragment);
};

window.pin = {
  Size: PinSize,
  render: renderPin,
  remove: removePins,
  activate: activatePin,
  renderPinElements,
  ads,
};

