const mongoose = require('mongoose');
const User = require('../models/user');
const { handleErrorMessage } = require('../utils/errorMessage');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.getUserById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
        }
        return res.send({ data: user });
      })
      .catch((err) => handleErrorMessage(err, res));
  } else {
    res.status(400).send({ message: 'Неверный Id' });
  }
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: 'true', runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.send(updatedUser);
    })
    .catch((err) => handleErrorMessage(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: 'true', runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404)
          .send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send(updatedUser);
    })
    .catch((err) => handleErrorMessage(err, res));
};
