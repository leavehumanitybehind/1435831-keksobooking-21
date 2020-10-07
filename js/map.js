/* eslint-disable object-shorthand */
"use strict";

(function () {

  const MapSize = {
    WIDTH: 1200,
    TOP: 130,
    BOTTOM: 630
  };

  const map = document.querySelector(`.map`);

  window.map = {
    MapSize: MapSize,
    map: map
  };


})();
