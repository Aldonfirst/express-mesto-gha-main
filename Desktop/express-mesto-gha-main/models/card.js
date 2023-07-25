const mongoose = require('mongoose');
const { validationMessage } = require('../errorMessage');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessage.required],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  link: {
    type: String,
    required: [true, validationMessage.required],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, validationMessage.required],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
