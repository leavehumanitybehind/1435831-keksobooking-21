'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooser = document.querySelector(`.ad-form__field input[type=file]`);
const preview = document.querySelector(`.ad-form-header__preview img`);

const showPicture = function () {
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
      });
      reader.readAsDataURL(file);
    }
  });
};

const onAvatarChange = function () {
  showPicture(fileChooser, preview);
};


fileChooser.addEventListener(`change`, onAvatarChange);

