"use strict";

(function () {

  const MapSize = {
    WIDTH: 1200,
    TOP: 130,
    BOTTOM: 630
  };

  const map = document.querySelector(".map");

  const activateMap = function () {
    window.form.isActivate = true;
    window.form.changeAttributeState();
    window.pin.renderPins(ads);
    window.form.setAddress(window.pin.mainPin);
    window.form.syncRoomsGuests();
  };

  window.map = {
    MapSize: MapSize,
    activateMap: activateMap,
    map: map
  };

})();
