const mongoose = require('mongoose');
const validator = require('validator');
const { validationMessage } = require('../utils/errorMessage');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // match: [/^(http|https):\/\/[^ "]+$/, validationMessage.url],
    validate: {
      validator: (url) => validator.isURL(url),
      message: validationMessage.url,
    },
  },
  email: {
    type: String,
    required: [true, validationMessage.required],
    unique: true,
    // match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, validationMessage.email],
    validate: {
      validator: (text) => validator.isEmail(text),
      message: validationMessage.email,
    },
  },
  password: {
    type: String,
    required: [true, validationMessage.required],
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
