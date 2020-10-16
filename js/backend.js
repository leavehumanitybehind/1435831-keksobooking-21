"use strict";

(function () {
  const URL = {
    load: `https://21.javascript.pages.academy/keksobooking/data`,
    upload: `https://21.javascript.pages.academy/keksobooking/`
  };
  const TIMEOUT_IN_MS = 10000;
  const OK = 200;


  const getXhr = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ошибки: ' + xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  const upload = function (onSuccess, onError, data) {
    const xhr = getXhr(onSuccess, onError);
    xhr.open(`POST`, URL.upload);
    xhr.send(data);
  };

  const load = function (onSuccess, onError) {
    let xhr = getXhr(onSuccess, onError);
    xhr.open(`GET`, URL.load);
    xhr.send();
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
