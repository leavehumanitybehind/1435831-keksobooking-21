"use strict";

const UrlAddress = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking/`
};

const CODE_STATUS_OK = 200;
const TIMEOUT_IN_MS = 10000;

const getXhr = (onSuccess, onError) => {
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

  return xhr;
};

const upload = (onSuccess, onError, data) => {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`POST`, UrlAddress.UPLOAD);
  xhr.send(data);
};

const load = (onSuccess, onError) => {
  const xhr = getXhr(onSuccess, onError);
  xhr.open(`GET`, UrlAddress.LOAD);
  xhr.send();
};

window.backend = {
  load,
  upload
};

