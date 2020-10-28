'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarFileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const houseFileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const housePreview = document.querySelector(`.ad-form__photo img`);

const showPicture = function (fileChooser, preview) {
  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
        preview.setAttribute(`width`, `100%`);
        preview.setAttribute(`height`, `100%`);
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetPreview = function (preview) {
  preview.src = `img/muffin-grey.svg`;
};

const resetPhotos = function () {
  resetPreview(avatarPreview);
  resetPreview(housePreview);
};

const onPhotoChange = function () {
  showPicture(avatarFileChooser, avatarPreview);
  showPicture(houseFileChooser, housePreview);
  avatarFileChooser.removeEventListener(`change`, onPhotoChange);
  houseFileChooser.removeEventListener(`change`, onPhotoChange);
};

avatarFileChooser.addEventListener(`change`, onPhotoChange);
houseFileChooser.addEventListener(`change`, onPhotoChange);

window.photo = {
  reset: resetPhotos
};

