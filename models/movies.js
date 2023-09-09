const mongoose = require('mongoose');
const { isURL } = require('validator');
const { validationMessage } = require('../utils/errorMessage');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, validationMessage.country],
  },
  director: {
    type: String,
    required: [true, validationMessage.director],
  },
  duration: {
    type: Number,
    required: [true, validationMessage.duration],
  },
  year: {
    type: Date,
    required: [true, validationMessage.year],
  },
  description: {
    type: String,
    required: [true, validationMessage.duration],
  },
  image: {
    type: String,
    required: [true, validationMessage.image],
    validate: {
      validator: (imgUrl) => isURL(imgUrl),
      message: validationMessage.imgValidURL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, validationMessage.trailerLink],
    validate: {
      validator: (trailer) => isURL(trailer),
      message: validationMessage.trailerValidURL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, validationMessage.thumbnail],
    validate: {
      validator: (v) => isURL(v),
      message: validationMessage.thumbnailValidURL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, validationMessage.owner],
  },
  movieId: {
    type: Number,
    required: [true, validationMessage.movieId],
  },
  nameRU: {
    type: String,
    required: [true, validationMessage.nameRUS],
  },
  nameEN: {
    type: String,
    required: [true, validationMessage.nameENG],
  },
});

module.exports = mongoose.model('movie', movieSchema);
