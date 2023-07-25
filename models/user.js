const mongoose = require('mongoose');
const { validationMessage } = require('../utils/errorMessage');
const URL_REGEX = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  about: {
    type: String,
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  avatar: {
    type: String,
    required: [true, validationMessage.required],
    validate: {
      validator: (url) => URL_REGEX.isUrl(url),
      message: 'Тут должна быть URL ссылка  изображения',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
