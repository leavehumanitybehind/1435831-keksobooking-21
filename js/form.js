/* eslint-disable object-shorthand */
"use strict";
(function () {

  const adForm = document.querySelector(`.ad-form`);
  const mapFiltersForm = document.querySelector(`.map__filters`);

  const mapFiltersSelects = mapFiltersForm.querySelectorAll(`select`);
  const adFormSelects = adForm.querySelectorAll(`select`);
  const fieldsets = adForm.querySelectorAll(`.fieldset`);
  const inputs = adForm.querySelectorAll(`input`);


  const disableFormControls = function (controls) {
    for (let i = 0; i < controls.length; i++) {
      controls[i].setAttribute(`disabled`, `disabled`);
    }
    mapFiltersForm.setAttribute(`disabled`, `disabled`);
  };


  const enableControls = function (controls) {
    for (let i = 0; i < controls.length; i++) {
      controls[i].removeAttribute(`disabled`, `disabled`);
    }
    mapFiltersForm.removeAttribute(`disabled`, `disabled`);
  };

  const setAddress = function (pin) {
    const address = adForm.querySelector(`#address`);
    address.value = pin.offsetTop + window.pin.PinSize.HEIGHT + `,` + (pin.offsetLeft + window.pin.PinSize.WIDTH / 2);
  };

  const activateMap = function () {
    window.map.map.classList.remove(`map--faded`);
    mapFiltersForm.classList.remove(`map__filters--disabled`);
    adForm.classList.remove(`ad-form--disabled`);
    enableControls(fieldsets);
    enableControls(inputs);
    enableControls(adFormSelects);
    enableControls(mapFiltersSelects);
    window.pin.renderPins(window.card.ads);
  };

  window.form = {
    disableFormControls: disableFormControls,
    setAddress: setAddress,
    activateMap: activateMap,
    fieldsets: fieldsets,
    inputs: inputs,
    adFormSelects: adFormSelects,
    mapFiltersSelects: mapFiltersSelects
  };

})();
