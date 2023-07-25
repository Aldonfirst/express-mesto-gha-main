const mongoose = require('mongoose');
const { validationMessage } = require('../errorMessage');

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
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
