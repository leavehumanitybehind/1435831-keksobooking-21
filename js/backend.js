"use strict";

const CODE_STATUS_OK = 200;
const TIMEOUT_IN_MS = 10000;

const UrlAddress = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking/`
};

const getXhr = (method, url, onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === CODE_STATUS_OK) {
      onSuccess(xhr.response);
      return;
    }
    onError(`Статус ошибки: ` + xhr.status + ` ` + xhr.statusText);
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения. Пожалуйста обновите страницу`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс. ` + ` Пожалуйста обновите страницу`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, url);
  xhr.send(data ? data : ``);
};

const upload = (onSuccess, onError, data) => {
  return getXhr(`POST`, UrlAddress.UPLOAD, onSuccess, onError, data);
};

const load = (onSuccess, onError) => {
  return getXhr(`GET`, UrlAddress.LOAD, onSuccess, onError);
};

window.backend = {
  load,
  upload
};

