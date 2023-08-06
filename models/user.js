const mongoose = require('mongoose');
const validator = require('validator');
const { validationMessage } = require('../utils/errorMessage');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: [true, validationMessage.required],
    // match: [/^(http|https):\/\/[^ "]+$/, validationMessage.url],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Ошибка ввода, тут должен быть URL',
    },
  },
  email: {
    type: String,
    required: [true, validationMessage.required],
    unique: true,
    // match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, validationMessage.email],
    validate: {
      validator: (text) => validator.isEmail(text),
      message: 'Ошибка ввода email',
    },
  },
  password: {
    type: String,
    required: [true, validationMessage.required],
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
