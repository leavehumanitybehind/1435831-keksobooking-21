"use strict";

const UrlAddress = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking/`
};

const CODE_STATUS_OK = 200;
const TIMEOUT_IN_MS = 10000;

const getXhr = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === CODE_STATUS_OK) {
      onSuccess(xhr.response);
      return;
    }
    onError(`Статус ошибки: ` + xhr.status + ` ` + xhr.statusText);
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения. Пожалуйста обновите страницу`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс. ` + ` Пожалуйста обновите страницу`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const upload = function (onSuccess, onError, data) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, UrlAddress.UPLOAD);
  xhr.send(data);
};

const load = function (onSuccess, onError) {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`GET`, UrlAddress.LOAD);
  xhr.send();
};

window.backend = {
  load,
  upload
};

