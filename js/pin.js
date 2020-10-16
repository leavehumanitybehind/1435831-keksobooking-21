/* eslint-disable object-shorthand */
"use strict";

(function () {

  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const pinTemplate = document.querySelector(`#pin`).content;
  const mapPin = pinTemplate.querySelector(`.map__pin`);
  const pinsContainer = document.querySelector(`.map`).querySelector(`.map__pins`);
  let activePin = false;
  let pins = [];

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


  const createPin = function (ad) {
    const pinsTemplate = mapPin.cloneNode(true);
    const pinX = ad.location.x - (PinSize.WIDTH / 2);
    const pinY = ad.location.y - PinSize.HEIGHT;
    pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
    pinsTemplate.querySelector(`img`).src = ad.author.avatar;
    pinsTemplate.querySelector(`img`).alt = ad.offer.title;

    pinsTemplate.addEventListener(`click`, function (evt) {
      if (activePin !== evt.currentTarget) {
        window.card.renderCard(ad);
        activatePin(evt.currentTarget);
      }
    });
    return pinsTemplate;
  };


  const successHandler = function (ad) {
    const fragment = document.createDocumentFragment();
    ad.forEach(function (element) {
      let pin = createPin(element);
      fragment.appendChild(pin);
      pins.push(pin);
    });

    pinsContainer.appendChild(fragment);
  };

  const errorHandler = function (errorMessage) {
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

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const removePins = function () {
    pins.forEach(function (pin) {
      pinsContainer.removeChild(pin);
    });

    pins = [];
  };


  window.pin = {
    mapPin: mapPin,
    pinsContainer: pinsContainer,
    PinSize: PinSize,
    successHandler: successHandler,
    errorHandler: errorHandler,
    disablePin: disablePin,
    removePins: removePins
  };

})();
