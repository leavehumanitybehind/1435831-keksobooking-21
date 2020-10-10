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

  const createPin = function (ad) {
    const pinsTemplate = mapPin.cloneNode(true);
    const pinX = ad.location.x - (PinSize.WIDTH / 2);
    const pinY = ad.location.y - PinSize.HEIGHT;
    pinsTemplate.style = `left:` + pinX + `px; top:` + pinY + `px;`;
    pinsTemplate.querySelector(`img`).src = ad.author.avatar;
    pinsTemplate.querySelector(`img`).alt = ad.offer.title;

    return pinsTemplate;
  };

  const successHandler = function (ad) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < window.data.ADS_NUMBER; i++) {
      fragment.appendChild(createPin(ad[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin:auto; text-align: center; background-color: rgba(0,0,0, 0.4);`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.width = '100%';
    node.style.height = '100%';
    node.style.fontSize = `60px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  mapPin.addEventListener('click', function () {
    mapPin.classList.add('map__pin--active');
    window.card.renderCards(window.data.ads);
  });


  window.pin = {
    PinSize: PinSize,
    successHandler: successHandler,
    errorHandler: errorHandler
  };

})();
