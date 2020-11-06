'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const houseFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const housePreview = document.querySelector(`.ad-form__photo img`);

const showPicture = function (fileChooser, preview) {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (fileType) {
    return fileName.endsWith(fileType);
  });

  const reader = new FileReader();
  reader.addEventListener(`load`, function () {
    preview.src = reader.result;
    preview.setAttribute(`width`, `100%`);
    preview.setAttribute(`height`, `100%`);
  });

  fileChooser.setCustomValidity(``);

  if (!matches) {
    fileChooser.setCustomValidity(`Недопустимый формат изображения`);
    window.validation.setError(fileChooser);
  }
  reader.readAsDataURL(file);
  window.validation.clearError(fileChooser);
};

const resetPreview = function (preview) {
  preview.src = `img/muffin-grey.svg`;
  preview.setAttribute(`width`, `40px`);
  preview.setAttribute(`height`, `44px`);
};

const resetPhotos = function () {
  resetPreview(avatarPreview);
  resetPreview(housePreview);
};


const changeAvatar = function () {
  showPicture(avatarFileChooser, avatarPreview);
};

const changeHousePhoto = function () {
  showPicture(houseFileChooser, housePreview);
};

const addListeners = function () {
  houseFileChooser.addEventListener(`change`, changeHousePhoto);
  avatarFileChooser.addEventListener(`change`, changeAvatar);
};

const removeListeners = function () {
  avatarFileChooser.removeEventListener(`change`, changeAvatar);
  houseFileChooser.removeEventListener(`change`, changeHousePhoto);
};

window.photo = {
  reset: resetPhotos,
  remove: removeListeners,
  add: addListeners
};

