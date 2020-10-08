'use strict';

(function () {

  const ADS_NUMBER = 8;
  const mainPin = document.querySelector(`.map__pin--main`);

  const ads = window.data.getAds(ADS_NUMBER);

  window.form.disableFormControls(window.form.fieldsets);
  window.form.disableFormControls(window.form.inputs);
  window.form.disableFormControls(window.form.adFormSelects);
  window.form.disableFormControls(window.form.mapFiltersSelects);
  window.form.setAddress(mainPin);

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      window.form.activateMap();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.code === window.util.KeyCode.ENTER) {
      window.form.activateMap();
    }
  });

  window.main = {
    ads: ads
  };

})();

