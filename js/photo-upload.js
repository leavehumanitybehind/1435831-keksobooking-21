'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const houseFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const housePreview = document.querySelector(`.ad-form__photo img`);

const showPicture = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => {
    return fileName.endsWith(fileType);
  });

  const reader = new FileReader();
  reader.addEventListener(`load`, () => {
    preview.src = reader.result;
    preview.setAttribute(`width`, `100%`);
    preview.setAttribute(`height`, `100%`);
  });

  fileChooser.setCustomValidity(``);

  if (!matches) {
    fileChooser.setCustomValidity(`Недопустимый формат изображения`);
  }
  reader.readAsDataURL(file);
};

const resetPreview = (preview) => {
  preview.src = `img/muffin-grey.svg`;
  preview.setAttribute(`width`, `40px`);
  preview.setAttribute(`height`, `44px`);
};

const resetPhotos = () => {
  resetPreview(avatarPreview);
  resetPreview(housePreview);
};


const onChangeAvatar = () => {
  showPicture(avatarFileChooser, avatarPreview);
};

const onChangeHousePhoto = () => {
  showPicture(houseFileChooser, housePreview);
};

const addListeners = () => {
  houseFileChooser.addEventListener(`change`, onChangeHousePhoto);
  avatarFileChooser.addEventListener(`change`, onChangeAvatar);
};

const removeListeners = () => {
  avatarFileChooser.removeEventListener(`change`, onChangeAvatar);
  houseFileChooser.removeEventListener(`change`, onChangeHousePhoto);
};

window.photo = {
  reset: resetPhotos,
  removeListeners,
  addListeners
};

